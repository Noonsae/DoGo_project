// ADMIN전용 문의 확인 페이지

'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import AdminSidebar from '@/app/my-page/_components/AdminSidebar';

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

const AdminInquiryPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'company' | 'requests' | 'bookings' | 'inquiry'>('inquiry');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // 한 페이지에 10개씩 표시

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);

        // 전체 데이터 개수 가져오기
        const { count } = await browserSupabase().from('inquiries').select('*', { count: 'exact', head: true });

        if (count !== null) {
          setTotalPages(Math.ceil(count / pageSize));
        }

        // 페이지네이션 적용하여 데이터 가져오기
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
          role: inquiry.users?.role ?? 'Unknown' // customer or business
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
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 사이드바 */}
      <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-4 md:p-8 bg-gray-50">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left">문의 관리</h1>

        {loading ? (
          <p className="text-center text-gray-600">로딩 중...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">문의 유형</th>
                  <th className="border p-2">제목</th>
                  <th className="border p-2 hidden md:table-cell">내용</th>
                  <th className="border p-2">작성자</th>
                  <th className="border p-2">역할</th>
                  <th className="border p-2">처리 상태</th>
                  <th className="border p-2 hidden md:table-cell">답변</th>
                  <th className="border p-2">작성일</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-600 p-4">
                      등록된 문의가 없습니다.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="text-center">
                      <td className="border p-2">{inquiry.category}</td>
                      <td className="border p-2">{inquiry.title}</td>
                      <td className="border p-2 hidden md:table-cell">{inquiry.content}</td>
                      <td className="border p-2">{inquiry.user_name}</td>
                      <td className="border p-2">{inquiry.role === 'customer' ? '사용자' : '업체'}</td>
                      <td className="border p-2">{inquiry.status === 'resolved' ? '처리 완료' : '처리 중'}</td>
                      <td className="border p-2 hidden md:table-cell">
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
                      <td className="border p-2">{new Date(inquiry.created_at).toLocaleDateString('ko-KR')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* 페이지네이션 컨트롤 */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                disabled={page === 1}
              >
                이전
              </button>
              <span className="px-4 py-2 bg-gray-100 rounded-md">
                {page} / {totalPages} 페이지
              </span>
              <button
                onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                disabled={page >= totalPages}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminInquiryPage;
