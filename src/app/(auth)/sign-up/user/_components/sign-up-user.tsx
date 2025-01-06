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
  name,
  setName,
  error,
  handleSignup
}) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const validatePassword = (value: string) => {
    if (value.length < 6 || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
      setPasswordError('비밀번호는 6자 이상이어야 하며, 영문 소문자와 숫자가 포함되어야 합니다.');
    } else {
      setPasswordError('');
    }
    setPassword(value);
  };
  const checkNickname = async (value: string) => {
    setName(value);
    if (value) {
      const response = await fetch(`/api/check-nickname?nickname=${value}`);
      const result = await response.json();

      if (result.exists) {
        setNicknameError('이미 존재하는 닉네임입니다.');
      } else {
        setNicknameError('');
      }
    } else {
      setNicknameError('');
    }
  };
  return (
    <div>
      <h3>일반 회원 회원가입</h3>
      <p>이메일</p>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>비밀번호</p>
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => validatePassword(e.target.value)}
      />
      <p>비밀번호 확인</p>
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => validatePassword(e.target.value)}
      />
      <p>휴대폰 번호</p>
      <input type="tel" placeholder="휴대폰 번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <p>이름</p>
      <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
      {/* 닉네임 추가해야됨 */}
      <button onClick={handleSignup}>완료</button>
      {error && <Error message={error} />}
    </div>
  );
};

export default SignUpUser;
