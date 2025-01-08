import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import Error from '../error';
import { useRouter } from 'next/navigation';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

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

  const handelSignIn = () => {
    router.push('/sign-in');
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
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-2 text-gray-600"
          >
            {showPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
          </button>
        </div>
        <p className="mb-2">비밀번호 확인</p>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호를 다시 입력해주세요"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-2 top-2 text-gray-600"
          >
            {showConfirmPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
          </button>
        </div>
        {error && <Error message={error} />}
        <p className="mb-2">휴대폰 번호</p>
        <div>
          <input
            type="tel"
            placeholder="휴대폰 번호를 입력해주세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
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
        <span className="text-gray-500">이미 계정이 있으신가요?</span>
        <button onClick={handelSignIn}>로그인</button>
      </div>
    </div>
  );
};

export default SignUpUser;
