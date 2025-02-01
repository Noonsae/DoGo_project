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
  console.log('✅ Supabase 인스턴스 생성됨:', supabaseAdmin);

  try {
    //커밋을 위한 주석
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

    // 🔹 회원가입 성공 후 생성된 `userId`
    const userId = authData.user?.id;
    if (!userId) {
      throw new Error('사용자 생성에 실패했습니다.');
    }

    // 🔹 users 테이블에 이미 존재하는지 확인
    const { data: existingUser } = await supabaseAdmin.from('users').select('id').eq('id', userId).single();

    if (!existingUser) {
      // 🔹 존재하지 않으면 `users` 테이블에 INSERT
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
        console.error('🚨 사용자 데이터 삽입 실패:', insertError);
        throw new Error(insertError.message);
      }
    } else {
      console.log('✅ 이미 존재하는 사용자, INSERT 스킵');
    }

    return { success: true, message: `${name} 회원가입 성공` };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
