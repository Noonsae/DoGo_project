'use server';

import { serverSupabase } from '@/supabase/supabase-server';

export async function logout() {
  const supabase = await serverSupabase();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('로그아웃 실패:', error.message);
    throw new Error('로그아웃에 실패했습니다.');
  }

  return { success: true };
}

// 헤더에 넣어야 해서 아직 수정중
