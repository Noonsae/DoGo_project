'use server';

import { serverSupabase } from '@/supabase/supabase-server';

export const login = async ({ email, password, role }: { email: string; password: string; role: string }) => {
  const supabase = await serverSupabase();

  // 이메일, 비밀번호, 역할을 기반으로 사용자 검증
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('role', role) // 역할 검증 추가
    .single();

  if (error || !user) {
    return { data: null, error: 'Invalid credentials or role' };
  }

  // 비밀번호 검증 (Supabase Auth 사용 시 추가 필요)
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error: signInError };
};
