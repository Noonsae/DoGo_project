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
    options: { redirectTo: 'http://localhost:3000/api/auth/kakao' }
  });

  if (error) {
    throw new Error(`소셜 로그인 실패: ${error.message}`);
  }

  if (data?.url) {
    redirect(data.url);
  }
};
