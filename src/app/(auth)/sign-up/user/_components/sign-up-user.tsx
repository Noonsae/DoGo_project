import React from 'react';
import { SignUpProps } from '@/types/supabase/supabase-type';
import Error from '../error';

const SignUpUser: React.FC<SignUpProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  name,
  setName,
  error,
  handleSignup
}) => {
  return (
    <div>
      <h1>회원가입</h1>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleSignup}>회원가입</button>
      {error && <Error message={error} />}
    </div>
  );
};

export default SignUpUser;
