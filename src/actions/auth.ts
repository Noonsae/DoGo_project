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
  // 로그인 도중에 update가능?
  // kakao리디렉션은 잘 되는데, 로그인 후 로컬호스트 유저정보가 못불러옴
  // 따라서  insert안됨=> 유저정보가 없는거임
  // 트러블 서버내부 오류 500🔫
  //디버깅결과: signInWithOAuth =>정상실행됨 => 즉시 로그인되지않음
  // 디버깅 결과: userSession?.user => 반환되지않음 (로그인된 사용자 없음)
  //=> OAuth 로그인은 리디렉트 방식이라 signInWithOAuth() 실행 후,
  // 즉시 getUser()를 호출하면 로그인된 사용자가 없음!
  //=>즉, signInWithOAuth() 실행 후, getUser()를 호출하는 것이 아니라 OAuth 콜백을 받아야 함!

  // 올바른 실행
  // signInWithOAuth실행-> 카카오로그인창 떠야 함
  // -> OAuth콜백 받고 supabase.auth.getUser()실행되야 유저정보 가져올 수 있음
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
  // 현재 role을 찾는 API 요청
  // const { data, error } = await supabase.from('users').select('role').eq('id', userId).maybeSingle();
  const { data, error } = await supabase.from('users').select('role').eq('id', userId).single();
  if (error) {
    throw new Error(`유저 역할 가져오기 실패: ${error?.message}`);
  }

  return { data };
};
