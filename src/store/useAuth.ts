import { browserSupabase } from '@/supabase/supabase-client';
import { AuthStateFace } from '@/types/zustand/auth-state-type';
import { create } from 'zustand';

// Zustand store 생성
const useAuthStore = create<AuthStateFace>((set) => ({
  user: null,
  // setUser: (user) => set({ user }),
  // TODO: setAuth
  setAuth: (user) => set({ user })

  // // 쿠키에서 유저 정보 로드
  // loadUserFromCookie: async () => {
  //   const supabase = browserSupabase();
  //   const { data, error } = await supabase.auth.getSession();

  //   if (data?.session?.user) {
  //     // console.log('세션에서 사용자 정보 로드 성공:', data.session.user);
  //     set({ user: data.session.user });
  //   } else {
  //     console.error('세션에서 사용자 정보 로드 실패:', error);
  //     set({ user: null });
  //   }
  // },

  // // 유저 정보 설정 및 쿠키 동기화
  // signInUser: (user) => {
  //   set({ user });
  //   // supabase는 내장된 인증시스템을 제공하여 로그인, 세션유지, 로그아웃 등
  //   // 작업을 자동으로 쳐리함
  //   // 이미 쿠키 또는 로컬스토리지를 사용해 사용자의 세션을 관리하고 인증상태를 유지함
  //   // 따라서 아래 코드는 없앰
  // },

  // // 유저 정보 초기화 및 쿠키 제거
  // signOutUser: async () => {
  //   const supabase = browserSupabase();
  //   const { error } = await supabase.auth.signOut(); // Supabase 세션 무효화
  //   if (error) {
  //     console.error('로그아웃 실패!', error);
  //   } else {
  //     set({ user: null });

  //     // 카카오 로그아웃 URL 호출
  //     const KAKAO_LOGOUT_URL = 'https://kauth.kakao.com/oauth/logout';
  //     const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 REST API 키
  //     const REDIRECT_URI = 'http://localhost:3000'; // 로그아웃 후 리디렉션 URL
  //     window.location.href = `${KAKAO_LOGOUT_URL}?client_id=${CLIENT_ID}&logout_redirect_uri=${REDIRECT_URI}`;
  //   }
  // }
}));

export default useAuthStore;
