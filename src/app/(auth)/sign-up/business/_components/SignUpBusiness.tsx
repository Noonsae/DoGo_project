'use client';

import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import { useRouter } from 'next/navigation';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
import LogoAuth from '@/components/ui/icon/LogoAuth';
import BusinessInputField from './BusinessInputField';
const SignUpBusiness = ({
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
}: SignUpProps) => {
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
    password?: string;
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
          <p className="text-neutral-800  text-[24px] sm:text-[28px] font-bold mb-[12px] sm:mb-[16px] ">
            사업자 회원 회원가입
          </p>

          <BusinessInputField
            label="사업자이메일"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email ?? ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mb-[4px] sm:mb-[8px]"
            error={errors.email}
          />

          <BusinessInputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password ?? ''}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password || ''}
            isPassword
            isPasswordVisible={form.showPassword}
            togglePasswordVisibility={() =>
              setForm((prevForm) => ({ ...prevForm, showPassword: !prevForm.showPassword }))
            }
            helperText="영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자"
          />

          <BusinessInputField
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            value={form.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword || ''}
            isPassword
            isPasswordVisible={form.showConfirmPassword}
            togglePasswordVisibility={() =>
              setForm((prevForm) => ({ ...prevForm, showConfirmPassword: !prevForm.showConfirmPassword }))
            }
          />

          <BusinessInputField
            label="담당자 이름"
            type="text"
            placeholder="이름을 입력해주세요"
            value={name ?? ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="mb-[4px] sm:mb-[8px]"
            error={errors.name}
          />

          <BusinessInputField
            label="휴대폰 번호"
            type="tel"
            placeholder="휴대폰 번호를 입력해 주세요."
            value={phone ?? ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            className="mb-[4px] sm:mb-[8px]"
          />

          <BusinessInputField
            label="사업자 번호"
            type="text"
            placeholder="사업자 번호를 입력해 주세요."
            value={businessNumber ?? ''}
            onChange={(e) => handleInputChange('businessNumber', e.target.value)}
            error={errors.businessNumber}
            className="mb-[4px] sm:mb-[8px]"
          />

          <button
            onClick={handleSignUp}
            className="mt-[20px] sm:mt-[24px] w-[400px] h-[48px] sm:w-[450px] sm:h-[56px] text-white text-center font-pretendard text-[20px] font-semibold leading-[135%] mb-[40px] sm:mb-[48px] bg-[#B3916A]  py-3 px-4 rounded-md hover:bg-[#a37e5f] transition "
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
