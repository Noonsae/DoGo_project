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
  const [updatePassword, setUpdagePassword] = useState(false);
  const [checkUpdatePassword, setCheckUpdatePassword] = useState(false);

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
      <div className="p-12 w-[400px] h-[899px]">
        <h1 className="text-4xl font-bold mb-8 text-center mt-[65px]">DoGo</h1>
        <h6 className="text-[18px] font-bold mb-8">일반 회원 회원가입</h6>
        <p className="mb-1 font-semibold text-gray-700">이메일</p>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[400px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
        />
        <p className="mb-2 font-semibold text-gray-700">비밀번호</p>
        <div className="relative">
          <input
            type={updatePassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-[400px] p-3 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
          />
          <p className="text-xs pb-[4px] text-gray-700">영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자</p>
          <button
            type="button"
            onClick={() => setUpdagePassword((prev) => !prev)}
            className="absolute right-[-70px] top-3 text-gray-600 hover:text-black"
          >
            {updatePassword ? (
              <IoMdEye size={24} className="text-neutral-500" />
            ) : (
              <IoMdEyeOff size={24} className="text-neutral-500" />
            )}
          </button>
        </div>
        <p className="mb-2 font-semibold text-gray-700">비밀번호 확인</p>
        <div className="relative">
          <input
            type={checkUpdatePassword ? 'text' : 'password'}
            placeholder="비밀번호를 다시 입력해 주세요."
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className={`w-[400px] p-3 border rounded-md pr-12 mb-4 ${
              password && confirmPassword && password !== confirmPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-[#B3916A]'
            } focus:outline-none focus:ring-2`}
          />
          <button
            type="button"
            onClick={() => setCheckUpdatePassword((prev) => !prev)}
            className="absolute right-[-70px] top-3 text-gray-600 hover:text-black"
          >
            {checkUpdatePassword ? (
              <IoMdEye size={24} className="text-neutral-500" />
            ) : (
              <IoMdEyeOff size={24} className="text-neutral-500" />
            )}
          </button>
        </div>
        {error && <Error message={error} />}
        <p className="mb-2 font-semibold text-gray-700">휴대폰 번호</p>
        <input
          type="tel"
          placeholder="휴대폰 번호를 입력해 주세요."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-[400px] p-3 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
        />
        <p className="mb-2 font-semibold text-gray-700">이름</p>
        <input
          type="text"
          placeholder="이름을 입력해 주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[400px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-4"
        />
        <p className="mb-2 font-semibold text-gray-700">닉네임</p>
        <input
          type="text"
          placeholder="닉네임을 입력해 주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-[400px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B3916A] mb-6"
        />

        <button
          onClick={handleSignup}
          className="w-[400px] bg-[#B3916A] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#a37e5f] transition mb-4"
        >
          완료
        </button>
        <span className="text-center text-gray-500">이미 계정이 있으신가요?</span>
        <button onClick={handelSignIn} className="text-[#B3916A] font-semibold underline">
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignUpUser;
