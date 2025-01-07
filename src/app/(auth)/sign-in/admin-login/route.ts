// 관리자 로그인
'use server';

import { NextResponse } from 'next/server';
import { serverSupabase } from '@/supabase/supabase-server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 관리자 로그인 검증 (마스터 키를 사용하는 경우)
    const MASTER_EMAIL = process.env.ADMIN_EMAIL; // 환경 변수로 관리
    const MASTER_PASSWORD = process.env.ADMIN_PASSWORD;

    if (email !== MASTER_EMAIL || password !== MASTER_PASSWORD) {
      return NextResponse.json({ success: false, message: '이메일 또는 비밀번호가 잘못되었습니다.' }, { status: 401 });
    }

    // 로그인 성공 처리
    return NextResponse.json({ success: true, message: '관리자 로그인 성공!' }, { status: 200 });
  } catch (error) {
    console.error('관리자 로그인 오류:', error);
    return NextResponse.json({ success: false, message: '서버 오류 발생' }, { status: 500 });
  }
}
