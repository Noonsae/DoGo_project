'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 문의 데이터를 나타내는 인터페이스 정의
interface Inquiry {
  id: string;
  category: string;
  title: string;
  content: string;
  created_at: string;
  status: 'pending' | 'answered' | 'closed';
  assigned_to: string;
  answer?: {
    content: string;
    created_at: string;
  };
}

const UserInquiryPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  // 문의 목록 가져오기
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
        error: authError
      } = await browserSupabase().auth.getUser();

      if (authError || !user) {
        throw new Error('로그인 정보가 없습니다.');
      }

      const { data, error } = await browserSupabase()
        .from('inquiries')
        .select(`id, category, title, content, created_at, status, assigned_to, answers (content, created_at)`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedData = data.map((inquiry: any) => ({
        id: inquiry.id,
        category: inquiry.category,
        title: inquiry.title,
        content: inquiry.content,
        created_at: inquiry.created_at,
        status: inquiry.status,
        assigned_to: inquiry.assigned_to || '',
        answer: inquiry.answers?.[0] || null
      }));

      setInquiries(formattedData);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setError('문의 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">내 문의 목록</h1>

      {/* 문의 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">문의 목록</h2>
          <ul className="space-y-4">
            {inquiries.length === 0 ? (
              <p className="text-center text-gray-500">등록된 문의가 없습니다.</p>
            ) : (
              inquiries.map((inquiry) => (
                <li
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`p-4 border rounded shadow cursor-pointer ${
                    selectedInquiry?.id === inquiry.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <h3 className="font-bold">{inquiry.title}</h3>
                  <p className="text-sm text-gray-500">작성일: {new Date(inquiry.created_at).toLocaleDateString()}</p>
                  <p className={`mt-1 font-semibold ${getStatusClass(inquiry.status)}`}>
                    상태: {getStatusLabel(inquiry.status)}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* 선택된 문의 상세 정보 */}
        {selectedInquiry && (
          <div>
            <h2 className="text-lg font-semibold mb-2">문의 상세 정보</h2>
            <div className="p-4 border rounded shadow">
              <h3 className="font-bold text-lg mb-2">{selectedInquiry.title}</h3>
              <p className="text-gray-700 mb-4">{selectedInquiry.content}</p>
              <p className="text-sm text-gray-500">
                작성일: {new Date(selectedInquiry.created_at).toLocaleDateString()}
              </p>

              {selectedInquiry.answer ? (
                <div className="mt-4 p-4 border rounded bg-gray-50">
                  <h4 className="font-semibold text-md">관리자 답변</h4>
                  <p className="text-gray-700 mt-2">{selectedInquiry.answer.content}</p>
                  <p className="text-sm text-gray-500">
                    답변일: {new Date(selectedInquiry.answer.created_at).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">아직 답변이 등록되지 않았습니다.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 문의 상태에 따른 스타일 적용
const getStatusClass = (status: string) => {
  return status === 'pending' ? 'text-yellow-500' : status === 'answered' ? 'text-green-500' : 'text-gray-500';
};

// 상태 라벨 변환
const getStatusLabel = (status: string) => {
  return status === 'pending' ? '대기 중' : status === 'answered' ? '답변 완료' : '종료됨';
};

export default UserInquiryPage;
