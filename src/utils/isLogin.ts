// 로그인 상태를 확인하는 함수입니다.

import { create } from 'zustand';
import { AuthState } from '@/types/zustand/auth-state-type';

export const useAuthState = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (auth) => set(auth)
}));

export const isLogins = () => {
  const { isAuthenticated } = useAuthState.getState();
  return isAuthenticated;
};
