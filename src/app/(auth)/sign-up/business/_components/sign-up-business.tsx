'use client';

import React, { useState } from 'react';
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
    <div className="flex justify-center items-center">
      <div className="p-[150px] bg-white  rounded-lg">
        <h1 className="text-2xl font-bold mb-4">사업자 회원가입</h1>
        <p className="mb-2">사업자 이메일</p>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="mb-2">비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <p className="mb-2">비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호 확인을 입력해주세요"
          value={confirmPassword}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        />

        <p className="mb-2">담당자 이름</p>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <p className="mb-2">담당자 번호</p>
        <input
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요"
          value={phone}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setPhone(e.target.value)}
        />

        <p className="mb-2">사업자 번호</p>
        <input
          type="text"
          placeholder="사업자 번호를 입력해주세요"
          value={businessNumber}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setBusinessNumber(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-[#7C7C7C] text-white py-2 px-4 rounded hover:bg-[#a3a3a3] transition"
        >
          완료
        </button>
        {error && <Error message={error} />}
      </div>
    </div>
  );
};

export default SignUpBusiness;
