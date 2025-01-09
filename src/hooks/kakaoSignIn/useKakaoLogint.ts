'use client';

export const useKakaoLogin = () => {
  const handleKakaoLogin = () => {
    const redirectTo = `https://dsggwbvtcrwuopwelpxy.supabase.co/auth/v1/authorize?provider=kakao`;
    window.location.href = redirectTo;
  };

  return { handleKakaoLogin };
};
