'use client';

import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';

import Link from 'next/link';

import useAuthStore from '@/store/useAuth';
import { logout } from '@/actions/auth';

import HiOutlineMenuIcon from '@/components/ui/icon/HiOutlineMenuIcon';
import IoCloseIcon from '@/components/ui/icon/IoCloseIcon';

const HamburgerBtn: React.FC = () => {
  const { user } = useAuthStore((state) => state); // Zustand 상태 가져오기
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 로그인 상태 확인
  const isLoggedIn = user !== null;


  // 로그아웃 처리

  const handleLogout = async () => {
    await logout();
    location.reload();
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
        className="box-content flex flex-col justify-between w-6 h-6 p-[10px] cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <IoCloseIcon className="w-6 h-6 text-white" /> : <HiOutlineMenuIcon className="w-6 h-6 text-white" />}
      </div>

      {/* 토글 메뉴 */}
      {isOpen && (
        <div className="absolute top-[42px] left-0 w-[200px] h-[216px] p-[8px] bg-white shadow-lg rounded-[8px] z-50">
          <ul>
            {isLoggedIn ? (
              <>
                {/* 로그아웃 메뉴 */}
                <li>
                  <Link
                    href="#"
                    onClick={handleLogout}
                    className="px-[16px] py-[12px] w-full h-[50px] flex items-center text-base text-[#2c2c2c] font-normal rounded-[8px] hover:bg-[#f8f8f8]"
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
                    className="px-[16px] py-[12px] w-full h-[50px] flex items-center text-base text-[#2c2c2c] font-normal rounded-[8px] hover:bg-[#f8f8f8]"
                  >
                    로그인
                  </Link>
                </li>
                {/* 회원가입 메뉴 */}
                <li>
                  <Link
                    href="/sign-up"
                    className="px-[16px] py-[12px] w-full h-[50px] flex items-center text-base text-[#2c2c2c] font-normal rounded-[8px] hover:bg-[#f8f8f8]"
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
                className="px-[16px] py-[12px] w-full h-[50px] flex items-center text-base text-[#2c2c2c] font-normal rounded-[8px] hover:bg-[#f8f8f8]"
              >
                EVENT
              </Link>
            </li>
            {/* 고객센터 메뉴 */}
            <li>
              <Link
                href="/contact"
                className="px-[16px] py-[12px] w-full h-[50px] flex items-center text-base text-[#2c2c2c] font-normal rounded-[8px] hover:bg-[#f8f8f8]"
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
