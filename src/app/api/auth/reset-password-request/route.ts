// OTP 생성 라우트입니다. => 비밀번호 재설정 시 OTP 반환하고 사용자는 입력해야 합니다.
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, phone, role } = await request.json();

    if (!email || !phone || !role) {
      return NextResponse.json({ error: '사용자 이름과 전화번호는 필수입니다.' }, { status: 400 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const sanitizedPhone = phone.replace(/-/g, '');

    const { data: user, error } = await supabase
      .from('users')
      .select('id, user_name, phone_number')
      .eq('email', email)
      .eq('role', role)
      .or(`phone_number.eq.${sanitizedPhone}, phone_number.ilike.%${phone}%`)
      .single();

    console.log('🔍 DB에 저장된 데이터:', user, error);
    console.log('🔍 입력된 값:', { email, sanitizedPhone, role });

    if (error || !user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    // OTP 생성 및 만료 시간 설정
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // OTP를 password_reset_requests 테이블에 저장
    const { error: insertError } = await supabase.from('password_reset_requests').insert({
      user_id: user.id,
      otp: otp,
      expires_at: expiresAt
    });

    if (insertError) {
      return NextResponse.json({ error: 'OTP 저장에 실패했습니다.' }, { status: 500 });
    }
    // api호출url을 잘못 설정해줘놓고 안되네~이러고있었음
    // 아래 코드는 클라이언트로 보내주는 건데 안넣어줘놓고 안되네~이러고있었음
    return NextResponse.json(
      { otp, user_name: user.user_name, message: 'OTP가 성공적으로 생성되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
