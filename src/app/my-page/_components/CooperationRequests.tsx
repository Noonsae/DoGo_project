import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

interface CooperationRequest {
  id: string;
  user_id: string | null;
  hotel_id: string | null;
  title: string;
  content: string;
  created_at: string;
}

const CooperationRequests: React.FC = () => {
  const [requests, setRequests] = useState<CooperationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // `contacts` 테이블에서 협력 요청 데이터를 가져옴
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

        if (error) throw error;

        setRequests(data || []);
      } catch (err) {
        console.error('Error fetching cooperation requests:', err);
        setError('협력 요청 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (requests.length === 0) return <p className="text-center text-gray-600">등록된 협력 요청이 없습니다.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">협력 요청</h2>
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
              <td className="border p-2">{request.id}</td>
              <td className="border p-2">{request.user_id || 'N/A'}</td>
              <td className="border p-2">{request.hotel_id || 'N/A'}</td>
              <td className="border p-2">{request.title}</td>
              <td className="border p-2">{request.content}</td>
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
