'use client';
import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 정책 데이터를 나타내는 인터페이스 정의
interface Policy {
  id: string; // 정책 ID
  policy_name: string; // 정책 이름
  description: string | null; // 정책 설명 (null 허용)
  hotel_id: string | null; // 관련된 호텔 ID (null 허용)
  created_at: string; // 정책 생성 날짜
}

const PolicyManagement: React.FC = () => {
  // 상태 정의
  const [policies, setPolicies] = useState<Policy[]>([]); // 정책 리스트
  const [newPolicy, setNewPolicy] = useState({
    policy_name: '', // 새로운 정책 이름
    description: '', // 새로운 정책 설명
    hotel_id: '', // 관련된 호텔 ID
  });
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지 상태

  // 정책 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // Supabase에서 'policies' 테이블의 데이터를 선택
        const { data, error } = await browserSupabase()
          .from('policies')
          .select('id, policy_name, description, hotel_id, created_at');

        if (error) throw error; // 에러 발생 시 예외 처리

        setPolicies(data || []); // 데이터를 상태에 저장
      } catch (err) {
        console.error('Error fetching policies:', err); // 콘솔에 에러 출력
        setError('정책 데이터를 불러오는 중 오류가 발생했습니다.'); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchPolicies(); // 데이터 가져오기 함수 실행
  }, []);

  // 새로운 정책을 추가하는 함수
  const handleAddPolicy = async () => {
    try {
      setSuccessMessage(null); // 이전 성공 메시지 초기화
      setError(null); // 이전 에러 메시지 초기화

      // Supabase에 새로운 정책 추가
      const { error } = await browserSupabase()
        .from('policies')
        .insert([
          {
            policy_name: newPolicy.policy_name, // 입력받은 정책 이름
            description: newPolicy.description || undefined, // 빈 문자열을 undefined로 변환
            hotel_id: newPolicy.hotel_id || undefined, // 빈 문자열을 undefined로 변환
          },
        ]);

      if (error) throw error; // 에러 발생 시 예외 처리

      // 성공 메시지 설정 및 입력 필드 초기화
      setSuccessMessage('정책이 성공적으로 추가되었습니다.');
      setNewPolicy({ policy_name: '', description: '', hotel_id: '' });

      // 새롭게 추가된 데이터를 다시 불러옴
      const { data } = await browserSupabase()
        .from('policies')
        .select('id, policy_name, description, hotel_id, created_at');
      setPolicies(data || []); // 데이터를 상태에 업데이트
    } catch (err) {
      console.error('Error adding policy:', err); // 콘솔에 에러 출력
      setError('정책 추가 중 오류가 발생했습니다.'); // 에러 메시지 설정
    }
  };

  // 로딩 중일 때 표시되는 메시지
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 에러 발생 시 표시되는 메시지
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">정책 관리</h2>
      {/* 새 정책 추가 섹션 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">새 정책 추가</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">정책 이름</label>
            <input
              type="text"
              value={newPolicy.policy_name}
              onChange={(e) => setNewPolicy({ ...newPolicy, policy_name: e.target.value })}
              placeholder="정책 이름을 입력하세요"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">정책 설명</label>
            <textarea
              value={newPolicy.description}
              onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
              placeholder="정책 설명을 입력하세요"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">호텔 ID</label>
            <input
              type="text"
              value={newPolicy.hotel_id}
              onChange={(e) => setNewPolicy({ ...newPolicy, hotel_id: e.target.value })}
              placeholder="관련 호텔 ID를 입력하세요"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            onClick={handleAddPolicy}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            정책 추가
          </button>
          {/* 성공 메시지 출력 */}
          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          {/* 에러 메시지 출력 */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
      {/* 정책 목록 표시 섹션 */}
      <h3 className="text-lg font-semibold mb-2">정책 목록</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">정책 이름</th>
            <th className="border p-2">설명</th>
            <th className="border p-2">호텔 ID</th>
            <th className="border p-2">등록일</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td className="border p-2">{policy.policy_name}</td>
              <td className="border p-2">{policy.description || 'N/A'}</td>
              <td className="border p-2">{policy.hotel_id || 'N/A'}</td>
              <td className="border p-2">
                {new Date(policy.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyManagement;
