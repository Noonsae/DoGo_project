'use server';

import { serverSupabase } from '@/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await serverSupabase();
  const body = await request.json();

  const { email, password, phone, user_name } = body;

  if (!email || !password || !phone || !user_name) {
    return NextResponse.json({ error: '모든 필드를 입력해야 합니다.' }, { status: 400 });
  }

  // 중복 이메일 체크
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return NextResponse.json({ error: '이미 등록된 이메일입니다.' }, { status: 400 });
  }

  // 회원가입 처리
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  const userId = authData.user?.id;

  // users 테이블에 데이터 삽입
  const { error: insertError } = await supabase.from('users').insert([
    {
      id: userId,
      email,
      phone_number: phone,
      role: 'customer',
      user_name
    }
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 });
  }

  return NextResponse.json({ message: '회원가입 성공' }, { status: 201 });
}
