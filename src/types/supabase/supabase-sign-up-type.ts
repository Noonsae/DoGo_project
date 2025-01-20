export interface SignUpProps {
  email?: string;

  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password?: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  phone?: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  name?: string; // 일반화된 필드
  setName: React.Dispatch<React.SetStateAction<string>>;
  nickname?: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  // admin_name: string;
  // setAdminName: React.Dispatch<React.SetStateAction<string>>;
  // setCustomer_name: React.Dispatch<React.SetStateAction<string>>;
  // customer_name: string;
  businessNumber?: string; // 사업자 번호 추가 (optional)
  setBusinessNumber: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleSignup: () => void;
}
// // 옵셔널
// export interface HandleSignupParams {
//   email: string;
//   password: string;
//   name: string;
//   phone: string;
//   business_number: string;
//   role: string;
// }
