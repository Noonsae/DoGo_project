'use client';

import React, { useEffect, useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client'; // Supabase 클라이언트 가져오기

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
        // Supabase에서 사용자 데이터 조회
        const { data, error } = await browserSupabase()
          .from('users') // `users` 테이블 조회
          .select('user_name, created_at') // 필요한 필드 선택
          .eq('id', userId) // 현재 사용자 ID와 일치하는 항목 필터링
          .single(); // 단일 결과 반환

        if (error) throw error; // 에러 발생 시 예외 처리

        // 상태 업데이트
        setUserName(data?.user_name || 'Unknown'); // 이름 설정
        setCreatedAt(data?.created_at || null); // 가입일 설정
      } catch (err) {
        console.error('Error fetching user data:', err); // 에러 출력
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchUserData(); // 데이터 가져오기 함수 호출
  }, [userId]); // userId가 변경될 때마다 실행

  // 로딩 중인 경우
  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <aside className="w-64 bg-gray-100 p-4">
      {/* 사용자 정보 섹션 */}
      <div className="mb-4">
        <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
        <p className="text-center mt-2 font-bold">{userName}</p>
        <p className="text-center text-sm text-gray-600">
          가입일: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
        </p>
      </div>

      {/* 메뉴 목록 */}
      <ul>
        {/* 프로필 관리 */}
        <li
          className={`p-2 cursor-pointer ${
            currentTab === 'profile' ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentTab('profile')}
        >
          프로필 관리
        </li>

        {/* 예약 목록 */}
        <li
          className={`p-2 cursor-pointer ${
            currentTab === 'bookings' ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentTab('bookings')}
        >
          예약 목록
        </li>

        {/* 찜 목록 */}
        <li
          className={`p-2 cursor-pointer ${
            currentTab === 'favorites' ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentTab('favorites')}
        >
          찜 목록
        </li>

        {/* 작성한 후기 */}
        <li
          className={`p-2 cursor-pointer ${
            currentTab === 'reviews' ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentTab('reviews')}
        >
          작성한 후기
        </li>
      </ul>
    </aside>
  );
};

export default UserSidebar;
