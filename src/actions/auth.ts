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

// TODO:
// 1. 카카오 로그인은 trigger를 추가해야 한다.
// 2. 하지만 카카오 로그인 시 전화번호와 role 등 필요한 정보를 받지 못한다.
// 3. 마이페이지에서 전화번호와 같은 필수 정보를 따로 받아야 한다.
//
// 문제: role은 처음부터 정해져야 한다.
// -> 1) 비즈니스 사용자는 카카오 로그인 금지
// -> 2) 방법을 뭔가 찾는다.

// 카카오 로그인 -> users 테이블에 데이터를 넣기 위해선 trigger를 써야 한다.
// 문제: 일반 회원가입도 trigger에 포함된다 -> insert 로직을 지워야 한다.

// 방법
// 1. 일반 회원가입의 options을 활용하여 추가 정보를 넣는다. -> 가능
// 2. 카카오 로그인은 강제로 role을 users로 두고, 다른 정보는 마이페이지에서 직접 입력하게 한다.

export const kakaoLogin = async () => {
  const supabase = await serverSupabase();
  const redirectUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000' // 로컬 환경
      : process.env.NEXT_PUBLIC_BASE_URL || 'https://do-go-project.vercel.app';
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      // redirectTo: 'https://dsggwbvtcrwuopwelpxy.supabase.co/auth/v1/callback'
      redirectTo: `${redirectUrl}`
    }
  });

  // 커밋용
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

  const { data, error } = await supabase.from('users').select('role').eq('id', userId).single();
  if (error) {
    throw new Error(`유저 역할 가져오기 실패: ${error?.message}`);
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('data:', data);
    console.log('error:', error);
    console.log(userId);
  }
  return { data };
};
