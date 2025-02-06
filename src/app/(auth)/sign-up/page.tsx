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
    <div className="sm:flex flex-col justify-center items-center min-h-screen px-[20px] ">
      <div className="flex justify-center mt-[40px]">
        <LogoAuth className=" w-[74px] h-[21px] sm:w-[139.947px] sm:h-[36.813px]" />
      </div>

      <div>
        <p className="sm:mt-6 mb-[48px] md:mb-12 sm:mb-8 text-neutral-800 flex flex-col justify-center items-center w-full max-w-[400px] text-[24px] font-pretendard font-semibold leading-[135%] not-italic">
          회원 유형 선택
        </p>

        {/* 회원 유형 선택 */}
        <div className="flex flex-row justify-center gap-x-[20px] sm:gap-x-[16px] mb-[48px] md:mb-12 sm:mb-8">
          {/* 일반 회원가입 */}
          <div
            onClick={() => handleSelect('user')}
            className={` w-[152px] h-[178px] sm:w-[190px] sm:h-[175px] pl-[16px] pr-[16px] pt-[20px] pb-[20px] sm:pl-[16px] sm:pr-[16px] sm:pt-[20px] sm:pb-[20px]  flex flex-col items-center  rounded-lg border min-h-[175px] cursor-pointer ${
              userType === 'user' ? 'border-[#B3916A] bg-[#FDF9F4]' : 'border-gray-300'
            }`}
          >
            <UserIcon />
            <p className="text-neutral-700 text-center font-pretendard text-[16px] font-normal leading-[145%] sm:text-[18px]  lg:text-[18px]">
              일반 회원가입
            </p>
            <p
              className={` text-center font-pretendard text-[14px] sm:text-[16px] font-normal leading-[145%] text-xs mt-2 w-[158px] ${
                userType === 'user' ? 'text-[#B3916A]' : 'text-gray-500'
              }`}
            >
              <span className="hidden sm:inline">만 19세 이상의 일반 회원</span>
              <span className="sm:hidden block">
                만 19세 이상의
                <br />
                <span className="text-center block">일반 회원</span>
              </span>
            </p>
          </div>

          {/* 사업자 회원가입 */}
          <div
            onClick={() => handleSelect('business')}
            className={`w-[152px] h-[178px] sm:w-[190px] sm:h-[175px] pl-[16px] pr-[16px] pt-[20px] pb-[20px] sm:pl-[16px] sm:pr-[16px] sm:pt-[20px] sm:pb-[20px]  flex flex-col items-center rounded-lg border  min-h-[175px] cursor-pointer ${
              userType === 'business' ? 'border-[#B3916A] bg-[#FDF9F4]' : 'border-gray-300'
            }`}
          >
            <BusinessIcon />
            <p className="text-neutral-700 text-center font-pretendard text-[16px] font-normal leading-[145%] sm:text-[18px]  lg:text-[18px] ">
              사업자 회원가입
            </p>
            <p
              className={`text-[14px] sm:text-[16px] text-xs mt-2 flex flex-col items-center justify-items-center ${
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
          className="px-[24px] py-[8px] w-full max-w-[400px] text-[20px] bg-[#B3916A] font-pretendard font-semibold leading-[135%] not-italic text-white rounded-lg hover:bg-[#a37e5f] transition mb-[12px] sm:mb-[16px]
          "
        >
          다음
        </button>

        <p className="flex flex-row items-center w-full sm:w-[400px] justify-center text-neutral-600">
          이미 계정이 있으신가요?
          <button
            onClick={handleSignIn}
            className=" ml-[8px] sm:ml-[12px]  text-[16px] sm:text-[16px] text-[var(--brand-Darker,#534431)] font-semibold font-pretendard leading-[135%]"
          >
            로그인
          </button>
        </p>
        {userType === 'user' && (
          <>
            {/* 간편 회원가입 구분선 */}
            <div className="w-full max-w-[400px] flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="px-4 text-sm text-neutral-400">간편 회원가입</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* 카카오 로그인 */}
            <KakaoSignIn />

            {/* 하단 링크 */}
            <div className="mb-[40px] sm:mb-[80px] flex w-full max-w-[400px] justify-center items-center text-sm text-gray-500 mt-4">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
