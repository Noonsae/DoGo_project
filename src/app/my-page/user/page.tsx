'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

import UserSidebar from '@/app/my-page/_components/Usersidebar';
import ProfileContent from '@/app/my-page/_components/ProfileContent';
import BookingsContent from '@/app/my-page/_components/BookingsContent';
import FavoritesContent from '@/app/my-page/_components/FavoritesContent';
import ReviewsContent from '@/app/my-page/_components/ReviewsContent';
import InquiryManagement from '@/app/my-page/_components/InquiryManagement';

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
        // Supabase 인증된 사용자 가져오기
        const {
          data: { user },
          error: authError
        } = await browserSupabase().auth.getUser();

        if (authError || !user) throw new Error('사용자 정보를 가져올 수 없습니다.');

        // 사용자 ID 저장
        setUserId(user.id);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 현재 탭에 따라 적절한 콘텐츠 렌더링
  const renderContent = () => {
    if (!userId) return <p className="text-center text-gray-500">사용자 정보를 불러오지 못했습니다.</p>;

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

  // 로딩 상태 처리
  if (loading) return <p className="text-center text-gray-500">페이지를 로드하는 중입니다...</p>;

  // 에러 상태 처리
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <aside className="w-64 bg-gray-100 h-full shadow-md fixed">
        <UserSidebar
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
