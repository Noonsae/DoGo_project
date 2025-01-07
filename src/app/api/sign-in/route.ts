'use server';

import { redirect } from 'next/navigation';
import { serverSupabase } from '@/supabase/supabase-server';

export async function login(data: { email: string; password: string }) {
  const supabase = await serverSupabase();

  console.log('Supabase 클라이언트 초기화 확인:', supabase); // 디버깅 추가
  console.log('로그인 요청 데이터:', data); // 요청 데이터 확인

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  });

  console.log('signInWithPassword Data:', signInData); // 성공 시 사용자 데이터
  console.log('signInWithPassword Error:', error); // 실패 시 에러 메시지

  if (error) {
    console.error('로그인 실패:', error.message);
    redirect('/sign-in/error');
  }

  if (!signInData?.user) {
    console.error('사용자 정보 없음');
    redirect('/sign-in/error');
  }

  console.log('로그인 성공:', signInData.user);
  redirect('/');
}
