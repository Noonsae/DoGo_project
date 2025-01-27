'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client';

import BusinessSidebar from '@/app/my-page/_components/BusinessSidebar';
import HotelManagement from '@/app/my-page/_components/HotelManagement';
import PolicyManagement from '@/app/my-page/_components/PolicyManageMent';
import RoomManagement from '@/app/my-page/_components/RoomManageMent';
import BookingManagement from '@/app/my-page/_components/BookingManagement';
import InquiryManagement from '@/app/my-page/_components/InquiryManagement';
import ProfileManagement from '@/app/my-page/_components/ProfileManagement';
import useAuthStore from '@/store/useAuth';
// Props 타입 정의
// interface BusinessPageProps {
//   userId: string; // 사용자 ID
// }

type BusinessTabType = 'hotel' | 'policy' | 'room' | 'booking' | 'inquiry' | 'profile';
const BusinessPage = () => {
  // const BusinessPage: React.FC<BusinessPageProps> = ({ userId }) => {
  const [currentTab, setCurrentTab] = useState<BusinessTabType>('hotel');
  const [hotelId, setHotelId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const router = useRouter();
  const pathname = usePathname();

  // URL 경로에서 탭 추출 및 설정
  useEffect(() => {
    const tabFromPath = pathname.split('/').pop() as BusinessTabType;
    if (tabFromPath) {
      setCurrentTab(tabFromPath);
    }
  }, [pathname]);

  // 호텔 ID 가져오기
  useEffect(() => {
    const fetchHotelId = async () => {
      try {
        if (!userId) {
          return;
        }
        const { data, error } = await browserSupabase().from('hotels').select('id').eq('user_id', userId).single();

        if (error) throw error;

        setHotelId(data.id);
      } catch (err) {
        console.error('Error fetching hotel ID:', err);
        setError('호텔 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelId();
  }, [userId]);

  // 콘텐츠 렌더링
  const renderContent = () => {
    if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;
    if (!userId) return <p className="text-center text-gray-500">유저 정보를 찾을 수 없습니다.</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    switch (currentTab) {
      case 'hotel':
        return <HotelManagement userId={userId} />;
      case 'policy':
        return hotelId ? (
          <PolicyManagement userId={userId} hotelId={hotelId} />
        ) : (
          <p className="text-center text-gray-600">호텔 정보를 찾을 수 없습니다.</p>
        );
      case 'room':
        return <RoomManagement userId={userId} />;
      case 'booking':
        return <BookingManagement userId={userId} />;
      case 'inquiry':
        return <InquiryManagement userId={userId} />;
      case 'profile':
        return <ProfileManagement userId={userId} />;
      default:
        return <p className="text-center text-gray-600">유효한 메뉴를 선택하세요.</p>;
    }
  };

  if (!userId) {
    return <div>유저 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex h-screen translate-y-6">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 fixed top-0 left-0 h-screen overflow-auto">
        <BusinessSidebar
          userId={userId}
          currentTab={currentTab}
          setCurrentTab={(tab: string) => router.push(`/my-page/business/${tab}`)} // URL 변경으로 탭 설정
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto ml-64 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">사업자 페이지</h1>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default BusinessPage;
