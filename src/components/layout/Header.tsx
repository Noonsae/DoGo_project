import React from 'react'

import MyPageIcon from '../common/MyPageIcon';
import HamburgerBtn from '../common/HamburgerBtn';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="w-full h-[86px] fixed">
      <div className="w-full max-w-[1200px] h-[86px] mx-auto flex flex-row justify-between items-center border border-black">
        <h1 className='text-[32px] font-black'>          
          <Link href="/">DoGo</Link>
        </h1>
        <div className="flex flex-row">
          <MyPageIcon />
          <HamburgerBtn />
        </div>
      </div>
    </div>
  );
}

export default Header;