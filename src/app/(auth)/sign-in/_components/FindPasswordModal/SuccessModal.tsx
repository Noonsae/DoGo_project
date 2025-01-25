'use client';

import CheckIcon from '@/components/ui/icon/CheckIcon';
import React from 'react';

const SuccessModal = ({ form, onClose }: { form: any; onClose: () => void }) => (
  <div className="w-[424px] h-[635px] mt-[36px] flex flex-col items-center justify-center">
    <div className="w-[352px] h-[411px] mt-[120px] flex flex-col justify-center items-center">
      <CheckIcon />
      <div className="text-center">
        <span className="text-lg leading-[135%] font-pretendard font-semibold">{form.name}님의</span>
        <div className="flex">
          <p className="text-lg leading-[135%] font-pretendard font-semibold text-[#B3916A]">비밀번호가 재설정</p>
          <p className="text-lg leading-[135%] font-pretendard font-semibold">되었습니다.</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-[200px] w-[352px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
      >
        확인
      </button>
    </div>
  </div>
);

export default SuccessModal;
