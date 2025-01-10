'use client';

import useAuthStore from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { browserSupabase } from '@/supabase/supabase-client';
import KakaoSignIn from './kakao-sign-in';
import FindIdModal from './find-id-modal';

const Signin = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuthStore();
  const [isFindIdModalOpen, setIsFindIdModalOpen] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState<'user' | 'business'>('user');

  const openFindIdModal = (tab: 'user' | 'business') => {
    setModalActiveTab(tab);
    setIsFindIdModalOpen(true);
  };
  const closeFindIdModal = () => setIsFindIdModalOpen(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Swal.fire({
          icon: 'warning',
          title: '입력 오류',
          text: '이메일과 비밀번호를 입력해주세요.'
        });
        return;
      }

      const { data, error } = await browserSupabase().auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '잘못된 이메일 또는 비밀번호입니다.'
        });
        return;
      }

      setUser(data.user);
      document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/;`;

      Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: `${data.user.email}님 환영합니다!`
      });

      router.push('/');
    } catch (err) {
      console.error('로그인 실패:', err.message);
      Swal.fire({
        icon: 'error',
        title: '서버 오류',
        text: '로그인에 실패했습니다. 다시 시도해주세요.'
      });
    }
  };

  const handleSignUpRoute = () => {
    if (activeTab === 'user') {
      router.push('/sign-up/user');
    } else if (activeTab === 'business') {
      router.push('/sign-up/business');
    }
  };

  const findId = () => {
    router.push('/find-id');
  };
  const findPassword = () => {
    router.push('/find-password');
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      {/* <div className="flex justify-center items-center min-h-screen "> */}
      <div className="justify-center items-center w-[400px]">
        {/* <div className="justify-center items-center w-[400px]"> */}
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
          <>
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
                className="w-[400px] p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                className="w-[400px] p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <button type="button" onClick={openFindIdModal} className="hover:underline">
                  아이디 찾기
                </button>
                <button type="button" onClick={findPassword} className="hover:underline">
                  비밀번호 찾기
                </button>
              </div>
              <button className="w-[400px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition">
                로그인
              </button>
              <div className="text-center mt-4 w-[400px]">
                <span className="text-gray-500">계정이 없으신가요? </span>
                <button className="text-black font-semibold underline" onClick={handleSignUpRoute}>
                  회원가입
                </button>
              </div>
            </form>
            {isFindIdModalOpen && <FindIdModal onClose={closeFindIdModal} />}
            {/* 간편 로그인 버튼 (form 태그 바깥) */}
            <div className="text-center mt-8 w-[400px]">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-gray-500">간편 로그인</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <KakaoSignIn />
            </div>
            <div className="w-[400px] text-center mt-4 text-sm text-gray-400">
              <button>개인정보처리방침</button>
              <span className="mx-2">|</span>
              <button>이용약관</button>
            </div>
          </>
        )}

        {/* 사업자 회원 */}
        {activeTab === 'business' && (
          <>
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
                className="w-[400px] p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[400px] p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <button type="button" onClick={openFindIdModal} className="hover:underline">
                  아이디 찾기
                </button>
                <button type="button" onClick={findPassword} className="hover:underline">
                  비밀번호 찾기
                </button>
              </div>
              <button
                type="submit"
                className="w-[400px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
              >
                로그인
              </button>
              <div className="text-center mt-4 w-[400px]">
                <span className="text-gray-500">계정이 없으신가요? </span>
                <button type="button" className="text-black font-semibold underline" onClick={handleSignUpRoute}>
                  회원가입
                </button>
              </div>
            </form>
            {isFindIdModalOpen && <FindIdModal onClose={closeFindIdModal} />}
            {/* 간편 로그인 버튼 (form 태그 바깥) */}
            <div className="text-center mt-8 w-[400px]">
              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-4 text-gray-500">간편 로그인</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <KakaoSignIn />
            </div>
            <div className="w-[400px] text-center mt-4 text-sm text-gray-400">
              <button type="button">개인정보처리방침</button>
              <span className="mx-2">|</span>
              <button type="button">이용약관</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signin;
