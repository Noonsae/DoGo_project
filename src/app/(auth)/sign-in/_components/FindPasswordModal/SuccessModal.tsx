'use client';

import CheckIcon from '@/components/ui/icon/CheckIcon';
import React from 'react';

const SuccessModal = ({ form, onClose }: { form: any; onClose: () => void }) => (
  <div className=" w-full max-w-[352px] mx-auto">
    <div className="flex flex-col justify-center items-center text-center w-full max-w-[352px] h-[411px] ">
      <CheckIcon />
      <span className="mt-[4px] text-[20px] leading-[27px] font-semibold text-center text-[#636363] text-lg md:text-xl font-pretendard">
        {(form.name && `${form.name}님의`) || '회원님의'}
      </span>
      <div className="flex flex-wrap justify-center">
        <p className="text-[20px] leading-[27px] font-semibold text-center text-[#B3916A] text-lg md:text-xl font-pretendard">
          비밀번호가 재설정
        </p>
        <p className="text-[20px] leading-[27px] font-semibold text-[#636363] text-lg md:text-xl font-pretendard">
          되었습니다.
        </p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="mt-[218px] h-[48px] sm:mt-[40px] text-[18px] sm:text-[20px] w-full max-w-[352px] md:mt-[90px] bg-[#B3916A] font-bold text-white rounded-xl hover:bg-[#a37e5f] transition text-base md:text-lg flex items-center justify-center"
    >
      확인
    </button>
  </div>
);

export default SuccessModal;
