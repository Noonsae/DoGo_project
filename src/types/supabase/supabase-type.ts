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
