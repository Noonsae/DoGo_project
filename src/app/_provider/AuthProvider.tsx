'use client';

import { useEffect, ReactElement } from 'react';

import { browserSupabase } from '@/supabase/supabase-client';

import useAuthStore from '@/store/useAuth';

export default function AuthProvider({ children }: { children: ReactElement }) {

  const { setAuth } = useAuthStore();
  const supabase = browserSupabase();

  // 새로고침
  useEffect(() => {
    // 로그인, 로그아웃 등 변경사항이 있을 때
    // supabase에서 계속 zustand에 유저 정보를 넣어주는 코드를 작성할 것
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      // nickname -> users 테이블에서 가져온다. -> 로직 수정 필요할 수도??
      // -> await supabase.from("users").select()
      if (session) {
        setAuth(session.user);
      } else {
        setAuth(null);
      }
    }); 

    // // 컴포넌트가 unmount 될 때, 실행되는 cleanup 함수
    return () => {
      // onAuthStateChange 등록된 놈을 삭제한다.
      data.subscription.unsubscribe();
    };
  }, []);
  return <>{children}</>;
}
