'use client';

import React from 'react';

// 관리자 사이드바에서 사용할 메뉴 항목 정의
const menus = [
  { id: 'company', label: '업체 리스트' }, // 회사와 관련된 내용 (예: 업체 관리 화면으로 연결)
  { id: 'requests', label: '협력 요청' }, // 협력 요청 테이블과 매칭된 내용 (예: 협력 요청 관리 화면으로 연결)
  { id: 'bookings', label: '예약 리스트' }, // bookings 테이블과 매칭된 내용 (예: 예약 관리 화면으로 연결)
];

// 컴포넌트에 전달되는 props 타입 정의
interface AdminSidebarProps {
  currentTab: string; // 현재 선택된 탭의 ID
  setCurrentTab: (tab: string) => void; // 탭을 변경하는 함수
}

// AdminSidebar 컴포넌트 정의
const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      {/* 관리자 정보 섹션 */}
      <div className="mb-6 text-center">
        {/* 관리자 프로필 이미지 */}
        <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
        {/* 관리자 이름 */}
        <p className="mt-2 font-bold">관리자</p>
        {/* 관리자 설명 텍스트 */}
        <p className="text-sm text-gray-600">관리자 페이지</p>
      </div>

      {/* 메뉴 리스트 섹션 */}
      <ul className="space-y-2">
        {/* 메뉴 항목을 반복적으로 렌더링 */}
        {menus.map((menu) => (
          <li
            key={menu.id} // 메뉴 항목의 고유 ID
            className={`p-2 cursor-pointer rounded ${
              currentTab === menu.id // 현재 탭과 일치하는 경우
                ? 'bg-gray-300 font-semibold' // 선택된 탭 스타일
                : 'hover:bg-gray-200' // 비활성화된 탭에 호버 시 스타일
            }`}
            onClick={() => setCurrentTab(menu.id)} // 클릭 시 해당 탭으로 변경
            aria-current={currentTab === menu.id ? 'page' : undefined} // 접근성을 위한 현재 페이지 표시
          >
            {menu.label} {/* 메뉴 항목의 텍스트 */}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
