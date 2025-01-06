import React from 'react';
import { SignUpProps } from '@/types/supabase/supabase-type';
import Error from '../error';

const SignUpBusiness: React.FC<SignUpProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  name,
  setName,
  businessNumber,
  setBusinessNumber,
  error,
  handleSignup
}) => {
  return (
    <div>
      <h1>사업자 회원가입</h1>
      <p>사업자 이메일</p>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />

      <p>비밀번호</p>
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />

      <p>담당자 이름</p>
      <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />

      <p>담당자 번호</p>
      <input type="tel" placeholder="휴대폰 번호" value={phone} onChange={(e) => setPhone(e.target.value)} />

      <p>사업자 번호</p>
      <input
        type="text"
        placeholder="사업자 번호"
        value={businessNumber}
        onChange={(e) => setBusinessNumber(e.target.value)}
      />

      <button onClick={handleSignup}>완료</button>
      {error && <Error message={error} />}
    </div>
  );
};

export default SignUpBusiness;
