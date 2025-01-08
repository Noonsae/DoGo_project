'use client';

import React, { useState } from 'react';
import { useClickAway } from 'react-use'; // 외부 클릭 감지를 위한 훅

import { isLogined } from '@/utils/isLogin';
import NavigationMenuItem from './NavigatorMenuItem';

const HamburgerBtn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuRef = React.useRef<HTMLDivElement | null>(null);

  // 외부 클릭 감지
  useClickAway(menuRef, () => {
    setIsOpen(false);
  });

  // 로그인 상태에 따른 메뉴 항목
  const menuItems = isLogined()
    ? [
        { href: '#', label: '로그아웃' }, // 로그인 상태일 때
        { href: '/event', label: 'Event' },
        { href: '/contact', label: '고객센터' }
      ]
    : [
        { href: '/sign-in', label: '로그인' }, // 비로그인 상태일 때
        { href: '/sign-up', label: '회원가입' },
        { href: '/event', label: 'Event' },
        { href: '/contact', label: '고객센터' }
      ];

  return (
    <div className="relative" ref={menuRef}>
      {/* 햄버거 버튼 */}
      <div
        className={`flex flex-col justify-between w-[24px] h-[24px] cursor-pointer ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span
          className={`h-1 w-full bg-gray-800 rounded transition-transform duration-300 ${
            isOpen ? 'translate-y-2.5 rotate-45' : ''
          }`}
        ></span>
        <span
          className={`h-1 w-full bg-gray-800 rounded transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
        ></span>
        <span
          className={`h-1 w-full bg-gray-800 rounded transition-transform duration-300 ${
            isOpen ? '-translate-y-2.5 -rotate-45' : ''
          }`}
        ></span>
      </div>

      {/* 토글 메뉴 */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-[200px] px-[8px] py-[12px] bg-white shadow-lg rounded-[8px]">
          <ul>
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index} href={item.href} label={item.label} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerBtn;
