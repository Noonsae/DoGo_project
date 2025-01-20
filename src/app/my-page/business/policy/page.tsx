'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

interface Policy {
  id: string;
  policy_name: string;
  description: string | null; // null을 허용하도록 수정
  created_at: string;
}

interface PolicyPageProps {
  userId: string;
  hotelId: string;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ userId, hotelId }) => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPolicy, setNewPolicy] = useState({ policy_name: '', description: '' });

  // 정책 데이터 가져오기
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('policies')
          .select('id, policy_name, description, created_at')
          .eq('hotel_id', hotelId);

        if (error) throw error;

        // 데이터가 null일 가능성 처리
        setPolicies(data || []);
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError('정책 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [hotelId]);

  // 정책 추가 함수
  const handleAddPolicy = async () => {
    try {
      const { data, error } = await browserSupabase().from('policies').insert([{
        policy_name: newPolicy.policy_name,
        description: newPolicy.description || null, // null을 허용하도록 처리
        hotel_id: hotelId,
        created_at: new Date().toISOString(),
      }]);

      if (error) throw error;

      if (data) {
        setPolicies((prev) => [...prev, data[0]]);
        setNewPolicy({ policy_name: '', description: '' });
      }
    } catch (err) {
      console.error('Error adding policy:', err);
      setError('정책 추가 중 오류가 발생했습니다.');
    }
  };

  // 정책 삭제 함수
  const handleDeletePolicy = async (policyId: string) => {
    try {
      const { error } = await browserSupabase().from('policies').delete().eq('id', policyId);

      if (error) throw error;

      setPolicies((prev) => prev.filter((policy) => policy.id !== policyId));
    } catch (err) {
      console.error('Error deleting policy:', err);
      setError('정책 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">정책 관리</h2>

      {/* 정책 추가 */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">새 정책 추가</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="정책 이름"
            value={newPolicy.policy_name}
            onChange={(e) => setNewPolicy({ ...newPolicy, policy_name: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="정책 설명"
            value={newPolicy.description}
            onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
            className="border p-2 rounded"
          ></textarea>
          <button
            onClick={handleAddPolicy}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            정책 추가
          </button>
        </div>
      </div>

      {/* 정책 리스트 */}
      <h3 className="font-semibold mb-2">정책 목록</h3>
      {policies.length === 0 ? (
        <p className="text-center text-gray-600">등록된 정책이 없습니다.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">정책 이름</th>
              <th className="border p-2">설명</th>
              <th className="border p-2">생성일</th>
              <th className="border p-2">작업</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td className="border p-2">{policy.policy_name}</td>
                <td className="border p-2">{policy.description || '설명 없음'}</td>
                <td className="border p-2">
                  {new Date(policy.created_at).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PolicyPage;
