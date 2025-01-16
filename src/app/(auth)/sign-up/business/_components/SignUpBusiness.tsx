'use client';

import React, { useState } from 'react';
<<<<<<< HEAD
import { SignUpProps } from '@/types/supabase/supabase-type';
import Error from '../error';
=======
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import Error from '../error';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useRouter } from 'next/navigation';
//서버사이드에서 사용자 역할에 따라 라우팅 되게 하려고 했던 방식을
// 클라이언트 사이드에서 동적 시그먼트를 생성하여 라우팅되게 바꾸신 것 같습니다 -민석님
>>>>>>> dev

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
<<<<<<< HEAD
=======
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
>>>>>>> dev

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

<<<<<<< HEAD
  return (
    <div className="flex justify-center items-center">
      <div className="p-[150px] bg-white  rounded-lg">
        <h1 className="text-2xl font-bold mb-4">사업자 회원가입</h1>
        <p className="mb-2">사업자 이메일</p>
=======
  const handelSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="p-12 w-[500px]">
        <h1 className="text-4xl font-bold mb-8 text-center mt-[65px]">DoGo</h1>
        <h6 className="text-[18px] font-bold mb-8 ">사업자 회원 회원가입</h6>
        <p className="mb-1 font-semibold text-gray-700">사업자 이메일</p>
>>>>>>> dev
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
<<<<<<< HEAD
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
=======
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="mb-2 font-semibold text-gray-700">비밀번호</p>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-600 hover:text-black"
          >
            {showPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
          </button>
        </div>
        <p className="mb-2 font-semibold text-gray-700">비밀번호 확인</p>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호를 다시 입력해주세요"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className={`w-full p-3 border rounded-md pr-12 mb-4 ${
              password && confirmPassword && password !== confirmPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-[#B3916A]'
            } focus:outline-none focus:ring-2`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-600 hover:text-black"
          >
            {showConfirmPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
          </button>
        </div>
        {error && <Error message={error} />}
        <p className="mb-2 font-semibold text-gray-700">담당자 이름</p>
>>>>>>> dev
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
<<<<<<< HEAD
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
        />

=======
          className="w-full p-3 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
          onChange={(e) => setName(e.target.value)}
        />
>>>>>>> dev
        <p className="mb-2">담당자 번호</p>
        <input
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요"
          value={phone}
<<<<<<< HEAD
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e) => setPhone(e.target.value)}
        />

=======
          className="w-full p-3 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
          onChange={(e) => setPhone(e.target.value)}
        />
>>>>>>> dev
        <p className="mb-2">사업자 번호</p>
        <input
          type="text"
          placeholder="사업자 번호를 입력해주세요"
          value={businessNumber}
<<<<<<< HEAD
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
=======
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
          onChange={(e) => setBusinessNumber(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-[#B3916A] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#a37e5f] transition mb-4"
        >
          완료
        </button>
        <span className="text-center text-gray-500">이미 계정이 있으신가요?</span>
        <button onClick={handelSignIn} className="text-[#B3916A] font-semibold underline">
          로그인
        </button>
>>>>>>> dev
      </div>
    </div>
  );
};

export default SignUpBusiness;
