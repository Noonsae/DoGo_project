import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { browserSupabase } from '@/supabase/supabase-client';

export async function POST(request: Request) {
  try {
    const { name, phone, role } = await request.json();

    if (!name || !phone || !role) {
      return NextResponse.json({ error: '이름과 휴대폰 번호는 필수입니다.' }, { status: 400 });
    }

    const supabase = browserSupabase({ headers: request.headers, cookies });

    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('user_name', name)
      .eq('phone_number', phone)
      .eq('role', role)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: '입력한 정보와 일치하는 이메일을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ email: data.email }, { status: 200 });
  } catch (err) {
    console.error('아이디 찾기 오류:', err);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
