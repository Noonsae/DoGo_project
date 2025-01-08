'use server';

import { NextResponse } from 'next/server';
import { serverSupabase } from '@/supabase/supabase-server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json(); // 클라이언트에서 전달한 데이터 파싱
    const supabase = await serverSupabase();

    console.log('로그인 요청 데이터:', { email, password });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('로그인 실패:', error.message);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.log('유저 데이터 조회 성공:', data.user);

    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (err: any) {
    console.error('서버 오류:', err.message);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
