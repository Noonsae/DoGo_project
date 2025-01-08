// 'use client';
// import { useEffect } from 'react';

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
