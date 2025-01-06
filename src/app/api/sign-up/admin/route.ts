'use server';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Supabase 서비스 역할 키를 사용하여 클라이언트 초기화
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: Request) {
  try {
    console.log('Step 1: Request received');

    const body = await request.json();
    console.log('Step 2: Parsed Body:', body);

    const { email, password, admin_name, phone } = body;

    if (!email || !password || !admin_name) {
      console.error('Validation Error: Missing required fields');
      return NextResponse.json({ error: '이메일, 비밀번호, 관리자 이름은 필수 입력 사항입니다.' }, { status: 400 });
    }

    console.log('Step 3: Registering user in auth');
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email,
      password
    });

    if (authError) {
      console.error('Auth SignUp Error:', authError.message);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user?.id;
    console.log('Step 4: User ID from auth:', userId);

    if (!userId) {
      console.error('User ID is missing after auth.signUp');
      return NextResponse.json({ error: '사용자 생성에 실패했습니다.' }, { status: 400 });
    }

    console.log('Step 5: Inserting into admins table');
    const { error: insertError } = await supabaseAdmin.from('admins').insert([
      {
        id: userId, // auth.users 테이블의 id를 admins 테이블에 삽입
        admin_name,
        email,
        phone,
        role: 'admin'
      }
    ]);

    if (insertError) {
      console.error('Admins Insert Error:', insertError.message);
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    console.log('Admins Data Inserted Successfully');
    return NextResponse.json({ message: '회원가입 성공' }, { status: 201 });
  } catch (error: any) {
    console.error('Unhandled Server Error:', error.message, error.stack);
    return NextResponse.json({ error: '서버에서 오류 발생' }, { status: 500 });
  }
}
