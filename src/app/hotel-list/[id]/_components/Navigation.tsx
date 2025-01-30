import React, { useEffect } from 'react';
import { NavigationType } from '@/types/hotel/navigation-type';

const sections = [
  { id: 'overview', label: '개요' },
  { id: 'rooms', label: '객실 선택' },
  { id: 'reviews', label: '이용 후기' },
  { id: 'services', label: '시설/서비스' },
  { id: 'policies', label: '숙소 정책' },
  { id: 'location', label: '위치' },
  { id: 'nearby', label: '호텔 주변 명소' }
];

const Navigation = ({ activeTab, scrollToSection, setActiveTab }: NavigationType) => {
  useEffect(() => {
    if (!setActiveTab) return; // ✅ `setActiveTab`이 없으면 실행 안 함

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [setActiveTab]);

  return (
    <div>
      <div className="fixed top-[148px] left-0 w-full z-20 bg-white border-b-0 shadow-sm">
        <div className="max-w-[1200px] mx-auto">
          <ul className="flex ml-4 gap-[52px] py-4">
            {sections.map((tab) => (
              <li key={tab.id} className="text-center">
                <a
                  href={`#${tab.id}`}
                  className={`cursor-pointer pb-2 text-[16px] ${
                    activeTab === tab.id ? 'border-b-2 border-[#B3916A] text-[#534431] font-semibold' : 'text-[#777]'
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
