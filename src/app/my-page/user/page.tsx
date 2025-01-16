'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

import UserSidebar from '@/app/my-page/_components/Usersidebar';
import ProfileContent from '@/app/my-page/_components/ProfileContent';
import BookingsContent from '@/app/my-page/_components/BookingsContent';
import FavoritesContent from '@/app/my-page/_components/FavoritesContent';
import ReviewsContent from '@/app/my-page/_components/ReviewsContent';
import InquiryContent from '@/app/my-page/_components/InquiryManagement';

type TabType = 'profile' | 'bookings' | 'favorites' | 'reviews' | 'inquiries';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UserPage() {
  const [currentTab, setCurrentTab] = useState<TabType>('profile');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch authenticated user
        const {
          data: { user },
          error: authError,
          // TODO: supabase -> browserSupabase 로 바꿔보기 
        } = await supabase.auth.getUser();

        if (authError || !user) throw new Error('로그인된 사용자가 없습니다.');

        // Fetch additional user details
        // supabase에서 user 정보가 없는다. 
        // users 테이블에 없는 것???
        const { data, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single(); // -> 없으면 에러 남 

        if (userError) throw userError;

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
      {/* Sidebar */}
      <UserSidebar
        userId={userData.id}
        currentTab={currentTab}
        setCurrentTab={(tab) => setCurrentTab(tab as TabType)} // TabType을 명시적으로 설정
      />

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}
