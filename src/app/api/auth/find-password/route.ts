import { NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { browserSupabase } from '@/supabase/supabase-client';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: '이메일과 이름은 필수입니다.' }, { status: 400 });
    }

    const supabase = browserSupabase({ headers: request.headers, cookies });

    const { data, error } = await supabase
      .from('users')
      .select('id') 
      .eq('email', email)
      .eq('name', name)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: '입력한 정보와 일치하는 계정을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ userId: data.id }, { status: 200 });
  } catch (err) {
    console.error('비밀번호 찾기 오류:', err);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
