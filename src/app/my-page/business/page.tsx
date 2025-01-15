'use client';

import React, { useState } from 'react';
import BusinessSidebar from '@/app/my-page/_components/BusinessSidebar';
import HotelManagement from '@/app/my-page/_components/HotelManagement';
import PolicyManagement from '@/app/my-page/_components/PolicyManageMent';
import RoomManagement from '@/app/my-page/_components/RoomManageMent';
import BookingManagement from '@/app/my-page/_components/BookingManagement';
import InquiryManagement from '@/app/my-page/_components/InquiryManagement';
import ProfileManagement from '@/app/my-page/_components/ProfileManagement';

// Props 타입 정의
interface BusinessPageProps {
  userId: string; // 사용자 ID
}

// BusinessPage 컴포넌트 정의
const BusinessPage: React.FC<BusinessPageProps> = ({ userId }) => {
  const [currentTab, setCurrentTab] = useState('hotel'); // 기본 탭 설정

  // 탭에 따른 콘텐츠 렌더링
  const renderContent = () => {
    switch (currentTab) {
      case 'hotel':
        return <HotelManagement userId={userId} />;
      case 'policy':
        return <PolicyManagement userId={userId} />;
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

  return (
    <div className="flex h-screen">
      {/* Business Sidebar */}
      <aside className="w-64 bg-gray-100 fixed top-0 left-0 h-screen overflow-auto">
        <BusinessSidebar
          userId={userId}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
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
