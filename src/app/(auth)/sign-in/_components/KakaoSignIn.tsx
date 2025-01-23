'use client';

import { kakaoLogin as kakaoLoginAction } from '@/actions/auth';
import React from 'react';
import KaKaoIcon from '@/components/ui/icon/KaKaoIcon';

const KakaoSignIn = () => {
  const kakaoLogin = async () => {
    try {
      await kakaoLoginAction();
    } catch (err) {
      console.error('예기치 않은 오류:', err);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <button
        onClick={kakaoLogin}
        className="w-[400px] bg-[#FEE500] text-black py-1 rounded-[8px] items-center gap-2 hover:text-gray-500 transition"
      >
        <div className="flex items-center">
          <KaKaoIcon />
          <p className="w-full">카카오로 시작하기</p>
        </div>
      </button>
    </div>
  );
};

export default KakaoSignIn;
