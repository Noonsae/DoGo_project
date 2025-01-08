'use client';
import { login } from '@/app/api/sign-in/route';
import { useAuthState } from '@/utils/isLogin';
import { useRouter } from 'next/navigation';
// import { logout } from '@/app/api/sign-out/route';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Signin = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useAuthState();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('이메일과 비밀번호를 입력해주세요.');
        return;
      }

      console.log('Login Request Data:', { email, password }); // 디버깅 추가
      const response = await login({ email, password });

      if (!response || !response.user) {
        setError('로그인 응답 데이터가 없습니다.');
      }

      console.log('로그인 성공:', response); // 로그인 응답 확인

      // Zustand 상태 업데이트 및 알림 표시
      setAuth({ isAuthenticated: true, user: response.user });

      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: `${response.user.email}님 환영합니다!`,
        confirmButtonText: '확인'
      });
    } catch (err: any) {
      router.push('/sign-in');
      console.error('로그인 실패:', err.message);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');

      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: '로그인에 실패했습니다. 다시 시도해주세요.',
        confirmButtonText: '확인'
      });
    }
  };

  //로그아웃
  //  const handleLogout = async () => {
  //   try {
  //     await logout();
  //     setAuth({ isAuthenticated: false, user: null });
  //     console.log('로그아웃 성공');
  //   } catch (err: any) {
  //     console.error('로그아웃 실패:', err.message);
  //   }
  // };
  const handleSignUpRoute = () => {
    if (activeTab === 'user') {
      router.push('/sign-up/user');
    } else if (activeTab === 'business') {
      router.push('/sign-up/business');
    } else {
      console.error('activeTab 값이 올바르지 않습니다:', activeTab);
    }
  };
  const handleKakaoLogin = () => {
    const redirectTo = `https://dsggwbvtcrwuopwelpxy.supabase.co/auth/v1/authorize?provider=kakao`; // Supabase OAuth URL
    window.location.href = redirectTo;
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-8 bg-white  rounded-lg w-[400px]">
        <div className="flex justify-between mb-8">
          <button
            className={`pb-2 w-1/2 text-center ${activeTab === 'user' ? 'border-b-2 border-black' : 'text-gray-400'}`}
            onClick={() => setActiveTab('user')}
          >
            일반 회원
          </button>
          <button
            className={`pb-2 w-1/2 text-center ${
              activeTab === 'business' ? 'border-b-2 border-black' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('business')}
          >
            사업자 회원
          </button>
        </div>

        {activeTab === 'user' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="email"
              placeholder="이메일"
              value={email}
              className="w-[378px] p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              className="w-[378px] p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <button>아이디 찾기</button>
              <button>비밀번호 찾기</button>
            </div>
            <button className="w-[378px] bg-[#7C7C7C] text-white py-2 rounded-lg hover:bg-[#a0a0a0] transition">
              로그인
            </button>
            <div className="text-center mt-4 w-[378px]">
              <span className="text-gray-500">계정이 없으신가요? </span>
              <button className="text-black font-semibold underline" onClick={handleSignUpRoute}>
                회원가입
              </button>
            </div>
            <div className="text-center mt-8 w-[378px]">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-gray-500">간편 로그인</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <button
                className="w-full bg-[#FEE500] text-black py-2 rounded-lg flex justify-center items-center gap-2 hover:text-gray-500 transition"
                onClick={handleKakaoLogin}
              >
                <span className="flex items-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#FEE500" />
                    <g opacity="0.9">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.0053 12C16.639 12 10.666 16.6391 10.666 22.3528C10.666 25.9099 12.9782 29.0446 16.4908 30.9121L15.0087 36.3442C14.8753 36.8259 15.4237 37.2112 15.8461 36.9296L22.3305 32.624C22.8789 32.6759 23.4347 32.7055 23.9979 32.7055C31.3641 32.7055 37.3371 28.0664 37.3371 22.3528C37.3371 16.6391 31.3715 12 24.0053 12Z"
                        fill="black"
                      />
                    </g>
                  </svg>
                  카카오톡으로 시작하기
                </span>
              </button>
            </div>
            <div className="w-[378px] text-center mt-4 text-sm text-gray-400">
              <button>개인정보처리방침</button>
              <span className="mx-2">|</span>
              <button>이용약관</button>
            </div>
          </form>
        )}

        {/* 사업자 회원 */}
        {activeTab === 'business' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="email"
              placeholder="사업자 이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[378px] p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[378px] p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <button type="button">아이디 찾기</button>
              <button type="button">비밀번호 찾기</button>
            </div>
            <button
              type="submit"
              className="w-[378px] bg-[#7C7C7C] text-white py-2 rounded-lg hover:bg-[#a0a0a0] transition"
            >
              로그인
            </button>
            <div className="text-center mt-4 w-[378px]">
              <span className="text-gray-500">계정이 없으신가요? </span>
              <button type="button" className="text-black font-semibold underline" onClick={handleSignUpRoute}>
                회원가입
              </button>
            </div>
            <div className="text-center mt-8 w-[378px]">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-gray-500">간편 로그인</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <button
                type="button"
                onClick={handleKakaoLogin}
                className="w-full bg-[#FEE500] text-black py-2 rounded-lg flex justify-center items-center gap-2 hover:text-gray-500 transition"
              >
                <span className="flex items-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#FEE500" />
                    <g opacity="0.9">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.0053 12C16.639 12 10.666 16.6391 10.666 22.3528C10.666 25.9099 12.9782 29.0446 16.4908 30.9121L15.0087 36.3442C14.8753 36.8259 15.4237 37.2112 15.8461 36.9296L22.3305 32.624C22.8789 32.6759 23.4347 32.7055 23.9979 32.7055C31.3641 32.7055 37.3371 28.0664 37.3371 22.3528C37.3371 16.6391 31.3715 12 24.0053 12Z"
                        fill="black"
                      />
                    </g>
                  </svg>
                  카카오톡으로 시작하기
                </span>
              </button>
            </div>
            <div className="w-[378px] text-center mt-4 text-sm text-gray-400">
              <button type="button">개인정보처리방침</button>
              <span className="mx-2">|</span>
              <button type="button">이용약관</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signin;
