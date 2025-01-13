'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client'; // Supabase 클라이언트를 가져옵니다.
import UserSidebar from '@/app/my-page/_components/Usersidebar'; // 고객용 사이드바 컴포넌트
import BusinessSidebar from './BusinessSidebar'; // 사업자용 사이드바 컴포넌트

interface SidebarWrapperProps {
  userId: string; // 현재 사용자 ID
  currentTab: string; // 현재 활성화된 탭
  setCurrentTab: (tab: string) => void; // 활성화 탭을 설정하는 함수
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ userId, currentTab, setCurrentTab }) => {
  const [role, setRole] = useState<string | null>(null); // 사용자 역할을 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // Supabase에서 현재 사용자의 역할(role)을 가져옵니다.
        const { data, error } = await browserSupabase()
          .from('users') // `users` 테이블을 대상으로
          .select('role') // `role` 필드만 가져옵니다.
          .eq('id', userId) // 조건: `id`가 현재 사용자 ID와 동일
          .single(); // 단일 결과만 반환

        if (error) throw error; // 에러 발생 시 예외 처리

        setRole(data?.role || null); // 데이터가 있으면 역할을 설정하고, 없으면 null로 설정
      } catch (err) {
        console.error('Error fetching user role:', err); // 콘솔에 에러 메시지 출력
        setError('사용자 역할을 불러오는 중 오류가 발생했습니다.'); // 에러 메시지 상태 업데이트
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchUserRole(); // 역할을 가져오는 비동기 함수 호출
  }, [userId]); // `userId`가 변경될 때마다 실행

  // 로딩 중인 경우 로딩 메시지를 출력
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 에러가 발생한 경우 에러 메시지를 출력
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 사용자가 고객(Customer) 역할일 경우 고객용 사이드바를 렌더링
  if (role === 'customer') {
    return <UserSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />;
  }

  // 사용자가 사업자(Business) 역할일 경우 사업자용 사이드바를 렌더링
  if (role === 'business') {
    return <BusinessSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />;
  }

  // 유효하지 않은 역할일 경우 메시지를 출력
  return <p className="text-center text-gray-600">유효하지 않은 사용자 역할입니다.</p>;
};

export default SidebarWrapper;
