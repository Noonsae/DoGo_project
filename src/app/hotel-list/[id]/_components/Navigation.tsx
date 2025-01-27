import React from 'react';
import { NavigationType } from '@/types/hotel/navigation-type';

const Navigation = ({ activeTab, scrollToSection }: NavigationType) => {
  return (
    <div>
      {/* 네비게이션 컨테이너 */}
      <div className="fixed top-[148px] left-0 w-full z-20 bg-white border-b-0 shadow-sm before:absolute before:content-[''] before:left-0 before:top-full before:w-full before:border-b before:border-[#bfbfbf]">
        <div className="max-w-[1200px] mx-auto">
          {/* 네비게이션 리스트 */}
          <ul className="flex ml-4 gap-[52px] py-4">
            {[
              { id: 'overview', label: '개요' },
              { id: 'rooms', label: '객실 선택' },
              { id: 'reviews', label: '이용 후기' },
              { id: 'services', label: '시설/서비스' },
              { id: 'policies', label: '숙소 정책' },
              { id: 'location', label: '위치' },
              { id: 'nearby', label: '호텔 주변 명소' }
            ].map((tab) => (
              <li key={tab.id} className="text-center">
                <a
                  href={`#${tab.id}`}
                  className={`cursor-pointer pb-2 text-[16px] ${
                    activeTab === tab.id ? 'border-b-2 border-[#B3916A] text-[#534431] font-semibold' : 'text-[#777]'
                  }`}
                  onClick={(e) => {
                    e.preventDefault(); // 기본 동작 방지
                    scrollToSection(tab.id); // 스크롤 함수 호출
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
