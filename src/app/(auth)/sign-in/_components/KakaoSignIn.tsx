'use client';

import { kakaoLogin as kakaoLoginAction } from '@/actions/auth';
import React from 'react';
import KaKaoIcon from '@/components/ui/icon/KaKaoIcon';

const KakaoSignIn = () => {
  const kakaoLogin = async () => {
    try {
      await kakaoLoginAction();
    } catch (err) {}
  };

  return (
    <div className="flex flex-col items-center ">
      <button
        onClick={kakaoLogin}
        className="w-full max-w-[450px] bg-[#FEE500] text-black py-1 rounded-[8px] flex items-center gap-2 hover:text-gray-500 transition"
      >
        <KaKaoIcon />
        <p className="w-full text-center">카카오로 시작하기</p>
      </button>
    </div>
  );
};

export default KakaoSignIn;
