'use client';

import CheckIcon from '@/components/ui/icon/CheckIcon';
import React from 'react';

const SuccessModal = ({ form, onClose }: { form: any; onClose: () => void }) => (
  <>
    <h1 className="w-full max-w-[352px] ml-[30px] font-semibold text-[24px] mt-[30px] mb-[30px] ">
      가입정보가 <br /> 인증되었습니다.
    </h1>
    <div className="flex flex-col justify-center items-center mt-[100px] ">
      <CheckIcon />
      <div className="text-center  ">
        <span className="text-lg leading-[135%] font-pretendard font-semibold">{form.name}님의</span>
        <div className="flex">
          <p className="text-lg leading-[135%] font-pretendard font-semibold text-[#B3916A]">비밀번호가 재설정</p>
          <p className="text-lg leading-[135%] font-pretendard font-semibold">되었습니다.</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-full max-w-[352px] mt-[40px] md:mt-[120px] bg-[#B3916A] font-bold text-white h-[48px] rounded-xl hover:bg-[#a37e5f] transition text-base md:text-lg flex items-center justify-center"
      >
        확인
      </button>
    </div>
  </>
);

export default SuccessModal;
