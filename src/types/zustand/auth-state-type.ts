// 로그인 상태 타입 지정 파일입니다.

// export type AuthState = {
//   isAuthenticated: boolean;
//   user: { id: string; email: string } | null;
//   setAuth: (auth: { isAuthenticated: boolean; user: { id: string; email: string } | null }) => void;
// };

export interface AuthStateFace {
  user: object | null;
  signInUser: (user: object) => void;
  signOutUser: (user: null) => void;
  loadUserFromCookie: () => void;
}
