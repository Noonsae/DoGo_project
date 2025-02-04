'use client';

import React from 'react';

interface AdminSidebarProps {
  currentTab: string; // 현재 선택된 탭의 ID
  setCurrentTab: (tab: 'company' | 'requests' | 'bookings'|'inquiry') => void; // 탭 변경 함수
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentTab, setCurrentTab }) => {
  // 메뉴 항목 배열
  const menus = [
    { id: 'company', label: '업체 리스트' },
    { id: 'requests', label: '협력 요청' },
    { id: 'bookings', label: '예약 리스트' },
    { id: 'inquiry', label: '문의 리스트'},
  ];

  return (
    <aside className="w-64 bg-gray-100 h-screen p-6">
      {/* 관리자 정보 섹션 */}
      <div className="mb-8 text-center">
        {/* 관리자 프로필 */}
        <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
        <p className="mt-2 font-bold text-gray-800">관리자</p>
        <p className="text-sm text-gray-600">관리자 페이지</p>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="space-y-4">
        {menus.map((menu) => (
          <li
            key={menu.id} // 각 메뉴 항목의 고유 ID
            className={`p-3 text-center cursor-pointer rounded ${
              currentTab === menu.id
                ? 'bg-brown-500 text-gray font-semibold'
                : 'hover:bg-gray-200 text-gray-600'
            }`}
            onClick={() => setCurrentTab(menu.id as 'company' | 'requests' | 'bookings'|'inquiry')} // 클릭 시 탭 변경
            aria-current={currentTab === menu.id ? 'page' : undefined} // 접근성 설정
          >
            {menu.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
