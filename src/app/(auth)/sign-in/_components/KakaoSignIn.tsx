'use client';

import React from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import useAuthStore from '@/store/useAuth';
import KaKaoIcon from '@/components/ui/icon/KaKaoIcon';

const KakaoSignIn = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const kakaoLogin = async () => {
    try {
      const { data, error } = await browserSupabase().auth.signInWithOAuth({
        provider: 'kakao',
        options: { redirectTo: 'http://localhost:3000/api/auth/kakao' }
      });

      if (data?.user) {
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
          <KaKaoIcon />

          <p className="w-full"> 카카오로 시작하기</p>
        </div>
      </button>
    </div>
  );
};

export default KakaoSignIn;
