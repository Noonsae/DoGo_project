//서버액션 회원가입 재사용 코드입니다.
'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handleSignupAction({
  email,
  password,
  name,
  phone,
  role
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'admin' | 'business' | 'user';
}) {
  try {
    // Auth 사용자 생성
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

    // 역할별 테이블 이름과 데이터 구성
    const tableName = role === 'admin' ? 'admins' : role === 'business' ? 'businesses' : 'users';
    const insertData = {
      id: userId,
      email,
      phone,
      role,
      ...(role === 'admin' && { admin_name: name }),
      ...(role === 'business' && { business_name: name }),
      ...(role === 'user' && { user_name: name })
    };

    // 역할별 테이블에 데이터 삽입
    const { error: insertError } = await supabaseAdmin.from(tableName).insert([insertData]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { message: `${role} 회원가입 성공`, userId };
  } catch (error: any) {
    console.error('Signup Error:', error.message);
    throw new Error(error.message);
  }
}
