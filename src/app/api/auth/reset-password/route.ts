import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { otp, newPassword } = await request.json();

    if (!otp || !newPassword) {
      return NextResponse.json({ error: 'OTP와 새 비밀번호는 필수입니다.' }, { status: 400 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    // OTP 검증
    const { data: resetRequest, error: otpError } = await supabase
      .from('password_reset_requests')
      .select('user_id, expires_at')
      .eq('otp', otp)
      .single();

    if (otpError || !resetRequest) {
      console.error('OTP 검증 오류:', otpError);
      return NextResponse.json({ error: '유효하지 않은 OTP입니다.' }, { status: 404 });
    }

    // 비밀번호 업데이트
    const { error: updateError } = await supabase.auth.admin.updateUserById(resetRequest.user_id, {
      password: newPassword
    });

    if (updateError) {
      console.error('비밀번호 재설정 오류:', updateError);
      return NextResponse.json({ error: '비밀번호 재설정에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '비밀번호가 성공적으로 재설정되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
