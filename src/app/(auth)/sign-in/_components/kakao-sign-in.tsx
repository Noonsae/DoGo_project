'use client';

import React from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

const KakaoSignIn = () => {
  const kakaoLogin = async () => {
    try {
      await browserSupabase().auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `http://localhost:3000/api/auth/kakao`
        }
      });
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      alert('카카오 로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <button
      onClick={kakaoLogin}
      className="w-[400px] bg-[#FEE500] text-black py-1 rounded-lg flex justify-center items-center gap-2 hover:text-gray-500 transition"
    >
      <div className="flex items-center">
        <svg width="40" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="#FEE500" />
          <g opacity="0.9">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.0053 12C16.639 12 10.666 16.6391 10.666 22.3528C10.666 25.9099 12.9782 29.0446 16.4908 30.9121L15.0087 36.3442C14.8753 36.8259 15.4237 37.2112 15.8461 36.9296L22.3305 32.624C22.8789 32.6759 23.4347 32.7055 23.9979 32.7055C31.3641 32.7055 37.3371 28.0664 37.3371 22.3528C37.3371 16.6391 31.3715 12 24.0053 12Z"
              fill="black"
            />
          </g>
        </svg>
        카카오톡으로 시작하기
      </div>
    </button>
  );
};

export default KakaoSignIn;
