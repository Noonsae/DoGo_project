// 로그인 상태 타입 지정 파일입니다.

// export type AuthState = {
//   isAuthenticated: boolean;
//   user: { id: string; email: string } | null;
//   setAuth: (auth: { isAuthenticated: boolean; user: { id: string; email: string } | null }) => void;
// };
import { User } from '@supabase/supabase-js';

export interface AuthStateFace {
  user: object | null;
  // setUser: (user: object) => void;
  // TODO: 필요에 맞게 수정 필요
  // id, email, nickname 등 필요한 애들만 넣는 걸로 변경하면 더 좋다.
  setAuth: (user: User | null) => void;
  // signInUser: (user: object) => void;
  // signOutUser: (user: null) => void;
  // loadUserFromCookie: () => void;
}
