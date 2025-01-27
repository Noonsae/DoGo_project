'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client'; // Supabase 클라이언트

import BusinessSidebar from '@/app/my-page/_components/BusinessSidebar'; // 사업자용 사이드바
import UserSidebar from './UserSidebar';


// Props 타입 정의
interface SidebarWrapperProps {
  userId: string; // 현재 사용자 ID
  currentTab: string; // 현재 활성화된 탭
  setCurrentTab: (tab: string) => void; // 탭을 변경하는 함수
}

// SidebarWrapper 컴포넌트
const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ userId, currentTab, setCurrentTab }) => {
  const [role, setRole] = useState<string | null>(null); // 사용자 역할
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지

  // 사용자 역할(Role)을 가져오는 함수
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data, error } = await browserSupabase().from('users').select('role').eq('id', userId).single();

        if (error) throw error;

        setRole(data?.role || null);
      } catch (err) {
        console.error('Error fetching user role:', err);
        setError('사용자 역할을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [userId]);

  // 로딩 상태
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 에러 상태
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 역할에 따른 Sidebar 렌더링
  return (
    <aside className="w-64 bg-gray-100 h-screen fixed top-0 left-0">
      {role === 'customer' ? (
        <UserSidebar userId={userId} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      ) : role === 'business' ? (
        <BusinessSidebar userId={userId} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      ) : (
        <p className="text-center text-gray-600">유효하지 않은 사용자 역할입니다.</p>
      )}
    </aside>
  );
};

export default SidebarWrapper;
