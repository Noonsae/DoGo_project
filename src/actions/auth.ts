'use server';

import { serverSupabase } from '@/supabase/supabase-server';
import { redirect } from 'next/navigation';

export const getUser = async () => {
  const supabase = await serverSupabase();
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

export const logout = async () => {
  const supabase = await serverSupabase();
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const kakaoLogin = async () => {
  const supabase = await serverSupabase();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: { redirectTo: 'https://dsggwbvtcrwuopwelpxy.supabase.co/auth/v1/callback' }
  });

  if (error) {
    throw new Error(`소셜 로그인 실패: ${error.message}`);
  }

  if (data?.url) {
    redirect(data.url);
  }
};

export const getUserRole = async (userId: string | undefined) => {
  if (!userId) {
    return { data: null };
  }
  const supabase = await serverSupabase();
  // 현재 role을 찾는 API 요청
  const { data, error } = await supabase.from('users').select('role').eq('id', userId).single();
  if (error) {
    throw new Error(`유저 역할 가져오기 실패: ${error?.message}`);
  }

  return { data };
};
