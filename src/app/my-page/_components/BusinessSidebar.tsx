import React from 'react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const BusinessSidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const menus = [
    { id: 'hotel', label: '호텔 관리' },
    { id: 'policy', label: '정책 관리' },
    { id: 'room', label: '객실 관리' },
    { id: 'booking', label: '예약 관리' },
    { id: 'inquiry', label: '문의 관리' },
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <div className="mb-6">
        <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
        <p className="text-center mt-2 font-bold">Business Name</p>
        <p className="text-center text-sm text-gray-600">가입일: 2025.01.06</p>
      </div>
      <ul className="space-y-2">
        {menus.map((menu) => (
          <li
            key={menu.id}
            className={`p-2 cursor-pointer ${
              currentTab === menu.id ? 'bg-gray-300' : ''
            }`}
            onClick={() => setCurrentTab(menu.id)}
          >
            {menu.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BusinessSidebar;
