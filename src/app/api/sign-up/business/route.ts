'use server';

import { serverSupabase } from '@/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await serverSupabase();
    const body = await request.json();

    const { email, password, name, phone } = body;

    if (!email || !password || !name || !phone) {
      return NextResponse.json({ error: '모든 필드를 입력해야 합니다.' }, { status: 400 });
    }

    // 중복 이메일 체크
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      return NextResponse.json({ error: '데이터 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({ error: '이미 등록된 이메일입니다.' }, { status: 400 });
    }

    // 회원가입 처리
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json({ error: '사용자 생성에 실패했습니다.' }, { status: 400 });
    }

    // users 테이블에 데이터 삽입
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: userId,
        email,
        phone_number: phone,
        role: 'business',
        business_number: name
      }
    ]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    return NextResponse.json({ message: '비즈니스 회원가입 성공' }, { status: 201 });
  } catch (error: any) {
    console.error('Unhandled Server Error:', error.message);
    return NextResponse.json({ error: '서버에서 오류가 발생했습니다.' }, { status: 500 });
  }
}
