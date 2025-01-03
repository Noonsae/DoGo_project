'use server';
// 로그인 페이지 라우트 핸들러

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { serverSupabase } from '@/supabase/supabase-server';

export async function login(formData: FormData) {
  const supabase = await serverSupabase();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

