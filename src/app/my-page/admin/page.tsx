'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/app/my-page/_components/AdminSidebar';
import CompanyList from '@/app/my-page/_components/CompanyList';
import CooperationRequests from '@/app/my-page/_components/CooperationRequests';
import BookingList from '@/app/my-page/_components/BookingList'

// AdminPage 컴포넌트 정의
const AdminPage: React.FC = () => {
  // 현재 선택된 탭 상태 관리
  const [currentTab, setCurrentTab] = useState('company');

  // 각 컴포넌트에 전달할 기본 props
  const defaultProps = {
    currentTab, // 현재 탭
    setCurrentTab, // 탭 변경 함수
  };

  // 탭에 따른 콘텐츠 렌더링 함수
  const renderContent = () => {
    switch (currentTab) {
      case 'company':
        return <CompanyList {...defaultProps} />;
      case 'requests':
        return <CooperationRequests {...defaultProps} />;
      case 'bookings':
        return <BookingList {...defaultProps} />;
      default:
        return <p className="text-center text-gray-600">유효한 메뉴를 선택하세요.</p>;
    }
  };

  return (
    <div className="flex">
      {/* 사이드바 */}
      <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPage;
