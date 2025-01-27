'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client';
import useAuthStore from '@/store/useAuth';

interface UserSidebarProps {
  userId: string; // 사용자 ID
  currentTab: string; // 현재 활성화된 탭 이름
  setCurrentTab: (tab: string) => void; // 탭 변경 함수
}

const TABS = [
  { id: 'profile', label: '프로필 관리' },
  { id: 'booking', label: '예약 목록' },
  { id: 'favorite', label: '찜 목록' },
  { id: 'review', label: '작성한 후기' },
  { id: 'inquiry', label: '1:1 문의' }
];

const UserSidebar: React.FC<UserSidebarProps> = () => {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // url 경로와 일치하는 TABS의 id로 변경
  useEffect(() => {
    const pathnames = pathname.split('/');
    const currentPath = pathnames[pathnames.length - 1];
    setCurrentTab(currentPath);
  }, [pathname]);

  const router = useRouter();
  const userId = user?.id;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const { data, error } = await browserSupabase()
            .from('users')
            .select('user_name, created_at')
            .eq('id', userId)
            .single();

          if (error) throw error;

          setUserName(data?.user_name || 'Unknown');
          setCreatedAt(data?.created_at || null);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <aside className="w-64 bg-gray-100 h-screen p-4">
        <p className="text-center text-gray-600">Loading...</p>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 shadow-lg fixed top-0 left-0">
      <div className="mb-6">
        <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
        <p className="text-center mt-2 font-bold">{userName}</p>
        <p className="text-center text-sm text-gray-600">
          가입일: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
        </p>
      </div>

      <ul className="space-y-2">
        {TABS.map((tab) => (
          <li
            key={tab.id}
            className={`p-2 cursor-pointer rounded ${
              currentTab === tab.id ? 'bg-gray-300 font-semibold text-brown-600' : 'hover:bg-gray-200'
            }`}
            onClick={() => {
              setCurrentTab(tab.id); // 탭 변경
              router.push(`/my-page/user/${tab.id}`); // 라우팅 처리
            }}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSidebar;
