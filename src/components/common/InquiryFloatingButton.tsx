'use client';

import { useState } from 'react';
import InquiryModal from '../ui/inquiry/InquiryModal';
import { usePathname } from 'next/navigation';
import SupportIcon from '../ui/icon/SupportIcon';

const InquiryFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (
    pathname === '/sign-in' ||
    pathname === '/sign-up' ||
    pathname === '/sign-up/user' ||
    pathname === '/sign-up/business'
  )
    return null;

  const hotelIdMatch = pathname.match(/\/hotel-list\/([^/]+)/);
  const hotel_id = hotelIdMatch ? hotelIdMatch[1] : undefined;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className=" fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#B3916A]
transition-all duration-300 ease-in-out p-2 w-[48px] h-[48px] shadow-md
flex items-center justify-center text-base md:text-lg leading-none  rounded-[16px]
hover:bg-[#8E6B4A] hover:scale-110 active:scale-95 

"
      >
        <SupportIcon />
      </button>

      {isOpen && <InquiryModal isOpen={isOpen} onClose={() => setIsOpen(false)} hotel_id={hotel_id} />}
    </>
  );
};

export default InquiryFloatingButton;
