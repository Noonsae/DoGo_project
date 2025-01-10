import React from 'react'

import MyPageIcon from './navigator/MyPageIcon';
import HamburgerBtn from './navigator/HamburgerBtn';
import Link from 'next/link';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="w-full h-[86px] fixed bg-white border border-">
      <div className="w-full max-w-[1200px] h-[86px] mx-auto flex flex-row justify-between items-center">
        <h1 className="text-[32px] font-black">
          <Link href="/">
            <Logo/>
          </Link>
        </h1>
        <div className="flex flex-row">
          <Link href="/my-page">
            <MyPageIcon />
          </Link>
          <HamburgerBtn />
        </div>
      </div>
    </div>
  );
}

export default Header;