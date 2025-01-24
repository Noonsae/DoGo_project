import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import { useRouter } from 'next/navigation';
import Error from '../error';
import Image from 'next/image';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';

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
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [updatePassword, setUpdagePassword] = useState(false);
  // const [checkUpdatePassword, setCheckUpdatePassword] = useState(false);
  const [form, setForm] = useState({
    confirmPassword: '',
    updatePassword: false,
    checkUpdatePassword: false
  });
  const router = useRouter();

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (form.confirmPassword && value !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };
  const handleConfirmPasswordChange = (value: string) => {
    handleInputChange('confirmPassword', value);
    if (password && value !== password) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
    }
  };

  const handelSignIn = () => {
    router.push('/sign-in');
  };

  // 반응형 완료
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[400px] lg:h-auto">
          <div className="w-full mt-[156px] mb-[40px] flex flex-col justify-center items-center">
            <Image src="/images/Dogo.png" alt="Dogo" priority width={140} height={37} />
          </div>
          <p className="text-[18px] font-bold mb-[24px]">일반 회원 회원가입</p>

          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">이메일</p>
          <input
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-[20px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
          />

          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">비밀번호</p>
          <div className="relative">
            <input
              type={form.updatePassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="w-full h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
            />
            <p className="text-xs pb-[4px] px-1 text-gray-700 mb-[20px]">
              영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자
            </p>
            <button
              type="button"
              onClick={() => handleInputChange('updatePassword', !form.updatePassword)}
              className="absolute right-[20px] top-6 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {form.updatePassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          </div>

          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">비밀번호 확인</p>
          <div className="relative">
            <input
              type={form.checkUpdatePassword ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력해 주세요."
              value={form.confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              className={`w-full h-12 px-3 border rounded-[8px] focus:outline-none ${
                password && form.confirmPassword && password !== form.confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-[#BFBFBF] focus:ring-[#B3916A]'
              }`}
            />
            {error && <Error message={error} />}
            <button
              type="button"
              onClick={() => handleInputChange('checkUpdatePassword', !form.checkUpdatePassword)}
              className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {form.checkUpdatePassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          </div>

          <p className="font-pretendard mt-1 text-[16px] font-semibold leading-[135%]">휴대폰 번호</p>
          <input
            type="tel"
            placeholder="휴대폰 번호를 입력해 주세요."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-[20px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
          />

          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">이름</p>
          <input
            type="text"
            placeholder="이름을 입력해 주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-[20px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
          />

          <p className="font-pretendard text-[16px] font-semibold leading-[135%]">닉네임</p>
          <input
            type="text"
            placeholder="닉네임을 입력해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full mb-[20px] h-12 px-3 border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
          />

          <button
            type="button"
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

export default SignUpUser;
