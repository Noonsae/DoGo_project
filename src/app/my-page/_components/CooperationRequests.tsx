'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// CooperationRequest 데이터 타입 정의
// TODO 타입 파일 분리 
interface CooperationRequest {
  id: string; // 요청 ID
  user_id: string | null; // 요청자 ID
  hotel_id: string | null; // 호텔 ID
  title: string; // 요청 제목
  content: string; // 요청 내용
  created_at: string; // 요청일
  hotel_name?: string; // 호텔 이름 (optional)
  status?: string; // 요청 상태 (optional)
}

const CooperationRequests: React.FC = () => {
  const [requests, setRequests] = useState<CooperationRequest[]>([]); // 협력 요청 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 데이터 가져오기
  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Supabase에서 협력 요청 데이터 가져오기
        const { data, error } = await browserSupabase()
          .from('contacts')
          .select(`
            id,
            user_id,
            hotel_id,
            title,
            content,
            created_at,
            hotels (name) 
          `);

        if (error) throw error;

        // 데이터를 CooperationRequest 타입으로 매핑
        const formattedData: CooperationRequest[] =
          data?.map((request) => ({
            id: request.id,
            user_id: request.user_id,
            hotel_id: request.hotel_id,
            title: request.title,
            content: request.content,
            created_at: request.created_at,
            hotel_name: request.hotels?.name || 'N/A', // 호텔 이름을 추가
            status: 'Pending', // 기본 상태 (필요 시 동적 변경 가능)
          })) || [];

        setRequests(formattedData); // 상태 업데이트
      } catch (err) {
        console.error('Error fetching cooperation requests:', err);
        setError('협력 요청 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchRequests();
  }, []);

  // 로딩 중 메시지
  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;

  // 에러 발생 시 메시지
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 데이터가 없을 때 메시지
  if (requests.length === 0)
    return <p className="text-center text-gray-600">등록된 협력 요청이 없습니다.</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">협력 요청</h2>
      <table className="w-full border-collapse border border-gray-300">
        {/* 테이블 헤더 */}
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 text-left">요청 ID</th>
            <th className="border p-2 text-left">요청자 ID</th>
            <th className="border p-2 text-left">호텔명</th>
            <th className="border p-2 text-left">요청 제목</th>
            <th className="border p-2 text-left">내용</th>
            <th className="border p-2 text-left">요청일</th>
            <th className="border p-2 text-left">상태</th>
          </tr>
        </thead>
        {/* 테이블 바디 */}
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-100">
              <td className="border p-2">{request.id}</td>
              <td className="border p-2">{request.user_id || 'N/A'}</td>
              <td className="border p-2">{request.hotel_name || 'N/A'}</td>
              <td className="border p-2">{request.title}</td>
              <td className="border p-2">{request.content}</td>
              <td className="border p-2">
                {new Date(request.created_at).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <span className="px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-800">
                  {request.status || 'Pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CooperationRequests;
