'use server';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; 

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code'); // 카카오 인증 코드
  const next = searchParams.get('next') ?? '/'; // 리디렉션 경로 설정

  if (code) {
    const supabase = await createClient(); // 서버 클라이언트 생성
    const { error } = await supabase.auth.exchangeCodeForSession(code); // 인증 코드로 세션 교환

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // 로드 밸런서 호스트
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        // 로컬 환경일 경우 리디렉션 처리
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        // 실제 배포 환경일 경우 처리
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // 인증 실패 시 에러 페이지로 리디렉션
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
