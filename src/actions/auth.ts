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
  const redirectUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/auth/kakao/callback'
      : 'https://do-go-project.vercel.app/api/auth/kakao/callback';
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account'
      }
    }
  });

  if (error) {
    console.error('OAuth 로그인 실패:', error);
    throw new Error(`소셜 로그인 실패: ${error.message}`);
  }

  if (data?.url) {
    redirect(data.url);
  } else {
    console.error('❌ Redirect URL이 없음!');
  }
};

export const updatePhoneNumber = async (userId: string, phoneNumber: string) => {
  if (!userId || !phoneNumber) {
    throw new Error('잘못된 요청입니다.');
  }

  const supabase = await serverSupabase();
  const { error } = await supabase.from('users').update({ phone_number: phoneNumber }).eq('id', userId);

  if (error) {
    throw new Error(`전화번호 업데이트 실패: ${error.message}`);
  }

  return { success: true };
};

export async function updateKaKao(userId: string, phoneNumber: string): Promise<{ success: boolean }> {
  if (!userId || !phoneNumber) {
    throw new Error('잘못된 요청입니다.');
  }

  const supabase = await serverSupabase();
  const { error } = await supabase.from('users').update({ phone_number: phoneNumber }).eq('id', userId);

  if (error) {
    throw new Error(`전화번호 업데이트 실패: ${error.message}`);
  }

  return { success: true };
}

export const getUserRole = async (userId: string | undefined) => {
  if (!userId) {
    return { data: null };
  }
  const supabase = await serverSupabase();
  const { data, error } = await supabase.from('users').select('role').eq('id', userId).single();
  if (error) {
    throw new Error(`유저 역할 가져오기 실패: ${error?.message}`);
  }

  return { data };
};
