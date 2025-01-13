'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// CooperationRequest 데이터 타입 정의
interface CooperationRequest {
  id: string;
  user_id: string | null;
  hotel_id: string | null;
  title: string;
  content: string;
  created_at: string;
}

// CooperationRequests 컴포넌트 Props 타입 정의
interface CooperationRequestsProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const CooperationRequests: React.FC<CooperationRequestsProps> = ({ currentTab, setCurrentTab }) => {
  // 협력 요청 데이터를 저장하는 상태
  const [requests, setRequests] = useState<CooperationRequest[]>([]);
  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);
  // 오류 메시지 상태 관리
  const [error, setError] = useState<string | null>(null);

  // 협력 요청 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Supabase에서 `contacts` 테이블에서 데이터를 가져옴
        const { data, error } = await browserSupabase()
          .from('contacts')
          .select(`
            id,
            user_id,
            hotel_id,
            title,
            content,
            created_at
          `)
          .eq('title', '협력 요청'); // 제목이 '협력 요청'인 항목만 필터링

        if (error) throw error; // 데이터베이스 호출 오류 처리

        setRequests(data || []); // 데이터를 상태에 저장
      } catch (err) {
        console.error('Error fetching cooperation requests:', err);
        setError('협력 요청 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchRequests(); // 데이터 가져오기 호출
  }, []);

  // 로딩 중일 때 렌더링되는 메시지
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 오류가 발생했을 때 렌더링되는 메시지
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 협력 요청 데이터가 없을 때 렌더링되는 메시지
  if (requests.length === 0)
    return <p className="text-center text-gray-600">등록된 협력 요청이 없습니다.</p>;

  return (
    <div>
      {/* 현재 탭 정보 및 탭 변경 버튼 */}
      <div className="mb-6">
        <p className="text-lg font-bold mb-2">현재 선택된 탭: {currentTab}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setCurrentTab('bookings')}
        >
          예약 목록 탭으로 변경
        </button>
      </div>

      {/* 협력 요청 리스트 제목 */}
      <h2 className="text-xl font-bold mb-4">협력 요청</h2>

      {/* 협력 요청 데이터를 테이블로 표시 */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">요청 ID</th>
            <th className="border p-2">요청자 ID</th>
            <th className="border p-2">호텔 ID</th>
            <th className="border p-2">요청 제목</th>
            <th className="border p-2">내용</th>
            <th className="border p-2">요청일</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              {/* 요청 ID */}
              <td className="border p-2">{request.id}</td>
              {/* 요청자 ID */}
              <td className="border p-2">{request.user_id || 'N/A'}</td>
              {/* 호텔 ID */}
              <td className="border p-2">{request.hotel_id || 'N/A'}</td>
              {/* 요청 제목 */}
              <td className="border p-2">{request.title}</td>
              {/* 요청 내용 */}
              <td className="border p-2">{request.content}</td>
              {/* 요청일 */}
              <td className="border p-2">
                {new Date(request.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CooperationRequests;
