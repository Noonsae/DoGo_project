'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import KakaoSignIn from '../sign-in/_components/kakao-sign-in';
import { HiBuildingOffice } from 'react-icons/hi2';
import { MdPerson } from 'react-icons/md';
const Page = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null); // 선택된 회원 유형 상태

  const handleSelect = (type: string) => {
    setUserType(type);
  };

  const handleNext = () => {
    if (userType === 'business') {
      router.push('/sign-up/business');
    } else if (userType === 'user') {
      router.push('/sign-up/user');
    } else {
      alert('회원 유형을 선택해주세요!'); // 선택 안 했을 경우 경고
    }
  };
  const handleSignIn = () => {
    router.push('/sign-in');
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="p-8 h-[693px] w-[400px]">
        {/* 로고와 상단 텍스트 */}
        <div>
          <h1 className="text-4xl font-bold mb-8 text-center mt-[65px]">DoGo</h1>
          <p className=" text-lg font-semibold mb-6">회원 유형 선택</p>
        </div>

        {/* 회원 유형 선택 */}
        <div className="w-[400px] flex justify-between gap-4 mb-8">
          {/* 일반 회원가입 */}
          <div
            onClick={() => handleSelect('user')}
            className={`flex flex-col items-center p-6 rounded-lg border w-full cursor-pointer ${
              userType === 'user' ? 'border-[#B3916A] bg-[#FAF8F6]' : 'border-gray-300'
            }`}
          >
            <MdPerson className="w-[48px] h-[52px] text-4xl mb-2 text-gray-600" />
            <p className="font-medium text-sm">일반 회원가입</p>
            <p className="text-xs text-gray-500 mt-1">만 19세 이상의 일반 회원</p>
          </div>

          {/* 사업자 회원가입 */}
          <div
            onClick={() => handleSelect('business')}
            className={`flex flex-col items-center p-6 rounded-lg border w-full cursor-pointer ${
              userType === 'business' ? 'border-[#B3916A] bg-[#FAF8F6]' : 'border-gray-300'
            }`}
          >
            <HiBuildingOffice className="w-[48px] h-[52px] text-4xl mb-2 text-gray-600" />
            <p className="font-medium text-sm">사업자 회원가입</p>
            <p className="text-xs text-gray-500 mt-1">사업체를 소지한 회원</p>
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
          <span className="px-4 text-sm text-gray-500">간편 회원가입</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* 카카오 로그인 */}
        <KakaoSignIn />

        {/* 하단 링크 */}
        <div className="w-[400px] mt-6 text-center text-sm text-gray-500">
          <button className="underline">개인정보처리방침</button> | <button className="underline">이용약관</button>
        </div>
      </div>
    </div>
  );
};

export default Page;

//
