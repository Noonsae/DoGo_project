'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';


import ProfileContent from '@/app/my-page/_components/ProfileContent';
import BookingsContent from '@/app/my-page/_components/BookingsContent';
import FavoritesContent from '@/app/my-page/_components/FavoritesContent';
import ReviewsContent from '@/app/my-page/_components/ReviewsContent';
import InquiryManagement from '@/app/my-page/_components/InquiryManagement';
import UserSidebar from '../_components/UserSidebar';

// Tab 타입 정의
type TabType = 'profile' | 'bookings' | 'favorites' | 'reviews' | 'inquiries';

const UserPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('profile'); // 현재 활성화된 탭
  const [userId, setUserId] = useState<string | null>(null); // 사용자 ID
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 사용자 정보 로드
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Supabase에서 인증된 사용자 정보 가져오기
        const {
          data: { user },
          error: authError,
        } = await browserSupabase().auth.getUser();

        // 인증 오류 또는 사용자 데이터가 없을 경우 예외 처리
        if (authError || !user) throw new Error('사용자 정보를 가져올 수 없습니다.');

        // 사용자 ID를 상태에 저장
        setUserId(user.id);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchUser(); // 사용자 데이터 로드 함수 호출
  }, []);

  // 현재 활성화된 탭에 따라 적절한 콘텐츠 렌더링
  const renderContent = () => {
    // userId가 없을 경우 에러 메시지 출력
    if (!userId) return <p className="text-center text-gray-500">사용자 정보를 불러오지 못했습니다.</p>;

    // 탭에 따라 적절한 컴포넌트 반환
    switch (currentTab) {
      case 'profile':
        return <ProfileContent userId={userId} />;
      case 'bookings':
        return <BookingsContent userId={userId} />;
      case 'favorites':
        return <FavoritesContent userId={userId} />;
      case 'reviews':
        return <ReviewsContent userId={userId} />;
      case 'inquiries':
        return <InquiryManagement userId={userId} />;
      default:
        return <p className="text-center text-gray-500">유효하지 않은 탭입니다.</p>;
    }
  };

  // 로딩 중일 때 로딩 메시지 출력
  if (loading) return <p className="text-center text-gray-500">페이지를 로드하는 중입니다...</p>;

  // 에러 발생 시 에러 메시지 출력
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex h-screen translate-y-6">
      {/* 사이드바 */}
      <aside className="w-64 bg-gray-100 h-full shadow-md fixed">
        <UserSidebar
          userId={userId!} // userId를 UserSidebar에 전달
          currentTab={currentTab}
          setCurrentTab={(tab) => setCurrentTab(tab as TabType)} // 문자열을 TabType으로 캐스팅
        />
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-64 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">사용자 페이지</h1>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
