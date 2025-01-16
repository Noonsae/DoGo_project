'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 사용자 프로필 데이터를 정의하는 인터페이스
interface UserProfile {
  id: string; // 사용자 고유 ID
  user_name: string; // 사용자 이름
  email: string; // 사용자 이메일
  phone_number: string; // 사용자 전화번호
  role: string; // 사용자 역할 (예: "customer", "business")
  business_number: string | null; // 사업자 번호 (일반 사용자일 경우 null일 수 있음)
  created_at: string; // 계정 생성 날짜
}

// Props 타입 정의
interface ProfileManagementProps {
  userId: string; // 사용자 ID
}

// ProfileManagement 컴포넌트 정의
const ProfileManagement: React.FC<ProfileManagementProps> = ({ userId }) => {
  const [user, setUser] = useState<UserProfile | null>(null); // 사용자 정보를 저장
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 관리
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지 상태 관리

  // 사용자 프로필 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Supabase를 통해 특정 사용자 정보를 가져옴
        const { data, error } = await browserSupabase()
          .from('users')
          .select('id, user_name, email, phone_number, role, business_number, created_at')
          .eq('id', userId) // userId로 필터링
          .single(); // 단일 결과 반환

        if (error) throw error;

        setUser(data); // 사용자 정보를 상태에 저장
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('프로필 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // 사용자 정보를 업데이트하는 함수
  const handleUpdate = async () => {
    if (!user) return;

    try {
      const { error } = await browserSupabase()
        .from('users')
        .update({
          user_name: user.user_name, // 업데이트된 이름
          phone_number: user.phone_number, // 업데이트된 전화번호
        })
        .eq('id', userId); // userId와 일치하는 사용자 업데이트

      if (error) throw error;

      setSuccessMessage('프로필이 성공적으로 업데이트되었습니다.');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!user) return <p className="text-center text-red-500">사용자 정보를 불러올 수 없습니다.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">프로필 관리</h2>
      {successMessage && <p className="mt-4 text-center text-green-500">{successMessage}</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium">이름</label>
          <input
            type="text"
            value={user?.user_name || ''}
            onChange={(e) =>
              setUser({ ...user, user_name: e.target.value } as UserProfile)
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">이메일</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">휴대전화 번호</label>
          <input
            type="text"
            value={user?.phone_number || ''}
            onChange={(e) =>
              setUser({ ...user, phone_number: e.target.value } as UserProfile)
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">역할</label>
          <input
            type="text"
            value={user?.role || ''}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        {user?.business_number && (
          <div>
            <label className="block text-sm font-medium">사업자 번호</label>
            <input
              type="text"
              value={user.business_number}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">가입일</label>
          <input
            type="text"
            value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

export default ProfileManagement;
