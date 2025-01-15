import { browserSupabase } from '@/supabase/supabase-client';
import { create } from 'zustand';

interface AuthState {
  user: object | null;
  setUser: (user: object | null) => void;
  loadUserFromCookie: () => void;
  clearUser: () => void;
}

// Zustand store 생성
const useAuthStore = create<AuthState>((set) => ({
  user: null,

  // 유저 정보 설정 및 쿠키 동기화
  setUser: (user) => {
    set({ user });

    if (user) {
      try {
        document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; SameSite=Lax`;
        console.log('user 쿠키 설정 완료:', document.cookie);
      } catch (error) {
        console.error('쿠키 설정 실패:', error);
      }
    } else {
      document.cookie = 'user=; Max-Age=0; path=/;';
      console.log('user 쿠키 삭제 완료');
    }
  },

  // 쿠키에서 유저 정보 로드
  loadUserFromCookie: async () => {
    const supabase = browserSupabase();
    const { data, error } = await supabase.auth.getSession();

    if (data?.session?.user) {
      console.log('세션에서 사용자 정보 로드 성공:', data.session.user);
      set({ user: data.session.user });
    } else {
      console.error('세션에서 사용자 정보 로드 실패:', error);
      set({ user: null });
    }
  },

  // 유저 정보 초기화 및 쿠키 제거
  clearUser: () => {
    set({ user: null });
    document.cookie = 'user=; Max-Age=0; path=/;';
  }
}));

export default useAuthStore;
