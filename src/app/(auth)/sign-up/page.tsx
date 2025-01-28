'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import KakaoSignIn from '../sign-in/_components/KakaoSignIn';
import Image from 'next/image';
import DividerIcon from '@/components/ui/icon/DividerIcon';
import BusinessIcon from '@/components/ui/icon/BusinessIcon';
import UserIcon from '@/components/ui/icon/UserIcon';
import LogoAuth from '@/components/ui/icon/LogoAuth';
const Page = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setUserType(type);
  };

  const handleNext = () => {
    if (userType === 'business') {
      router.push('/sign-up/business');
    } else if (userType === 'user') {
      router.push('/sign-up/user');
    } else {
      alert('회원 유형을 선택해주세요!');
    }
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="mt-[156px]">
        <LogoAuth />
      </div>
      <div>
        <p className="w-full mb-[40px] mt-[40px] max-w-[400px] text-[24px] font-pretendard font-semibold leading-[135%] not-italic">
          회원 유형 선택
        </p>

        {/* 회원 유형 선택 */}
        <div className="flex flex-row justify-between gap-4 mb-8">
          {/* 일반 회원가입 */}
          <div
            onClick={() => handleSelect('user')}
            className={`flex flex-col items-center p-6 rounded-lg border w-1/2 sm:w-[190px] h-auto min-h-[175px] cursor-pointer ${
              userType === 'user' ? 'border-[#B3916A] bg-[#FDF9F4]' : 'border-gray-300'
            }`}
          >
            <UserIcon />
            <p className="font-medium text-neutral-800 text-[18px] m-[4px]">일반 회원가입</p>
            <p
              className={`text-[16px] sm:text-[16px] text-xs mt-1 ${
                userType === 'user' ? 'text-[#B3916A]' : 'text-gray-500'
              }`}
            >
              만 19세 이상의 일반 회원
            </p>
          </div>

          {/* 사업자 회원가입 */}
          <div
            onClick={() => handleSelect('business')}
            className={`flex flex-col items-center py-[10px] sm:py-[14px] rounded-lg border w-1/2 sm:w-[190px] h-auto min-h-[175px] cursor-pointer ${
              userType === 'business' ? 'border-[#B3916A] bg-[#FDF9F4]' : 'border-gray-300'
            }`}
          >
            <BusinessIcon />
            <p className=" font-medium text-neutral-800 text-[18px] m-[4px]">사업자 회원가입</p>
            <p
              className={`text-[16px] sm:text-[16px] text-xs mt-1 ${
                userType === 'business' ? 'text-[#B3916A]' : 'text-gray-500'
              }`}
            >
              사업체를 소지한 회원
            </p>
          </div>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className="w-full max-w-[400px] text-[20px] bg-[#B3916A] font-pretendard font-semibold leading-[135%] not-italic text-white py-3 rounded-lg hover:bg-[#a37e5f] transition mb-[12px] sm:mb-[16px]
          "
        >
          다음
        </button>

        <p className="w-full sm:w-[400px]  flex justify-center text-neutral-600">
          이미 계정이 있으신가요?
          <button
            onClick={handleSignIn}
            className="ml-[8px] sm:ml-[12px]  text-[16px] sm:text-[18px] text-[var(--brand-Darker,#534431)] font-semibold font-pretendard leading-[135%]"
          >
            로그인
          </button>
        </p>

        {/* 간편 회원가입 구분선 */}
        {/* <div className="w-full max-w-[400px] flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-sm text-neutral-400">간편 회원가입</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}

        {/* 카카오 로그인 */}
        {/* <KakaoSignIn /> */}

        {/* 하단 링크 */}
        {/* <div className="flex w-full max-w-[400px] justify-center items-center text-sm text-gray-500 mt-4">
          <button
            type="button"
            className="flex-1 text-right m-[2px] hover:underline"
            onClick={() => window.open('https://www.kakao.com/policy/privacy', '_blank')}
          >
            개인정보처리방침
          </button>

          <DividerIcon />

          <button
            type="button"
            className="flex-1 text-left hover:underline"
            onClick={() => window.open('https://www.kakao.com/policy/terms?type=a&lang=ko', '_blank')}
          >
            이용약관
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
