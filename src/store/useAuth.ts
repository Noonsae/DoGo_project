// zustand 로그인 상태 관리 로직 파일입니다.
//추가설명 달아놓음
import { create } from 'zustand';

interface AuthState {
  user: object | null; // 유저 정보 (로그인된 상태일 경우)
  setUser: (user: object | null) => void; // 유저 정보 업데이트 함수
  loadUserFromLocalStorage: () => void; // 로컬스토리지에서 유저 정보 로드
  clearUser: () => void; // 로그아웃 시 유저 정보 초기화
}

// Zustand store 생성
const useAuthStore = create<AuthState>((set) => ({
  user: null, // 초기 상태는 null
  setUser: (user) => {
    // Zustand 상태 업데이트 및 로컬스토리지 동기화
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
  loadUserFromLocalStorage: () => {
    // 로컬스토리지에서 유저 정보를 가져와 상태에 저장
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },
  clearUser: () => {
    // 유저 정보를 초기화하고 로컬스토리지에서 제거
    set({ user: null });
    localStorage.removeItem('user');
  }
}));

export default useAuthStore;
