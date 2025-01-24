import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { email, phone, role } = await request.json();

    if (!email || !phone || !role) {
      return NextResponse.json({ error: '이메일과 휴대폰 번호는 필수입니다.' }, { status: 400 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .eq('phone_number', phone)
      .eq('role', role)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: '입력한 정보와 일치하는 계정을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ userId: data.id }, { status: 200 });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
