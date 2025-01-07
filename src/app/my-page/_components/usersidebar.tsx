import React from 'react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const UserSidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <div className="mb-4">
        <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
        <p className="text-center mt-2">User Name</p>
        <p className="text-center text-sm text-gray-600">가입일: 2025.01.06</p>
      </div>
      <ul>
        <li
          className={`p-2 cursor-pointer ${
            currentTab === 'profile' ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentTab('profile')}
        >
          프로필 관리
        </li>
        <li
          className={`p-2 cursor-pointer ${
            currentTab === 'bookings' ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentTab('bookings')}
        >
          예약 목록
        </li>
        <li
          className={`p-2 cursor-pointer ${
            currentTab === 'favorites' ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentTab('favorites')}
        >
          찜 목록
        </li>
        <li
          className={`p-2 cursor-pointer ${
            currentTab === 'reviews' ? 'bg-gray-200' : ''
          }`}
          onClick={() => setCurrentTab('reviews')}
        >
          작성한 후기
        </li>
      </ul>
    </aside>
  );
};

export default UserSidebar;
