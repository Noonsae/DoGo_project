'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/app/my-page/_components/AdminSidebar';
import CompanyList from '@/app/my-page/_components/CompanyList';
import CooperationRequests from '@/app/my-page/_components/CooperationRequests';
import BookingList from '@/app/my-page/_components/BookingList';
import InquiryList from '@/app/my-page/_components/InquiryList'; // 문의 리스트 컴포넌트 추가

// 🔹 AdminTabType 정의 ('inquiry' 추가)
type AdminTabType = 'company' | 'requests' | 'bookings' | 'inquiry';

const AdminPage: React.FC = () => {
  // 현재 선택된 탭 상태 관리
  const [currentTab, setCurrentTab] = useState<AdminTabType>('company');

  // 탭에 따른 콘텐츠 렌더링 함수
  const renderContent = () => {
    switch (currentTab) {
      case 'company':
        return <CompanyList />;
      case 'requests':
        return <CooperationRequests />;
      case 'bookings':
        return <BookingList />;
      case 'inquiry': // 🔹 'inquiry' 추가
        return <InquiryList />;
      default:
        return (
          <p className="text-center text-gray-600">
            유효한 메뉴를 선택하세요.
          </p>
        );
    }
  };

  return (
    <div className="flex h-screen translate-y-20">
      {/* 사이드바 */}
      <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
