'use client';

import React, { useEffect, useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

interface UserSidebarProps {
  userId: string; // 사용자 ID
  currentTab: string; // 현재 활성화된 탭 이름
  setCurrentTab: (tab: string) => void; // 탭 변경 함수
}

const UserSidebar: React.FC<UserSidebarProps> = ({ userId, currentTab, setCurrentTab }) => {
  // 상태 변수 선언
  const [userName, setUserName] = useState<string | null>(null); // 사용자 이름
  const [createdAt, setCreatedAt] = useState<string | null>(null); // 가입일
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('users')
          .select('user_name, created_at')
          .eq('id', userId)
          .single();

        if (error) throw error;

        setUserName(data?.user_name || 'Unknown');
        setCreatedAt(data?.created_at || null);
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <aside className="w-64 bg-gray-100 p-4 h-screen fixed top-0 left-0 shadow">
      {/* 사용자 정보 섹션 */}
      <div className="mb-6">
        <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
        <p className="text-center mt-2 font-bold">{userName}</p>
        <p className="text-center text-sm text-gray-600">
          가입일: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
        </p>
      </div>

      {/* 메뉴 목록 */}
      <ul className="space-y-2">
        {[
          { key: 'profile', label: '프로필 관리' },
          { key: 'bookings', label: '예약 목록' },
          { key: 'favorites', label: '찜 목록' },
          { key: 'reviews', label: '작성한 후기' },
        ].map((menu) => (
          <li
            key={menu.key}
            className={`p-2 cursor-pointer rounded ${
              currentTab === menu.key
                ? 'bg-gray-300 font-semibold text-brown-600'
                : 'hover:bg-gray-200'
            }`}
            onClick={() => setCurrentTab(menu.key)}
          >
            {menu.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSidebar;
