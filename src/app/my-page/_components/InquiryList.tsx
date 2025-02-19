'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 문의 데이터 타입 정의
// TODO 타입 파일 분리 
interface Inquiry {
  id: string;
  category: string;
  title: string;
  content: string;
  user_id: string;
  status: string;
  business_reply?: string | null;
  reply_created_at?: string | null;
  assigned_to?: string | null;
  created_at: string;
  user_name: string | null;
  role: string; // 'customer' or 'business'
}

const InquiryList: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10; // 한 페이지당 10개씩 표시

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error } = await browserSupabase()
          .from('inquiries')
          .select(
            `id, category, title, content, user_id, status, business_reply, reply_created_at, assigned_to, created_at,
            users (user_name, role)`
          )
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) throw error;

        // 데이터 변환
        const formattedInquiries = data.map((inquiry: any) => ({
          id: inquiry.id,
          category: inquiry.category,
          title: inquiry.title,
          content: inquiry.content,
          user_id: inquiry.user_id,
          status: inquiry.status,
          business_reply: inquiry.business_reply,
          reply_created_at: inquiry.reply_created_at,
          assigned_to: inquiry.assigned_to,
          created_at: inquiry.created_at,
          user_name: inquiry.users?.user_name ?? 'Unknown',
          role: inquiry.users?.role ?? 'Unknown', // 'customer' or 'business'
        }));

        setInquiries(formattedInquiries);
      } catch (err) {
        console.error('Error fetching inquiries:', err);
        setError('문의 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [page]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">문의 목록</h2>

      {loading ? (
        <p className="text-center text-gray-600">로딩 중...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">문의 유형</th>
                  <th className="border p-2">제목</th>
                  <th className="border p-2">작성자</th>
                  <th className="border p-2">역할</th>
                  <th className="border p-2">처리 상태</th>
                  <th className="border p-2">답변</th>
                  <th className="border p-2">작성일</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-600 p-4">
                      등록된 문의가 없습니다.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="text-center">
                      <td className="border p-2">{inquiry.category}</td>
                      <td className="border p-2">{inquiry.title}</td>
                      <td className="border p-2">{inquiry.user_name}</td>
                      <td className="border p-2">
                        {inquiry.role === 'customer' ? '사용자' : '업체'}
                      </td>
                      <td className="border p-2">
                        {inquiry.status === 'resolved' ? '처리 완료' : '처리 중'}
                      </td>
                      <td className="border p-2">
                        {inquiry.business_reply ? (
                          <>
                            <p>{inquiry.business_reply}</p>
                            <span className="text-xs text-gray-500">
                              ({new Date(inquiry.reply_created_at ?? '').toLocaleDateString('ko-KR')})
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400">답변 없음</span>
                        )}
                      </td>
                      <td className="border p-2">
                        {new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 버튼 */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
              disabled={page === 1}
            >
              이전
            </button>
            <span className="px-4 py-2 bg-gray-100 rounded-md">페이지 {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InquiryList;
