import { AuthStateFace } from '@/types/zustand/auth-state-type';
import { create } from 'zustand';

// Zustand store 생성

const useAuthStore = create<AuthStateFace>((set) => ({
  user: null,
  setAuth: (user) => set({ user })
}));

export default useAuthStore;
