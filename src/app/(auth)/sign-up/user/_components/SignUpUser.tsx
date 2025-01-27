import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
import LogoAuth from '@/components/ui/icon/LogoAuth';

const SignUpUser: React.FC<SignUpProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  setBusinessNumber,
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
  const [form, setForm] = useState({
    confirmPassword: '', // 비밀번호 확인
    updatePassword: false, // 비밀번호 보기 toggle
    checkUpdatePassword: false // 비밀번호 확인 보기 toggle
  });

  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    name?: string;
    nickname?: string;
    confirmPassword?: string;
  }>({}); // 에러 메시지 상태
  const router = useRouter();

  const handleSignUp = () => {
    const newErrors: { email?: string; phone?: string; name?: string; nickname?: string; confirmPassword?: string } =
      {};

    if (!email) newErrors.email = '이메일은 필수 입력값입니다.';
    if (!phone) newErrors.phone = '휴대폰 번호는 필수 입력값입니다.';
    if (!name) newErrors.name = '이름은 필수 입력값입니다.';
    if (!nickname) newErrors.nickname = '닉네임은 필수 입력값입니다.';
    if (password !== form.confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    handleSignup();
  };

  const handleInputChange = (field: 'email' | 'phone' | 'name' | 'nickname' | 'confirmPassword', value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined // 입력 시 해당 에러 제거
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
      case 'nickname':
        setNickname(value);
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
          <p className="text-[18px] font-bold mb-[12px] sm:mb-[16px]">일반 회원 회원가입</p>

          {/* 이메일 */}
          <p className=" mb-[12px] sm:mb-[16px] font-pretendard text-[16px] font-semibold leading-[135%]">이메일</p>
          <input
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full mb-[8px] sm:mb-[12px]  h-12 px-3 border rounded-[8px] focus:outline-none ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-[#BFBFBF] focus:ring-[#B3916A]'
            }`}
          />
          {errors.email && <p className="text-[14px] text-red-500">{errors.email}</p>}

          {/* 비밀번호 */}
          <p className="mb-[12px] sm:mb-[16px] font-pretendard mt-[20px] text-[16px] font-semibold leading-[135%]">
            비밀번호
          </p>
          <div className="relative">
            <input
              type={form.updatePassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-[8px] sm:mb-[12px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
            />
            <p className="text-xs pb-[4px] mb-[12px] sm:mb-[16px] px-1 text-gray-700">
              영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자
            </p>
            <button
              type="button"
              onClick={() => setForm((prevForm) => ({ ...prevForm, updatePassword: !prevForm.updatePassword }))}
              className="absolute right-[20px] top-6 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {form.updatePassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          </div>

          {/* 비밀번호 확인 */}
          <p className="mb-[12px] sm:mb-[16px] font-pretendard text-[16px] font-semibold leading-[135%]">
            비밀번호 확인
          </p>
          <div className="relative">
            <input
              type={form.checkUpdatePassword ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력해 주세요."
              value={form.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`mb-[8px] sm:mb-[12px] w-full h-12 px-3 border rounded-[8px] focus:outline-none ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-[#BFBFBF] focus:ring-[#B3916A]'
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setForm((prevForm) => ({ ...prevForm, checkUpdatePassword: !prevForm.checkUpdatePassword }))
              }
              className="absolute right-[20px] top-6 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {form.checkUpdatePassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-sm  text-red-500">{errors.confirmPassword}</p>}

          {/* 휴대폰 번호 */}
          <p className="mb-[12px] sm:mb-[16px] font-pretendard mt-[20px] text-[16px] font-semibold leading-[135%]">
            휴대폰 번호
          </p>
          <input
            type="tel"
            placeholder="휴대폰 번호를 입력해 주세요."
            value={phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full mb-[8px] sm:mb-[12px] h-12 px-3 border rounded-[8px] focus:outline-none ${
              errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-[#BFBFBF] focus:ring-[#B3916A]'
            }`}
          />
          {errors.phone && <p className="text-[14px] mb-[12px] sm:mb-[16px] text-red-500">{errors.phone}</p>}

          {/* 이름 */}
          <p className="mb-[12px] sm:mb-[16px] font-pretendard text-[16px] font-semibold leading-[135%]">이름</p>
          <input
            type="text"
            placeholder="이름을 입력해 주세요."
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full mb-[8px] sm:mb-[12px]  h-12 px-3 border rounded-[8px] focus:outline-none ${
              errors.name ? 'border-red-500 mb-[20px] focus:ring-red-500' : 'border-[#BFBFBF] focus:ring-[#B3916A]'
            }`}
          />
          {errors.name && <p className="text-[14px] text-red-500">{errors.name}</p>}

          {/* 닉네임 */}
          <p className="font-pretendard mb-[12px] sm:mb-[16px] mt-[20px] text-[16px] font-semibold leading-[135%]">
            닉네임
          </p>
          <input
            type="text"
            placeholder="닉네임을 입력해 주세요."
            value={nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            className={`w-full mb-[8px] sm:mb-[12px]  h-12 px-3 border rounded-[8px] focus:outline-none ${
              errors.nickname ? 'border-red-500  focus:ring-red-500' : 'border-[#BFBFBF] focus:ring-[#B3916A]'
            }`}
          />
          {errors.nickname && <p className="text-[14px] text-red-500">{errors.nickname}</p>}

          {/* 완료 버튼 */}
          <button
            type="button"
            onClick={handleSignUp}
            className="w-full mt-[20px] bg-[#B3916A] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#a37e5f] transition mb-4"
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

export default SignUpUser;
