// }
import { serverSupabase } from '@/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    console.error('❌ Supabase에서 인증 코드를 받지 못함! Redirect URLs 설정 확인 필요');
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await serverSupabase();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // 로그인된 유저 정보 가져오기
  const { data: userSession, error: sessionError } = await supabase.auth.getUser();

  if (sessionError || !userSession?.user) {
    console.error('OAuth 로그인 후 유저 정보를 가져올 수 없습니다.');
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const { id, email, user_metadata } = userSession.user;

  // users 테이블 중복 체크 후 insert
  const { data: existingUser } = await supabase.from('users').select('id').eq('id', id).single();

  if (!existingUser) {
    await supabase.from('users').insert([
      {
        id: String(id),
        email: email ?? '',
        user_name: user_metadata?.user_name || user_metadata?.name || '익명 사용자'
      }
    ] as unknown as any);
  }

  // role이 없으면 업데이트 (기본값: user)
  if (!existingUser || !('role' in existingUser)) {
    const { error: updateError } = await supabase.auth.updateUser({
      data: { role: 'user' }
    });

    if (updateError) console.error('사용자 역할 업데이트 실패:', updateError.message);
  }

  return NextResponse.redirect(`${origin}/`);
}
