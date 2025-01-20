'use client';

import React from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import useAuthStore from '@/store/useAuth';
import { User } from '@supabase/supabase-js';

const KakaoSignIn = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const kakaoLogin = async () => {
    try {
      const { data, error }: { data: { user: User | null }; error: Error | null } =
        await browserSupabase().auth.signInWithOAuth({
          provider: 'kakao',
          options: { redirectTo: 'http://localhost:3000/api/auth/kakao' }
        });

      if (data?.user) {
        console.log('소셜 로그인 성공, 사용자 데이터:', data.user);
        setUser(data.user);
      } else {
        console.error('소셜 로그인 실패:', error);
      }
    } catch (err) {
      console.error('예기치 않은 오류:', err);
    }
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={kakaoLogin}
        className="w-[400px] mr-1 bg-[#FEE500] text-black py-1 rounded-[8px]  items-center gap-2 hover:text-gray-500 transition"
      >
        <div className="flex items-center">
          <svg
            width="40"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-[14px]"
          >
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
          <p className="w-full"> 카카오로 시작하기</p>
        </div>
      </button>
    </div>
  );
};

export default KakaoSignIn;
