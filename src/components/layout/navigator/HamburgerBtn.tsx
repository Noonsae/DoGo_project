'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useClickAway } from 'react-use';

import useAuthStore from '@/store/useAuth';

import { HiOutlineMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

import Link from 'next/link';

const HamburgerBtn: React.FC = () => {
  const { user, loadUserFromCookie, signOutUser } = useAuthStore(); // Zustand 상태 가져오기
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 마운트 시 쿠키에서 유저 정보 로드
  useEffect(() => {
    loadUserFromCookie();
  }, []);

  // 로그인 상태 확인
  const isLoggedIn = user !== null;

  // 로그아웃 처리
  const handleLogout = () => {
    signOutUser(null); // 유저 정보 초기화
  };

  // 햄버거 메뉴 토글
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 외부 클릭 감지
  useClickAway(menuRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={menuRef}>
      {/* 햄버거 버튼 */}
      <div
        className="flex flex-col justify-between w-[24px] h-[24px] cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <IoClose className="w-[24px] h-[24px] text-white" />
        ) : (
          <HiOutlineMenu className="w-[24px] h-[24px] text-white" />
        )}
      </div>

      {/* 토글 메뉴 */}
      {isOpen && (
        <div className="absolute top-8 left-0 w-[200px] px-[8px] py-[12px] bg-white shadow-lg rounded-[8px]">
          <ul>
            {isLoggedIn ? (
              <>
                {/* 로그아웃 메뉴 */}
                <li>
                  <Link
                    href="#"
                    onClick={handleLogout}
                    className="px-[16px] py-[12px] w-full h-[43px] flex items-center text-base text-[#2c2c2c] font-normal hover:text-blue-500 rounded-[8px] hover:bg-[#f8f8f8]"
                  >
                    로그아웃
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* 로그인 메뉴 */}
                <li>
                  <Link
                    href="/sign-in"
                    className="px-[16px] py-[12px] w-full h-[43px] flex items-center text-base text-[#2c2c2c] font-normal hover:text-blue-500 rounded-[8px] hover:bg-[#f8f8f8]"
                  >
                    로그인
                  </Link>
                </li>
                {/* 회원가입 메뉴 */}
                <li>
                  <Link
                    href="/sign-up"
                    className="px-[16px] py-[12px] w-full h-[43px] flex items-center text-base text-[#2c2c2c] font-normal hover:text-blue-500 rounded-[8px] hover:bg-[#f8f8f8]"
                  >
                    회원가입
                  </Link>
                </li>
              </>
            )}
            <hr className="border-0.5px] border-gray-200" />
            {/* Event 메뉴 */}
            <li>
              <Link
                href="/event"
                className="px-[16px] py-[12px] w-full h-[43px] flex items-center text-base text-[#2c2c2c] font-normal hover:text-blue-500 rounded-[8px] hover:bg-[#f8f8f8]"
              >
                EVENT
              </Link>
            </li>
            {/* 고객센터 메뉴 */}
            <li>
              <Link
                href="/contact"
                className="px-[16px] py-[12px] w-full h-[43px] flex items-center text-base text-[#2c2c2c] font-normal hover:text-blue-500 rounded-[8px] hover:bg-[#f8f8f8]"
              >
                고객센터
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerBtn;
