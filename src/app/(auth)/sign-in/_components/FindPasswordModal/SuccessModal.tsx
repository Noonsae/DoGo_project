'use client';

import CheckIcon from '@/components/ui/icon/CheckIcon';
import React from 'react';

const SuccessModal = ({ form, onClose }: { form: any; onClose: () => void }) => (
  <div>
    <div className="flex flex-col justify-center items-center z-50">
      <div className="flex flex-col justify-center items-center text-center w-[352px] h-[411px] mt-[40px]">
        <CheckIcon />
        <span className="text-xl leading-[135%] font-pretendard font-semibold ">
          {' '}
          {(form.name && `${form.name}님의`) || '회원님의'}
        </span>
        <div className="flex">
          <p className="text-xl leading-[135%] font-pretendard font-semibold text-[#B3916A]">비밀번호가 재설정</p>
          <p className="text-xl leading-[135%] font-pretendard font-semibold">되었습니다.</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-full max-w-[352px] mb-[36px] mt-[40px] md:mt-[90px] bg-[#B3916A] font-bold text-white h-[48px] rounded-xl hover:bg-[#a37e5f] transition text-base md:text-lg flex items-center justify-center"
      >
        확인
      </button>
    </div>
  </div>
);

export default SuccessModal;
