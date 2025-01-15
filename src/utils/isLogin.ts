// // 로그인 상태를 관리하는 Zustand Store입니다.
// import { create } from 'zustand';
// import { AuthState } from '@/types/zustand/auth-state-type';

// export const useAuthState = create<AuthState>((set) => ({
//   isAuthenticated: false, // 초기 상태는 비로그인
//   user: null, // 초기 유저 정보는 null
//   setAuth: (auth) =>
//     set(() => {
//       const { isAuthenticated, user } = auth;
//       if (isAuthenticated) {
//         // 로그인 상태 설정 및 로컬스토리지 저장
//         localStorage.setItem('user', JSON.stringify(user));
//       } else {
//         // 로그아웃 처리 및 로컬스토리지 초기화
//         localStorage.removeItem('user');
//       }
//       return { isAuthenticated, user };
//     })
// }));

// // 로그인 상태 확인 함수 isLoggedIn 바꾸기 잊지말기기⭐
// export const isLogined = (): boolean => {
//   const { isAuthenticated } = useAuthState.getState();
//   return isAuthenticated;
// };

// // 로컬스토리지에서 유저 정보 확인
// export const checkLoginStatus = () => {
//   const storedUser = localStorage.getItem('user');
//   return storedUser ? JSON.parse(storedUser) : null;
// };

// // 토큰 가져오기
// export const getAuthToken = () => {
//   const storedUser = checkLoginStatus();
//   return storedUser?.token || null;
// };
