import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { otp, newPassword, role } = await request.json();

    if (!otp || !newPassword || !role) {
      return NextResponse.json({ error: 'OTP와 새 비밀번호는 필수입니다.' }, { status: 400 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    const { data: resetRequest, error: otpError } = await supabase
      .from('password_reset_requests')
      .select('user_id, expires_at')
      .eq('otp', otp)
      .single();

    if (otpError || !resetRequest) {
      return NextResponse.json({ error: '유효하지 않은 OTP입니다.' }, { status: 404 });
    }
    // 이용중인 이메일로만 회원가입을 하게 만들면
    // 이메일인증도 가능해지고 비밀번호 찾기도 가능해지고
    // 그러나 인증횟수 제한이 있음=> 배포하기 전에 하기. 지금은 admin
    // 서비스롤키 조치를 해야됨
    // 비밀번호 업데이트
    const { error: updateError } = await supabase.auth.admin.updateUserById(resetRequest.user_id, {
      password: newPassword
    });
    if (updateError) {
      return NextResponse.json({ error: '비밀번호 재설정에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '비밀번호가 성공적으로 재설정되었습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
