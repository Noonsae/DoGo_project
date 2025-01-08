// Zustand 로그인 상태 관리 로직 파일입니다.
import { create } from 'zustand';

// interface AuthState {
//   user: object | null;
//   setUser: (user: object | null) => void;
//   loadUserFromCookie: () => void;
//   clearUser: () => void;
// }

// Zustand store 생성
const useAuthStore = create<AuthState>((set) => ({
  user: null,

  // 유저 정보 설정 및 쿠키 동기화
  setUser: (user) => {
    set({ user });

    if (user) {
      document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/;`;
    } else {
      document.cookie = 'user=; Max-Age=0; path=/;';
    }
  },

  // 쿠키에서 유저 정보 로드
  loadUserFromCookie: () => {
    const cookies = document.cookie.split('; ');
    const userCookie = cookies.find((cookie) => cookie.startsWith('user='));

    if (userCookie) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        set({ user: parsedUser });
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
        set({ user: null });
      }
    } else {
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
