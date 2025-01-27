'use client';

import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import { useRouter } from 'next/navigation';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
import LogoAuth from '@/components/ui/icon/LogoAuth';

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
  handleSignup
}) => {
  const [form, setForm] = useState({
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });

  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    name?: string;
    businessNumber?: string;
    confirmPassword?: string;
  }>({});

  const router = useRouter();

  const handleSignUp = () => {
    const newErrors: {
      email?: string;
      phone?: string;
      name?: string;
      businessNumber?: string;
      confirmPassword?: string;
    } = {};

    if (!email) newErrors.email = '이메일은 필수 입력값입니다.';
    if (!phone) newErrors.phone = '휴대폰 번호는 필수 입력값입니다.';
    if (!name) newErrors.name = '이름은 필수 입력값입니다.';
    if (!businessNumber) newErrors.businessNumber = '사업자 번호는 필수 입력값입니다.';
    if (password !== form.confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    handleSignup();
  };

  const handleInputChange = (
    field: 'email' | 'phone' | 'name' | 'businessNumber' | 'confirmPassword',
    value: string
  ) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined
    }));

    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'businessNumber':
        setBusinessNumber(value);
        break;
      case 'confirmPassword':
        setForm((prevForm) => ({ ...prevForm, confirmPassword: value }));
        if (password && value !== password) {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
        }
        break;
      default:
        break;
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
            <LogoAuth />
          </div>
          <h6 className="text-neutral-800 text-[24px] sm:text-[28px] font-bold mb-[12px] sm:mb-[16px] ">
            사업자 회원 회원가입
          </h6>

          <p className="font-pretendard mb-[12px] sm:mb-[16px] text-[16px] font-semibold leading-[135%]">
            사업자 이메일
          </p>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`mb-[12px] sm:mb-[16px]  w-full h-12 px-3 border rounded-[8px] focus:outline-none ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#BFBFBF]  focus:border-[#B3916A] focus:outline-none'
            }`}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

          <p className="font-pretendard mb-[12px] sm:mb-[16px] text-[16px] font-semibold leading-[135%]">비밀번호</p>
          <div className="relative w-full">
            <input
              type={form.showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-[8px] sm:mb-[12px]  w-full h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
            />
            <p className="text-xs pb-[4px] px-1 text-gray-700 mb-[20px]">
              영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자
            </p>
            <button
              type="button"
              onClick={() =>
                setForm((prevForm) => ({
                  ...prevForm,
                  showPassword: !prevForm.showPassword
                }))
              }
              className="mb-[8px] sm:mb-[12px] absolute right-[16px] top-6 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {form.showPassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          </div>

          <p className="font-pretendard mb-[12px] sm:mb-[16px] text-[16px] font-semibold leading-[135%]">
            비밀번호 확인
          </p>
          <div className="relative w-full">
            <input
              type={form.showConfirmPassword ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력해주세요"
              value={form.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`mb-[12px] sm:mb-[16px] w-full h-12 px-3 border rounded-[8px] focus:outline-none ${
                errors.confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#BFBFBF] focus:border-[#B3916A] focus:outline-none'
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setForm((prevForm) => ({
                  ...prevForm,
                  showConfirmPassword: !prevForm.showConfirmPassword
                }))
              }
              className="absolute right-[16px] top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {form.showConfirmPassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}

          <p className="mb-[12px] sm:mb-[16px]  font-semibold text-gray-700">담당자 이름</p>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`mb-[8px] sm:mb-[12px] w-full h-12 px-3 border rounded-[8px] focus:outline-none ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#BFBFBF] focus:border-[#B3916A] focus:outline-none'
            }`}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

          <p className="font-pretendard mb-[12px] sm:mb-[16px] text-[16px] font-semibold leading-[135%]">담당자 번호</p>
          <input
            type="tel"
            placeholder="휴대폰 번호를 입력해주세요"
            value={phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`mb-[12px] sm:mb-[16px] w-full  h-12 px-3 border rounded-[8px] focus:outline-none ${
              errors.phone
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#BFBFBF] focus:border-[#B3916A] focus:outline-none'
            }`}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

          <p className="font-pretendard mb-[12px] sm:mb-[16px] text-[16px] font-semibold leading-[135%]">사업자 번호</p>
          <input
            type="text"
            placeholder="사업자 번호를 입력해주세요"
            value={businessNumber}
            onChange={(e) => handleInputChange('businessNumber', e.target.value)}
            className={`mb-[8px] sm:mb-[12px] w-full h-12 px-3 border rounded-[8px] focus:outline-none ${
              errors.businessNumber
                ? 'border-red-500 focus:ring-red-500'
                : 'border-[#BFBFBF] focus:border-[#B3916A] focus:outline-none'
            }`}
          />
          {errors.businessNumber && <p className="text-sm text-red-500">{errors.businessNumber}</p>}

          <button
            onClick={handleSignUp}
            className="w-full mt-[24px] sm:mt-[32px] mb-[40px] sm:mb-[48px] bg-[#B3916A] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#a37e5f] transition mb-4"
          >
            완료
          </button>

          <div className="w-full flex flex-row justify-center mb-[80px]">
            <span className="text-center text-gray-500">이미 계정이 있으신가요?</span>
            <button onClick={handelSignIn} className=" text-[#B3916A] font-semibold underline">
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpBusiness;
