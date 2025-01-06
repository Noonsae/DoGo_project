'use server';

import { redirect } from 'next/navigation';
import { serverSupabase } from '@/supabase/supabase-server';

export async function login(data: { email: string; password: string }) {
  const supabase = await serverSupabase();

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  });

  if (error) {
    console.error('로그인 실패:', error.message);
    redirect('/sign-in/error');
  }

  if (!signInData.user) {
    console.error('사용자 정보 없음');
    redirect('/sign-in/error');
  }

  console.log('로그인 성공:', signInData.user);

  redirect('/');
}
