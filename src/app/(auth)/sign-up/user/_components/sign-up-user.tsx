import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-type';
import Error from '../error';

const SignUpUser: React.FC<SignUpProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  nickname,
  setNickname,
  name,
  setName,
  error,
  setError,
  handleSignup
}) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (password && value !== password) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };
  return (
    <div>
      <h1>일반회원 회원가입</h1>
      <p>이메일</p>
      <input
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p>비밀번호</p>
      <input
        type="password"
        placeholder="비밀번호을 입력해주세요"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      <p>비밀번호 확인</p>
      <input
        type="password"
        placeholder="비밀번호을 입력해주세요"
        value={confirmPassword}
        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
      />
      <p>휴대폰 번호</p>
      <input
        type="tel"
        placeholder="휴대폰 번호을 입력해주세요"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <p>이름</p>
      <input type="text" placeholder="이름을 입력해주세요" value={name} onChange={(e) => setName(e.target.value)} />
      <p>닉네임</p>
      <input
        type="text"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <button onClick={handleSignup}>완료</button>
      {error && <Error message={error} />}
    </div>
  );
};

export default SignUpUser;
