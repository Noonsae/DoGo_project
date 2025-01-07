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
    <div className="flex justify-center items-center">
      <div className="p-[150px] bg-white  rounded-lg">
        <h1 className="text-2xl font-bold mb-4">일반회원 회원가입</h1>

        <p className="mb-2">이메일</p>
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <p className="mb-2">비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <p className="mb-2">비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <p className="mb-2">휴대폰 번호</p>
        <input
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <p className="mb-2">이름</p>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <p className="mb-2">닉네임</p>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
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

export default SignUpUser;
