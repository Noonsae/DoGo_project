'use server';

import { NextResponse } from 'next/server';
import { serverSupabase } from '@/supabase/supabase-server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Parsed Body:', body);

    const { email, password, name, phone, role, business_number } = body;

    if (!email || !password || !name || !phone || !business_number) {
      return NextResponse.json({ success: false, message: '필수 입력값이 누락되었습니다.' }, { status: 400 });
    }

    const supabase = await serverSupabase();

    // 1. 중복 business_number 확인
    const { data: existingBusiness, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('business_number', business_number)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error('데이터 조회 중 오류가 발생했습니다.');
    }

    if (existingBusiness) {
      return NextResponse.json({ success: false, message: '이미 존재하는 사업자 번호입니다.' }, { status: 400 });
    }

    // 2. Auth 사용자 생성
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role, user_name: name, phone_number: phone } }
    });

    if (authError) {
      console.error('Auth Error:', authError.message);
      return NextResponse.json({ success: false, message: authError.message }, { status: 400 });
    }

    const { user } = authData;

    if (!user?.id) {
      throw new Error('유저 ID 생성 실패');
    }

    // 3. Users 테이블에 데이터 삽입
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: user.id,
        email,
        phone_number: phone,
        role,
        user_name: name,
        business_number,
        user_info: role === 'customer' ? 'Default Info' : null
      }
    ]);

    if (insertError) {
      return NextResponse.json({ success: false, message: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: '회원가입 성공!' }, { status: 201 });
  } catch (error: any) {
    console.error('Unhandled Error:', error.message);
    return NextResponse.json({ success: false, message: '서버 에러 발생' }, { status: 500 });
  }
}
