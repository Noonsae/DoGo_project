'use client';

import { useState } from 'react';
import InquiryModal from '../ui/inquiry/InquiryModal';
import { usePathname } from 'next/navigation';

const InquiryFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/sign-in' || pathname === '/sign-up') return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#B3916A] text-white rounded-full shadow-lg 
  transition-all duration-300 ease-in-out w-[120px] md:w-[140px] h-[50px] md:h-[55px] 
  flex items-center justify-center text-base md:text-lg font-semibold leading-none pt-0.5
  hover:bg-[#8E6B4A] hover:scale-110 active:scale-95"
      >
        문의하기
      </button>

      {isOpen && <InquiryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default InquiryFloatingButton;
