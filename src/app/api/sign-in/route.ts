'use server';

import { redirect } from 'next/navigation';
import { serverSupabase } from '@/supabase/supabase-server';
// import { useEffect } from 'react';
// import { NextResponse } from 'next/server';
import useAuthStore from '@/store/useAuth';

export async function login(data: { email: string; password: string }) {
  const supabase = await serverSupabase();

  console.log('Supabase 클라이언트 초기화 확인:', supabase); // 디버깅 추가
  console.log('로그인 요청 데이터:', data); // 요청 데이터 확인

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  });

  console.log('signInWithPassword Data:', signInData); // 성공 시 사용자 데이터
  console.log('signInWithPassword Error:', error); // 실패 시 에러 메시지

  if (error) {
    console.error('로그인 실패:', error.message);
    redirect('/sign-in/error');
  }

  if (!signInData?.user) {
    console.error('사용자 정보 없음');
    redirect('/sign-in/error');
  }

  console.log('로그인 성공:', signInData.user);

  // 로그인 성공 시 사용자 데이터를 반환
  return { user: signInData.user };
}

// export default function KakaoAuthPage() {
//   const handleLoginSuccess = (userData) => {
//     useAuthStore.getState().setUser(userData);
//   };

//   useEffect(() => {
//     const code = new URL(window.location.href).searchParams.get('code');
//     console.log('Authorization code:', code);
//     if (code) {
//       fetch(`/api/auth/kakao?code=${code}`)
//         .then((res) => res.json())
//         .then((userData) => {
//           console.log('User data:', userData); // 디버깅용
//           handleLoginSuccess(userData); // 상태 저장
//         })
//         .catch((err) => {
//           console.error('Error fetching user data:', err);
//         });
//     }
//   }, []);

//   return <div>로그인 처리 중...</div>;
// }
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const code = searchParams.get('code');
//   if (!code) {
//     return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
//   }
//   // 카카오 API와 통신 로직 추가
// }
