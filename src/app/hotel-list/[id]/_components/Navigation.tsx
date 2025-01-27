import React from 'react';
import { NavigationType } from '@/types/hotel/navigation-type';

const Navigation = ({ activeTab, scrollToSection }: NavigationType) => {
  return (
    <div>
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div>
          <ul className="flex space-x-6 py-4">
            {[
              { id: 'overview', label: '개요' },
              { id: 'rooms', label: '객실 선택' },
              { id: 'reviews', label: '이용 후기' },
              { id: 'services', label: '시설/서비스' },
              { id: 'policies', label: '숙소 정책' },
              { id: 'location', label: '위치' },
              { id: 'nearby', label: '호텔 주변 명소' }
            ].map((tab) => (
              <li key={tab.id}>
                <a
                  href={`#${tab.id}`}
                  className={`cursor-pointer pb-2 ${
                    activeTab === tab.id ? 'border-b-2 border-[#A0522D] text-[#8B4513] font-semibold' : 'text-gray-800'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(tab.id);
                  }}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
