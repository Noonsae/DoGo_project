'use client';

import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import { useRouter } from 'next/navigation';
import Error from '../error';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
import Image from 'next/image';
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
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[400px] lg:h-auto">
          <div className="w-full mt-[156px] mb-[40px] flex flex-col justify-center items-center">
            <Image src="/images/Dogo.png" alt="Dogo" priority width={140} height={37} />
          </div>
          <h6 className="text-[18px] font-bold mb-[24px]">사업자 회원 회원가입</h6>

          {/* 이메일 */}
          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">사업자 이메일</p>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            className="w-full mb-[20px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 비밀번호 */}
          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">비밀번호</p>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
            />
            <p className="text-xs pb-[4px] text-gray-700 mb-[20px]">
              영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자
            </p>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-[16px] top-6 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showPassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          </div>

          {/* 비밀번호 확인 */}
          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">비밀번호 확인</p>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력해주세요"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              className={`w-full h-12 px-3 border rounded-[8px] focus:outline-none ${
                password && confirmPassword && password !== confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#BFBFBF] focus:ring-[#B3916A]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-[16px] top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showConfirmPassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          </div>

          {error && <Error message={error} />}

          {/* 담당자 이름 */}
          <p className="mb-2 font-semibold text-gray-700">담당자 이름</p>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            className="w-full mb-[20px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />

          {/* 담당자 번호 */}
          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">담당자 번호</p>
          <input
            type="tel"
            placeholder="휴대폰 번호를 입력해주세요"
            value={phone}
            className="w-full mb-[20px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* 사업자 번호 */}
          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">사업자 번호</p>
          <input
            type="text"
            placeholder="사업자 번호를 입력해주세요"
            value={businessNumber}
            className="w-full mb-[20px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
            onChange={(e) => setBusinessNumber(e.target.value)}
          />

          {/* 회원가입 버튼 */}
          <button
            onClick={handleSignup}
            className="w-full bg-[#B3916A] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#a37e5f] transition mb-4"
          >
            완료
          </button>

          <div className="w-full flex flex-row justify-center mb-[80px]">
            <span className="text-center text-gray-500">이미 계정이 있으신가요?</span>
            <button onClick={handelSignIn} className="text-[#B3916A] font-semibold underline">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpBusiness;
