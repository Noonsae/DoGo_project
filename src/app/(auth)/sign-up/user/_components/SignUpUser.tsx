import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import Error from '../error';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
    <div className="flex justify-center items-center ">
      <div className="p-12 w-[400px] h-[720px]">
        <div className="w-[400px] mt-[80px] mb-[40px] flex flex-col justify-center items-center">
          <Image src="/images/Dogo.png" alt="Dogo" priority width={140} height={37} />
        </div>
        <p className="text-[18px] font-bold mb-[24px] w-[400px]">일반 회원 회원가입</p>
        {/* 이메일 인풋전체 */}
        <p className=" font-pretendard text-[16px] font-semibold leading-[135%] not-italic">이메일</p>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[400px]  flex h-[48px] p-[8px_16px] items-center gap-[4px] self-stretch border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
        />
        {/* 비밀번호인풋 전체 */}
        <p className="font-pretendard text-[16px] font-semibold leading-[135%] not-italic">비밀번호</p>
        <div className="relative">
          <input
            type={updatePassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-[400px]  flex h-[48px] p-[8px_16px] items-center gap-[4px] self-stretch border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
          />
          <p className="text-xs pb-[4px] text-gray-700 mb-[20px]">
            영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자
          </p>
          <button
            type="button"
            onClick={() => setUpdagePassword((prev) => !prev)}
            className="absolute right-[-70px] top-3 text-gray-600 hover:text-black"
          >
            {updatePassword ? (
              <svg
                className="mt-[8px] mb-[8px] ml-[8px] mr-[8px]"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0.921875C6.22812 0.921875 2.16875 3.84688 0.5 8C2.16875 12.1531 6.22812 15.0781 11 15.0781C15.7719 15.0781 19.8312 12.1531 21.5 8C19.8312 3.84688 15.7719 0.921875 11 0.921875ZM11 12.7203C8.375 12.7203 6.22812 10.5969 6.22812 8C6.22812 5.40312 8.375 3.27969 11 3.27969C13.625 3.27969 15.7719 5.40312 15.7719 8C15.7719 10.5969 13.625 12.7203 11 12.7203ZM11 5.16875C9.425 5.16875 8.13594 6.44375 8.13594 8C8.13594 9.55625 9.425 10.8312 11 10.8312C12.575 10.8312 13.8641 9.55625 13.8641 8C13.8641 6.44375 12.575 5.16875 11 5.16875Z"
                  fill="#A0A0A0"
                />
              </svg>
            ) : (
              <svg
                className="mt-[8px] mb-[8px] ml-[8px] mr-[8px]"
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0047 3.7875C13.6391 3.7875 15.7812 5.91094 15.7812 8.52656C15.7812 9.14062 15.6594 9.72187 15.4391 10.2609L18.2281 13.0266C19.6719 11.8312 20.8062 10.2891 21.5047 8.52656C19.85 4.36875 15.7719 1.42031 10.9953 1.42031C9.65937 1.42031 8.37969 1.65938 7.19375 2.08125L9.25625 4.12969C9.8 3.91406 10.3859 3.7875 11.0047 3.7875ZM1.45625 1.20469L3.63594 3.36563L4.07656 3.80156C2.4875 5.02031 1.24531 6.65156 0.5 8.52656C2.15 12.6844 6.22813 15.6328 11.0047 15.6328C12.4859 15.6328 13.8969 15.3469 15.1859 14.8359L15.5891 15.2344L18.3875 18L19.6016 16.7953L2.66562 0L1.45625 1.20469ZM6.73438 6.44062L8.21563 7.90781C8.16875 8.10469 8.14062 8.31563 8.14062 8.52188C8.14062 10.0922 9.42031 11.3625 11.0047 11.3625C11.2156 11.3625 11.4266 11.3344 11.6234 11.2875L13.1047 12.7547C12.4672 13.0688 11.7594 13.2562 11.0047 13.2562C8.37031 13.2562 6.22812 11.1328 6.22812 8.51719C6.22812 7.77656 6.42031 7.07812 6.73438 6.44062ZM10.85 5.70469L13.8594 8.69062L13.8781 8.54062C13.8781 6.97031 12.5984 5.7 11.0141 5.7L10.85 5.70469Z"
                  fill="#A0A0A0"
                />
              </svg>
            )}
          </button>
        </div>
        {/* 비밀번호확인 인풋 전체 */}
        <p className="font-pretendard text-[16px] font-semibold leading-[135%] not-italic">비밀번호 확인</p>
        <div className="relative">
          <input
            type={checkUpdatePassword ? 'text' : 'password'}
            placeholder="비밀번호를 다시 입력해 주세요."
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            className={`w-[400px]  p-3 border rounded-md pr-12 text-[16px] font-semibold leading-[135%] not-italic ${
              password && confirmPassword && password !== confirmPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-[#B3916A]'
            } focus:border-[#B3916A] focus:outline-none`}
          />
          {error && <Error message={error} />}
          <button
            type="button"
            onClick={() => setCheckUpdatePassword((prev) => !prev)}
            className="absolute right-[-70px] top-3 text-gray-600 hover:text-black"
          >
            {checkUpdatePassword ? (
              <svg
                className="mt-[8px] mb-[8px] ml-[8px] mr-[8px]"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0.921875C6.22812 0.921875 2.16875 3.84688 0.5 8C2.16875 12.1531 6.22812 15.0781 11 15.0781C15.7719 15.0781 19.8312 12.1531 21.5 8C19.8312 3.84688 15.7719 0.921875 11 0.921875ZM11 12.7203C8.375 12.7203 6.22812 10.5969 6.22812 8C6.22812 5.40312 8.375 3.27969 11 3.27969C13.625 3.27969 15.7719 5.40312 15.7719 8C15.7719 10.5969 13.625 12.7203 11 12.7203ZM11 5.16875C9.425 5.16875 8.13594 6.44375 8.13594 8C8.13594 9.55625 9.425 10.8312 11 10.8312C12.575 10.8312 13.8641 9.55625 13.8641 8C13.8641 6.44375 12.575 5.16875 11 5.16875Z"
                  fill="#A0A0A0"
                />
              </svg>
            ) : (
              <svg
                className="mt-[8px] mb-[8px] ml-[8px] mr-[8px]"
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0047 3.7875C13.6391 3.7875 15.7812 5.91094 15.7812 8.52656C15.7812 9.14062 15.6594 9.72187 15.4391 10.2609L18.2281 13.0266C19.6719 11.8312 20.8062 10.2891 21.5047 8.52656C19.85 4.36875 15.7719 1.42031 10.9953 1.42031C9.65937 1.42031 8.37969 1.65938 7.19375 2.08125L9.25625 4.12969C9.8 3.91406 10.3859 3.7875 11.0047 3.7875ZM1.45625 1.20469L3.63594 3.36563L4.07656 3.80156C2.4875 5.02031 1.24531 6.65156 0.5 8.52656C2.15 12.6844 6.22813 15.6328 11.0047 15.6328C12.4859 15.6328 13.8969 15.3469 15.1859 14.8359L15.5891 15.2344L18.3875 18L19.6016 16.7953L2.66562 0L1.45625 1.20469ZM6.73438 6.44062L8.21563 7.90781C8.16875 8.10469 8.14062 8.31563 8.14062 8.52188C8.14062 10.0922 9.42031 11.3625 11.0047 11.3625C11.2156 11.3625 11.4266 11.3344 11.6234 11.2875L13.1047 12.7547C12.4672 13.0688 11.7594 13.2562 11.0047 13.2562C8.37031 13.2562 6.22812 11.1328 6.22812 8.51719C6.22812 7.77656 6.42031 7.07812 6.73438 6.44062ZM10.85 5.70469L13.8594 8.69062L13.8781 8.54062C13.8781 6.97031 12.5984 5.7 11.0141 5.7L10.85 5.70469Z"
                  fill="#A0A0A0"
                />
              </svg>
            )}
          </button>
        </div>
        {/* 휴대폰인풋 전체 */}
        <p className="font-pretendard mt-1 text-[16px] font-semibold leading-[135%] not-italic">휴대폰 번호</p>
        <input
          type="tel"
          placeholder="휴대폰 번호를 입력해 주세요."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-[400px] mb-[20px] flex h-[48px] p-[8px_16px] items-center gap-[4px] self-stretch border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
        />
        {/* 이름인풋 전체 */}
        <p className="font-pretendard text-[16px] font-semibold leading-[135%] not-italic">이름</p>
        <input
          type="text"
          placeholder="이름을 입력해 주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[400px] mb-[20px] flex h-[48px] p-[8px_16px] items-center gap-[4px] self-stretch border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
        />
        {/* 닉네임인풋 전체 */}
        <p className="font-pretendard text-[16px] font-semibold leading-[135%] not-italic">닉네임</p>
        <input
          type="text"
          placeholder="닉네임을 입력해 주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-[400px] mb-[20px] flex h-[48px] p-[8px_16px] items-center gap-[4px] self-stretch border border-[#BFBFBF] rounded-[8px] focus:border-[#B3916A] focus:outline-none"
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
