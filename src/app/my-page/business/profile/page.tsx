'use client';

import React, { useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client'; // SSR Supabase 클라이언트 임포트
import { Database } from '@/types/supabase/supabase-type';

// User 데이터 타입 정의
interface User {
  id: string;
  user_name: string;
  phone_number: string;
  email: string;
  role: string;
  business_number: string | null;
  created_at: string;
}

// ProfileContent 컴포넌트 정의
interface ProfileContentProps {
  user: User;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user: initialUser }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const supabase = await browserSupabase();
      const { error } = await supabase
        .from('users')
        .update({
          user_name: user.user_name,
          phone_number: user.phone_number,
        })
        .eq('id', user.id);

      if (error) throw error;

      setSuccessMessage('프로필이 성공적으로 업데이트되었습니다!');
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  if (!user) return <p className="text-center text-gray-600">사용자 정보를 불러올 수 없습니다.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">프로필 관리</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <div>
          <label className="block text-sm font-medium">이름</label>
          <input
            type="text"
            value={user.user_name}
            onChange={(e) => setUser({ ...user, user_name: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">휴대전화 번호</label>
          <input
            type="text"
            value={user.phone_number}
            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">이메일</label>
          <input
            type="text"
            value={user.email}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">역할</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        {user.business_number && (
          <div>
            <label className="block text-sm font-medium">사업자 번호</label>
            <input
              type="text"
              value={user.business_number}
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">가입일</label>
          <input
            type="text"
            value={new Date(user.created_at).toLocaleDateString()}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

// ProfilePage 컴포넌트 정의
const ProfilePage = async () => {
  const supabase = await browserSupabase();

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, user_name, phone_number, email, role, business_number, created_at')
      .eq('id', session.user.id)
      .single();

    if (userError || !user) {
      throw new Error('사용자 정보를 가져오는 중 오류가 발생했습니다.');
    }

    return <ProfileContent user={user} />;
  } catch (error: any) {
    console.error(error.message);
    return <p className="text-red-500 text-center">{error.message}</p>;
  }
};

export default ProfilePage;
