// 'use client';

import Link from 'next/link';

import Logo from './Logo';
import MyPageIcon from './navigator/MyPageIcon';
import HamburgerBtn from './navigator/HamburgerBtn';
import { getUser, getUserRole } from '@/actions/auth';

const Header = async () => {
  const { data } = await getUser();
  const { data: userRole } = await getUserRole(data?.user?.id);

  const mypageLink =
    userRole?.role !== null && userRole?.role === 'admin'
      ? `/my-page/${userRole.role}`
      : `/my-page/${userRole?.role}/profile`;
  return (
    // header 전체 범위
    <div className="w-full h-[76px] fixed bg-[#221A1A] z-50">
      {/* header 이너값 max-width-1200px */}
      <div className="w-full max-w-[1300px] px-[50px] h-[76px] mx-auto flex flex-row justify-between items-center">
        {/* Logo : DoGo */}
        <Link href="/" className="flex items-center h-[36px] p-[15px]">
          <h1>
            {/* 클릭 시 홈페이지로 이동 */}
            <Logo />
          </h1>
        </Link>
        {/* h1이 아니라 링크 영역에다 높이를 잡아줘야 된다 */}

        {/* icon 영역  */}
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            {/* 클릭 시 마이페이지로 이동 (로그인 상태일 때만 노출) */}
            {/* 일반 사용자 -> my-page/user */}
            {/* 비즈니스 사용자 -> my-page/business */}
            {data?.user && userRole && (
              <Link href={mypageLink} className="p-[10px]">
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
