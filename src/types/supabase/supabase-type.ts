// 수파베이스 파입 정리 파일입니다.
// 테이블 마다 만들어주세요.


export interface UserMetadata {
  email: string;
  role: string;
}

export interface SupabaseUser {
  id: string;
  email: string;
  created_at: string;
  app_metadata: UserMetadata;
}

export interface SignUpProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  name: string; // 일반화된 필드
  setName: React.Dispatch<React.SetStateAction<string>>;
  // admin_name: string;
  // setAdminName: React.Dispatch<React.SetStateAction<string>>;
  // setCustomer_name: React.Dispatch<React.SetStateAction<string>>;
  // customer_name: string;
  error: string;
  handleSignup: () => void;
}

