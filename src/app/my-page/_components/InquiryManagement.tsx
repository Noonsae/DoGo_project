'use client';

import React, { useEffect, useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Inquiry 데이터 타입 정의
interface Inquiry {
  id: string; // 문의 ID
  title: string; // 문의 제목
  content: string; // 문의 내용
  user_id: string | null; // 작성자 ID (null 가능)
  hotel_id: string | null; // 관련된 호텔 ID (null 가능)
  booking_id: string | null; // 관련된 예약 ID (null 가능)
  created_at: string; // 작성 일자 (ISO 포맷)
}

// Props 타입 정의
interface InquiryManagementProps {
  userId: string; // 사용자 ID
}

const InquiryManagement: React.FC<InquiryManagementProps> = ({ userId }) => {
  // 상태 변수 정의
  const [inquiries, setInquiries] = useState<Inquiry[]>([]); // 문의 데이터 리스트
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 메시지 상태

  // 데이터 가져오는 함수
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        // Supabase에서 'contacts' 테이블의 데이터를 가져옴
        const { data, error } = await browserSupabase()
          .from('contacts')
          .select(`
            id,
            title,
            content,
            user_id,
            hotel_id,
            booking_id,
            created_at
          `)
          .eq('user_id', userId); // userId로 필터링

        // 오류 발생 시 예외 처리
        if (error) throw error;

        // 문의 데이터를 상태에 저장 (data가 null일 경우 빈 배열로 대체)
        setInquiries(data || []);
      } catch (err) {
        console.error('Error fetching inquiries:', err);
        setError('문의 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries(); // 데이터 가져오기 함수 호출
  }, [userId]); // userId가 변경될 때마다 실행

  // 로딩 중일 때 표시되는 UI
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 오류가 있을 때 표시되는 UI
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 문의 데이터가 없을 때 표시되는 UI
  if (inquiries.length === 0)
    return <p className="text-center text-gray-600">등록된 문의가 없습니다.</p>;

  // 렌더링
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">문의 관리</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">문의 제목</th>
            <th className="border p-2">문의 내용</th>
            <th className="border p-2">작성자 ID</th>
            <th className="border p-2">호텔 ID</th>
            <th className="border p-2">예약 ID</th>
            <th className="border p-2">작성일</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td className="border p-2">{inquiry.title}</td>
              <td className="border p-2">{inquiry.content}</td>
              <td className="border p-2">{inquiry.user_id || 'N/A'}</td>
              <td className="border p-2">{inquiry.hotel_id || 'N/A'}</td>
              <td className="border p-2">{inquiry.booking_id || 'N/A'}</td>
              <td className="border p-2">
                {new Date(inquiry.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryManagement;
