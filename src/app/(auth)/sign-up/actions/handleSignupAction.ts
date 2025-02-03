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
    const { data: existingEmail } = await supabaseAdmin.from('users').select('id').eq('email', email).single();

    if (existingEmail) {
      return { success: false, message: '이미 사용 중인 이메일입니다.' };
    }

    const { data: existingPhone } = await supabaseAdmin.from('users').select('id').eq('phone_number', phone).single();

    if (existingPhone) {
      return { success: false, message: '이미 등록된 휴대폰 번호입니다.' };
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role,
          phone_number: phone,
          user_name: name,
          business_number: role === 'business' ? businessNumber : null,
          nickname: role === 'user' ? name : null
        }
      }
    });

    if (authError) {
      throw new Error(authError.message);
    }

    const userId = authData.user?.id;
    if (!userId) {
      throw new Error('사용자 생성에 실패했습니다.');
    }

    const { data: existingUser } = await supabaseAdmin.from('users').select('id').eq('id', userId).single();

    if (!existingUser) {
      const insertData = {
        id: userId,
        email,
        phone_number: phone || '',
        role,
        user_name: name || '',
        business_number: role === 'business' ? businessNumber || null : null,
        nickname: role === 'user' ? name || '' : null
      };

      const { error: insertError } = await supabaseAdmin.from('users').insert([insertData]);

      if (insertError) {
        throw new Error(insertError.message);
      }
    }

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        phone_number: phone || '',
        user_name: name || ''
      })
      .eq('id', userId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return { success: true, message: `${name} 회원가입 성공` };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
