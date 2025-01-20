'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RxDividerVertical } from 'react-icons/rx';
import KakaoSignIn from '../sign-in/_components/KakaoSignIn';
import Logo from '@/components/layout/Logo';
import { HiBuildingOffice } from 'react-icons/hi2';
import { MdPerson } from 'react-icons/md';
// import Logo from './Logo';
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
        <svg width="142" height="40" viewBox="0 0 142 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1249_5182)">
            <path
              d="M0.729492 2.47485H18.2451C22.6389 2.47485 26.4784 3.52381 29.7639 5.62173C34.7514 8.86756 37.2452 13.7957 37.2452 20.4061C37.2452 25.5916 35.5034 29.8269 32.0202 33.1124C28.4577 36.4374 23.9254 38.0999 18.4232 38.0999H0.729492V36.4966H5.47948V4.07798H0.729492V2.47485ZM18.4232 4.07798H13.792V36.4966H18.3045C20.1649 36.4966 21.7284 36.1206 22.9952 35.3686C26.2805 33.4291 27.9232 28.3426 27.9232 20.1091C27.9232 15.9926 27.5274 12.6874 26.7357 10.1936C25.3504 6.11653 22.5794 4.07798 18.4232 4.07798ZM49.2389 25.2156C49.2389 28.9363 49.4764 31.6478 49.9514 33.3499C50.6639 35.8831 52.2472 37.1499 54.7014 37.1499C56.0867 37.1499 57.2149 36.7341 58.0857 35.9031C59.5899 34.3988 60.3419 30.7571 60.3419 24.9781C60.3419 21.3759 60.1044 18.7436 59.6294 17.0811C58.9169 14.5082 57.2942 13.2217 54.7607 13.2217C53.2567 13.2217 52.0889 13.6769 51.2577 14.5874C49.9117 16.1311 49.2389 19.6738 49.2389 25.2156ZM55.0577 11.678C58.4617 11.678 61.3712 12.6082 63.7857 14.4686C66.9129 16.9624 68.4764 20.4259 68.4764 24.8591C68.4764 28.1841 67.4867 31.1134 65.5077 33.6466C62.8555 37.0113 59.1942 38.6936 54.5232 38.6936C51.1192 38.6936 48.1899 37.6644 45.7357 35.6061C42.6482 32.9936 41.1044 29.4509 41.1044 24.9781C41.1044 21.8113 42.0149 19.0405 43.8357 16.6655C46.4482 13.3405 50.1889 11.678 55.0577 11.678ZM93.2357 21.7124H110.336V23.3156H106.476V38.0999L99.2919 36.8531C96.6794 38.0406 93.7899 38.6341 90.6232 38.6341C86.6254 38.6341 83.0827 37.6644 79.9952 35.7249C74.8889 32.4394 72.3357 27.2541 72.3357 20.1686C72.3357 14.6665 73.9587 10.253 77.2044 6.92798C80.6087 3.5634 85.0222 1.8811 90.4452 1.8811C93.4534 1.8811 96.3232 2.45506 99.0544 3.60298L104.636 2.47485L104.873 15.0624H103.033C103.033 15.0228 103.033 14.9832 103.033 14.9436C101.528 7.46235 97.9462 3.72173 92.2857 3.72173C91.8107 3.72173 91.3357 3.74153 90.8607 3.7811C84.6462 4.45403 81.5389 9.99568 81.5389 20.4061C81.5389 23.8894 81.8555 26.8186 82.4889 29.1936C83.8742 34.2603 86.9817 36.7936 91.8107 36.7936C94.3044 36.7936 96.4617 36.0811 98.2827 34.6561V23.3156H93.2357V21.7124ZM121.439 25.2156C121.439 28.9363 121.676 31.6478 122.151 33.3499C122.864 35.8831 124.447 37.1499 126.901 37.1499C128.287 37.1499 129.415 36.7341 130.286 35.9031C131.79 34.3988 132.542 30.7571 132.542 24.9781C132.542 21.3759 132.304 18.7436 131.829 17.0811C131.117 14.5082 129.494 13.2217 126.961 13.2217C125.457 13.2217 124.289 13.6769 123.458 14.5874C122.112 16.1311 121.439 19.6738 121.439 25.2156ZM127.258 11.678C130.662 11.678 133.571 12.6082 135.986 14.4686C139.113 16.9624 140.676 20.4259 140.676 24.8591C140.676 28.1841 139.687 31.1134 137.708 33.6466C135.055 37.0113 131.394 38.6936 126.723 38.6936C123.319 38.6936 120.39 37.6644 117.936 35.6061C114.848 32.9936 113.304 29.4509 113.304 24.9781C113.304 21.8113 114.215 19.0405 116.036 16.6655C118.648 13.3405 122.389 11.678 127.258 11.678Z"
              fill="#221A1A"
            />
          </g>
        </svg>
      </div>
      <p className="w-[400px] text-[24px]">회원 유형 선택</p>
      <div className="h-[693px] w-[400px] my-10">
        {/* logo */}

        {/* 회원 유형 선택 */}
        <div className="w-[400px] flex justify-between gap-4 mb-8">
          {/* 일반 회원가입 */}
          <div
            onClick={() => handleSelect('user')}
            className={`flex flex-col items-center p-6 rounded-lg border w-full cursor-pointer ${
              userType === 'user' ? 'border-[#B3916A] bg-[#FDF9F4]' : 'border-gray-300'
            }`}
          >
            <MdPerson className="w-[48px] h-[52px] text-4xl mb-2 text-gray-600" />
            <p className="font-medium text-neutral-800 text-[24xp]">일반 회원가입</p>
            <p className={`text-xs mt-1 ${userType === 'user' ? 'text-[#B3916A]' : 'text-gray-500'}`}>
              만 19세 이상의 일반 회원
            </p>
          </div>

          {/* 사업자 회원가입 */}
          <div
            onClick={() => handleSelect('business')}
            className={`flex flex-col items-center p-6 rounded-lg border w-full cursor-pointer ${
              userType === 'business' ? 'border-[#B3916A] bg-[#FDF9F4]' : 'border-gray-300'
            }`}
          >
            <HiBuildingOffice className="w-[48px] h-[52px] text-4xl mb-2 text-gray-600" />
            <p className="font-medium text-neutral-800 text-[24xp]">사업자 회원가입</p>
            <p className={`text-xs mt-1 ${userType === 'business' ? 'text-[#B3916A]' : 'text-gray-500'}`}>
              사업체를 소지한 회원
            </p>
          </div>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className="w-[400px] bg-[#B3916A] font-bold text-white py-3 rounded-lg hover:bg-[#a37e5f] transition mb-8"
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
          <RxDividerVertical className="text-[22px] text-neutral-400" />
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
