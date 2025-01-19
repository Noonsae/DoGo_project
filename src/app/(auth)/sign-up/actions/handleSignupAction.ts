'use server';

import { createClient } from '@supabase/supabase-js';
import { serverSupabase } from '@/supabase/supabase-server';

export default async function handleSignupAction({
  email,
  password,
  name,
  phone,
  business_number,
  nickname,
  role
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
  business_number?: string; // 사업자 번호는 선택적
  nickname: string;
  role: 'admin' | 'business' | 'user';
}) {
  // const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const supabaseAdmin = await serverSupabase();

  // single =>단일 데이터, 데이터가 없거나 여러 개일 경우 에러를 반환
  // maybeSingle =>단일 데이터를 가져오지만, 데이터가 없더라도 에러를 발생 X
  //eq()=> 배열형태,여러 개의 데이터 또는 데이터가 없더라도 에러가 발생 X
  try {
    console.log('Step 1: Checking for existing user');
    const { data: existingUser, error: fetchError } = await supabaseAdmin.from('users').select('id').eq('email', email);

    console.log('existingUser:', existingUser);
    console.log('fetchError:', fetchError);

    if (fetchError) {
      throw new Error('데이터 조회 중 오류가 발생했습니다.');
    }
    if (existingUser.length > 0) {
      throw new Error('이미 등록된 이메일입니다.');
    }
    console.log('Step 2: Creating user in Auth');
    console.log({ email, password });
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

    console.log('Step 3: Inserting into users table');
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

    console.log('Step 4: Successfully inserted data');
    return { success: true, message: `${name} 회원가입 성공` };
  } catch (error: any) {
    console.error('Signup Error:', error.message);
    return { success: false, message: error.message };
  }
}
