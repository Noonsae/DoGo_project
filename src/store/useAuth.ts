// zustand 로그인 상태 관리 로직 파일입니다.

import { create } from 'zustand';

interface AuthState {
  user: object | null;
  setUser: (user: object | null) => void;
}
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));

export default useAuthStore;
