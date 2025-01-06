'use server';

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: Request) {
  try {
    console.log('Step 1: Request received');

    const body = await request.json();
    console.log('Step 2: Parsed Body:', body);

    const { email, password, customer_name, phone } = body;

    if (!email || !password || !customer_name) {
      console.error('Validation Error: Missing required fields');
      return NextResponse.json({ error: '이메일, 비밀번호, 관리자 이름은 필수 입력 사항입니다.' }, { status: 400 });
    }

    // Step 3: 중복 이메일 체크
    console.log('Step 3: Checking for existing admin');
    const { data: existingAdmin, error: fetchError } = await supabaseAdmin
      .from('customers')
      .select('id')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Fetch Error:', fetchError.message);
      return NextResponse.json({ error: '데이터 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }

    if (existingAdmin) {
      console.error('Validation Error: Duplicate admin email');
      return NextResponse.json({ error: '이미 등록된 이메일입니다.' }, { status: 400 });
    }

    // Step 4: Auth 사용자 생성
    console.log('Step 4: Registering user in auth');
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email,
      password
    });

    if (authError) {
      console.error('Auth SignUp Error:', authError.message);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user?.id;

    if (!userId) {
      console.error('User ID is missing after auth.signUp');
      return NextResponse.json({ error: '사용자 생성에 실패했습니다.' }, { status: 400 });
    }

    // Step 5: Admins 테이블에 삽입
    console.log('Step 5: Inserting into admins table');
    const { error: insertError } = await supabaseAdmin.from('customers').insert([
      {
        id: userId, // auth.users 테이블의 id를 admins 테이블에 삽입
        customer_name,
        email,
        phone,
        role: 'customers'
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
