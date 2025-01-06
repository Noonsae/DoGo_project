import { SignUpProps } from '@/types/supabase/supabase-type';
import React from 'react';
import Error from '../error';

const SignUpAdmin: React.FC<SignUpProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  admin_name,
  setAdminName,
  error,
  handleSignup
}) => {
  return (
    <div>
      <h1>관리자 회원가입</h1>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="이름" value={admin_name} onChange={(e) => setAdminName(e.target.value)} />
      <input type="text" placeholder="휴대폰번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleSignup}>회원가입!</button>
      {error && <Error message={error} />}
    </div>
  );
};

export default SignUpAdmin;
