'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handleSignupAction({
  email,
  password,
  name,
  phone,
  business_number,
  role
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
  business_number?: string;
  role: 'admin' | 'business' | 'user';
}) {
  try {
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error('데이터 조회 중 오류가 발생했습니다.');
    }

    if (existingUser) {
      throw new Error('이미 등록된 이메일입니다.');
    }

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
      business_number: role === 'business' ? business_number : null,
      nickname: role === 'user' ? name : null
    };

    const { error: insertError } = await supabaseAdmin.from('users').insert([insertData]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { success: true, message: `${role} 회원가입 성공` };
  } catch (error: any) {
    console.error('Signup Error:', error.message);
    return { success: false, message: error.message };
  }
}
