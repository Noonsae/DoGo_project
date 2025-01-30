'use server';

import { serverSupabase } from '@/supabase/supabase-server';

export const updateKaKao = async (userId: string, phoneNumber: string) => {
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
