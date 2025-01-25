'use server';

import { serverSupabase } from '@/supabase/supabase-server';

export default async function handleSignupAction({
  email,
  password,
  name,
  phone,
  businessNumber,
  nickname,
  role
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
  businessNumber?: string;
  nickname?: string;
  role: string;
}) {
  const supabaseAdmin = await serverSupabase();

  try {
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email,
      password
    });

    if (authError) {
      throw new Error(authError.message);
    }

    const userId = authData.user?.id;
    if (!userId) {
      throw new Error('사용자 생성에 실패했습니다.');
    }

    const insertData = {
      id: userId,
      email,
      phone_number: phone,
      role,
      user_name: name,
      business_number: role === 'business' ? businessNumber : null,
      nickname: role === 'user' ? name : null
    };

    const { error: insertError } = await supabaseAdmin.from('users').insert([insertData]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { success: true, message: `${name} 회원가입 성공` };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
