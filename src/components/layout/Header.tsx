"use client"

import Link from 'next/link';

import useAuthStore from '@/store/useAuth';

import Logo from './Logo';
import MyPageIcon from './navigator/MyPageIcon';
import HamburgerBtn from './navigator/HamburgerBtn';

const Header = () => {
  
  const isLoggedIn = useAuthStore((state) => state.user !== null);

  return (
    // header 전체 범위
    <div className="w-full h-[76px] fixed bg-none">
      {/* header 이너값 max-width-1200px */}
      <div className="w-full max-w-[1200px] h-[76px] mx-auto flex flex-row justify-between items-center">
        {/* Logo : DoGo */}
        <h1 className="text-[40px]">
          {/* 클릭 시 홈페이지로 이동 */}
          <Link href="/">
            <Logo />
          </Link>
        </h1>

        {/* icon 영역  */}
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            {/* 클릭 시 마이페이지로 이동 (로그인 상태일 때만 노출) */}
            {isLoggedIn  &&  (
              <Link href="/my-page">
                <MyPageIcon />
              </Link>
            )}

            {/* 햄버거 btn을 클릭 시 모달 생성되어 로그인/로그아웃 가능 */}
            <HamburgerBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
