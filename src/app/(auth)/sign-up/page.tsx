'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import KakaoSignIn from '../sign-in/_components/KakaoSignIn';
import Image from 'next/image';
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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className=" mt-[156px] mb-[40px]">
        <Image src="/images/Dogo.png" alt="Dogo" priority width={140} height={37} />
      </div>
      <p className="w-[400px] text-[24px] font-pretendard font-semibold leading-[135%] not-italic">회원 유형 선택</p>
      <div className="h-[693px] w-[400px] my-10">
        {/* 회원 유형 선택 */}
        <div className="w-[400px] flex justify-between gap-4 mb-8">
          {/* 일반 회원가입 */}
          <div
            onClick={() => handleSelect('user')}
            className={`flex flex-col items-center p-6 rounded-lg border w-[190px] h-[175] cursor-pointer ${
              userType === 'user' ? 'border-[#B3916A] bg-[#FDF9F4]' : 'border-gray-300'
            }`}
          >
            <svg
              className={`mt-[20px] mb-[20px] mr-[16px] ml-[16px] ${
                userType === 'user' ? 'fill-[#534431]' : 'fill-[#444444]'
              }`}
              width="43"
              height="43"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.9998 22C27.8932 22 32.6665 17.2266 32.6665 11.3333C32.6665 5.43996 27.8932 0.666626 21.9998 0.666626C16.1065 0.666626 11.3332 5.43996 11.3332 11.3333C11.3332 17.2266 16.1065 22 21.9998 22ZM21.9998 27.3333C14.8798 27.3333 0.666504 30.9066 0.666504 38V43.3333H43.3332V38C43.3332 30.9066 29.1198 27.3333 21.9998 27.3333Z"
                fill="#444444"
              />
            </svg>

            <p className="font-medium text-neutral-800 text-[24xp]">일반 회원가입</p>
            <p className={`text-xs mt-1 ${userType === 'user' ? 'text-[#B3916A]' : 'text-gray-500'}`}>
              만 19세 이상의 일반 회원
            </p>
          </div>

          {/* 사업자 회원가입 */}
          <div
            onClick={() => handleSelect('business')}
            className={`flex flex-col items-center p-6 rounded-lg border w-[190px] h-[175] cursor-pointer ${
              userType === 'business' ? 'border-[#B3916A] bg-[#FDF9F4]' : 'border-gray-300'
            }`}
          >
            <svg
              className={`mt-[20px] mb-[20px] mr-[16px] ml-[16px] ${
                userType === 'business' ? 'fill-[#534431]' : 'fill-[#444444]'
              }`}
              width="48"
              height="52"
              viewBox="0 0 48 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 0C3.46957 0 2.96086 0.210713 2.58579 0.585786C2.21071 0.960859 2 1.46957 2 2C2 2.53043 2.21071 3.03914 2.58579 3.41421C2.96086 3.78929 3.46957 4 4 4V48H2C1.46957 48 0.960859 48.2107 0.585786 48.5858C0.210713 48.9609 0 49.4696 0 50C0 50.5304 0.210713 51.0391 0.585786 51.4142C0.960859 51.7893 1.46957 52 2 52H46C46.5304 52 47.0391 51.7893 47.4142 51.4142C47.7893 51.0391 48 50.5304 48 50C48 49.4696 47.7893 48.9609 47.4142 48.5858C47.0391 48.2107 46.5304 48 46 48H44V4C44.5304 4 45.0391 3.78929 45.4142 3.41421C45.7893 3.03914 46 2.53043 46 2C46 1.46957 45.7893 0.960859 45.4142 0.585786C45.0391 0.210713 44.5304 0 44 0H4ZM16 10C15.4696 10 14.9609 10.2107 14.5858 10.5858C14.2107 10.9609 14 11.4696 14 12C14 12.5304 14.2107 13.0391 14.5858 13.4142C14.9609 13.7893 15.4696 14 16 14H20C20.5304 14 21.0391 13.7893 21.4142 13.4142C21.7893 13.0391 22 12.5304 22 12C22 11.4696 21.7893 10.9609 21.4142 10.5858C21.0391 10.2107 20.5304 10 20 10H16ZM14 20C14 19.4696 14.2107 18.9609 14.5858 18.5858C14.9609 18.2107 15.4696 18 16 18H20C20.5304 18 21.0391 18.2107 21.4142 18.5858C21.7893 18.9609 22 19.4696 22 20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H16C15.4696 22 14.9609 21.7893 14.5858 21.4142C14.2107 21.0391 14 20.5304 14 20ZM16 26C15.4696 26 14.9609 26.2107 14.5858 26.5858C14.2107 26.9609 14 27.4696 14 28C14 28.5304 14.2107 29.0391 14.5858 29.4142C14.9609 29.7893 15.4696 30 16 30H20C20.5304 30 21.0391 29.7893 21.4142 29.4142C21.7893 29.0391 22 28.5304 22 28C22 27.4696 21.7893 26.9609 21.4142 26.5858C21.0391 26.2107 20.5304 26 20 26H16ZM26 12C26 11.4696 26.2107 10.9609 26.5858 10.5858C26.9609 10.2107 27.4696 10 28 10H32C32.5304 10 33.0391 10.2107 33.4142 10.5858C33.7893 10.9609 34 11.4696 34 12C34 12.5304 33.7893 13.0391 33.4142 13.4142C33.0391 13.7893 32.5304 14 32 14H28C27.4696 14 26.9609 13.7893 26.5858 13.4142C26.2107 13.0391 26 12.5304 26 12ZM28 18C27.4696 18 26.9609 18.2107 26.5858 18.5858C26.2107 18.9609 26 19.4696 26 20C26 20.5304 26.2107 21.0391 26.5858 21.4142C26.9609 21.7893 27.4696 22 28 22H32C32.5304 22 33.0391 21.7893 33.4142 21.4142C33.7893 21.0391 34 20.5304 34 20C34 19.4696 33.7893 18.9609 33.4142 18.5858C33.0391 18.2107 32.5304 18 32 18H28ZM26 28C26 27.4696 26.2107 26.9609 26.5858 26.5858C26.9609 26.2107 27.4696 26 28 26H32C32.5304 26 33.0391 26.2107 33.4142 26.5858C33.7893 26.9609 34 27.4696 34 28C34 28.5304 33.7893 29.0391 33.4142 29.4142C33.0391 29.7893 32.5304 30 32 30H28C27.4696 30 26.9609 29.7893 26.5858 29.4142C26.2107 29.0391 26 28.5304 26 28ZM16 46V40C16 39.4696 16.2107 38.9609 16.5858 38.5858C16.9609 38.2107 17.4696 38 18 38H30C30.5304 38 31.0391 38.2107 31.4142 38.5858C31.7893 38.9609 32 39.4696 32 40V46C32 46.5304 31.7893 47.0391 31.4142 47.4142C31.0391 47.7893 30.5304 48 30 48H18C17.4696 48 16.9609 47.7893 16.5858 47.4142C16.2107 47.0391 16 46.5304 16 46Z"
                fill="#444444"
              />
            </svg>

            <p className="font-medium text-neutral-800 text-[24xp]">사업자 회원가입</p>
            <p className={`text-xs mt-1 ${userType === 'business' ? 'text-[#B3916A]' : 'text-gray-500'}`}>
              사업체를 소지한 회원
            </p>
          </div>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className="w-[400px] text-[20px] bg-[#B3916A] font-pretendard font-semibold leading-[135%] not-italic text-white py-3 rounded-lg hover:bg-[#a37e5f] transition mb-8"
        >
          다음
        </button>
        <p className="w-[400px] flex justify-center text-neutral-600">
          이미 계정이 있으신가요?
          <button onClick={handleSignIn} className="text-[#534431] ml-3">
            {' '}
            로그인
          </button>
        </p>
        {/* 간편 회원가입 구분선 */}
        <div className="w-[400px] flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-sm text-neutral-400">간편 회원가입</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* 카카오 로그인 */}
        <KakaoSignIn />

        {/* 하단 링크 */}
        <div className="flex w-[400px] justify-center text-sm text-gray-500 mt-4">
          <button
            type="button"
            className="m-[2px] hover:underline"
            onClick={() => window.open('https://www.kakao.com/policy/privacy', '_blank')}
          >
            개인정보처리방침
          </button>
          <svg
            className="flex-shrink-0 mt-[3.2px] mr-[11.2px] ml-[11.2px] mb-[3.2px]"
            width="1.6"
            height="17.6"
            viewBox="0 0 2 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.0002 0.199951C1.44202 0.199951 1.8002 0.558127 1.8002 0.999951V17C1.8002 17.4417 1.44202 17.8 1.0002 17.8C0.558371 17.8 0.200195 17.4417 0.200195 17V0.999951C0.200195 0.558127 0.558371 0.199951 1.0002 0.199951Z"
              fill="#BFBFBF"
            />
          </svg>

          <button
            type="button"
            className="hover:underline"
            onClick={() => window.open('https://www.kakao.com/policy/terms?type=a&lang=ko', '_blank')}
          >
            이용약관
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

//
