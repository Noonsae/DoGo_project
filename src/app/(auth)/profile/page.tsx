'use client';
import React from 'react';
import useAuthStore from '@/store/useAuth';

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div>로그인하지 않았습니다.</div>;
  }

  return (
    <div>
      <h2>환영합니다, {user.email}님!</h2>
      <p>유저 ID: {user.id}</p>
    </div>
  );
};

export default ProfilePage;
