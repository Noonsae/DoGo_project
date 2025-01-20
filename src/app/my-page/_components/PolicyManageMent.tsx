'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 정책 데이터를 나타내는 인터페이스 정의
interface Policy {
  id: string; // 정책 ID
  policy_name: string; // 정책 이름
  description: string | null; // 정책 설명
  hotel_id: string | null; // 호텔 ID
  created_at: string; // 생성 날짜
}

// Props 타입 정의
interface PolicyManagementProps {
  userId: string; // 사용자 ID
  hotelId: string; // 현재 관리 중인 호텔 ID
}

// PolicyManagement 컴포넌트
const PolicyManagement: React.FC<PolicyManagementProps> = ({ userId, hotelId }) => {
  const [policies, setPolicies] = useState<Policy[]>([]); // 정책 리스트
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [modalType, setModalType] = useState<'add' | 'edit'>('add'); // 모달 타입 ('add' 또는 'edit')
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null); // 선택된 정책 데이터

  // 정책 데이터 가져오기
  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await browserSupabase()
          .from('policies')
          .select('*')
          .eq('hotel_id', hotelId);

        if (error) throw error;

        setPolicies(data as Policy[] || []);
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError('정책 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [hotelId]);

  // 정책 추가 또는 수정 처리
  const handleSavePolicy = async (policyName: string, description: string | null) => {
    try {
      if (modalType === 'add') {
        // 새 정책 추가
        await browserSupabase().from('policies').insert([
          {
            policy_name: policyName,
            description,
            hotel_id: hotelId,
          },
        ]);
      } else if (modalType === 'edit' && selectedPolicy) {
        // 기존 정책 수정
        await browserSupabase()
          .from('policies')
          .update({ policy_name: policyName, description })
          .eq('id', selectedPolicy.id);
      }

      // 데이터 새로고침
      const { data } = await browserSupabase()
        .from('policies')
        .select('*')
        .eq('hotel_id', hotelId);

      setPolicies(data as Policy[] || []);
      closeModal();
    } catch (err) {
      console.error('Error saving policy:', err);
      setError('정책 저장 중 오류가 발생했습니다.');
    }
  };

  // 정책 삭제
  const handleDeletePolicy = async (policyId: string) => {
    try {
      await browserSupabase().from('policies').delete().eq('id', policyId);

      // 데이터 새로고침
      setPolicies((prevPolicies) => prevPolicies.filter((policy) => policy.id !== policyId));
    } catch (err) {
      console.error('Error deleting policy:', err);
      setError('정책 삭제 중 오류가 발생했습니다.');
    }
  };

  // 모달 열기
  const openModal = (type: 'add' | 'edit', policy?: Policy) => {
    setModalType(type);
    setSelectedPolicy(policy || null);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPolicy(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-bold mb-6">정책 관리</h2>

      {/* 정책 목록 */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">정책 목록</p>
          <button
            onClick={() => openModal('add')}
            className="px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600"
          >
            정책 추가하기
          </button>
        </div>
        {loading ? (
          <p className="text-gray-600">로딩 중...</p>
        ) : policies.length === 0 ? (
          <p className="text-gray-600">등록된 정책이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {policies.map((policy) => (
              <li
                key={policy.id}
                className="p-4 border border-gray-300 rounded-lg bg-white flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{policy.policy_name}</p>
                  <p className="text-sm text-gray-600">{policy.description || '설명이 없습니다.'}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => openModal('edit', policy)}
                    className="text-blue-500 hover:underline"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="text-red-500 hover:underline"
                  >
                    삭제하기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {modalType === 'add' ? '정책 추가하기' : '정책 수정하기'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const policyName = formData.get('policy_name') as string;
                const description = formData.get('description') as string;
                handleSavePolicy(policyName, description || null);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium">정책 이름</label>
                <input
                  type="text"
                  name="policy_name"
                  defaultValue={selectedPolicy?.policy_name || ''}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">정책 설명</label>
                <textarea
                  name="description"
                  defaultValue={selectedPolicy?.description || ''}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyManagement;
