'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import UserSidebar from '@/app/my-page/_components/Usersidebar';
import ProfileContent from '@/app/my-page/_components/ProfileContent';
import BookingsContent from '@/app/my-page/_components/BookingsContent';
import FavoritesContent from '@/app/my-page/_components/FavoritesContent';
import ReviewsContent from '@/app/my-page/_components/ReviewsContent';
import InquiryContent from '@/app/my-page/_components/InquiryManagement';

type TabType = 'profile' | 'bookings' | 'favorites' | 'reviews' | 'inquiries';

export default function UserPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const currentTab: TabType = (pathname.split('/').pop() as TabType) || 'profile';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/user');
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || '사용자 정보를 가져올 수 없습니다.');

        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderContent = () => {
    if (!userData) {
      return <p className="text-center text-gray-500">사용자 데이터를 불러오는 중입니다.</p>;
    }

    switch (currentTab) {
      case 'profile':
        return <ProfileContent userId={userData.id} />;
      case 'bookings':
        return <BookingsContent userId={userData.id} />;
      case 'favorites':
        return <FavoritesContent userId={userData.id} />;
      case 'reviews':
        return <ReviewsContent userId={userData.id} />;
      case 'inquiries':
        return <InquiryContent userId={userData.id} />;
      default:
        return <p className="text-center text-gray-500">유효하지 않은 탭입니다.</p>;
    }
  };

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex">
      <UserSidebar
        userId={userData?.id}
        currentTab={currentTab}
        setCurrentTab={(tab) => router.push(`/my-page/${tab}`)} // TabType과 라우팅 처리
      />

      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}
