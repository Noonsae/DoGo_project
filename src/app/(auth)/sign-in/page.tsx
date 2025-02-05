'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { login } from './actions/login';
import Swal from 'sweetalert2';
import DividerIcon from '@/components/ui/icon/DividerIcon';
import FindIdModal from './_components/FindIdModal';
import FindPasswordModal from './_components/FindPasswordModal/FindPasswordModal';
import KakaoSignIn from './_components/KakaoSignIn';
import LogoAuth from '@/components/ui/icon/LogoAuth';

const SignInPage = () => {
  const [form, setForm] = useState({
    activeTab: 'user',
    email: '',
    password: '',
    isFindIdModalOpen: false,
    isFindPasswordOpen: false
  });
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleLogin = async () => {
    try {
      if (!form.email || !form.password) {
        await Swal.fire({
          icon: 'warning',
          title: '입력 오류',
          text: '이메일과 비밀번호를 입력해주세요.'
        });
        return;
      }
      let role = form.activeTab;
      if (form.email === 'admin01@qwe.com') {
        role = 'admin';
      }
      const { data, error } = await login({
        email: form.email,
        password: form.password,
        role: role
      });

      if (error || !data) {
        await Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '잘못된 이메일, 비밀번호 또는 역할입니다.'
        });
        return;
      }
      await Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: `${data.user?.email}님 환영합니다!`
      });

      window.location.href = '/';
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: '예기치 않은 오류가 발생했습니다. 다시 시도해주세요.'
      });
    }
  };

  return (
    <>
      {form.isFindIdModalOpen && <FindIdModal onClose={() => setForm({ ...form, isFindIdModalOpen: false })} />}
      {form.isFindPasswordOpen && <FindPasswordModal onClose={() => setForm({ ...form, isFindPasswordOpen: false })} />}
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[400px] lg:h-auto">
          <div className="flex justify-center mt-[140px]">
            <LogoAuth className="w-[74px] h-[21px] sm:w-[139.947px] sm:h-[36.813px]" />
          </div>

          <div className="flex justify-between mb-[40px] border-b-2 ">
            <button
              className={`pb-2 w-1/2 text-center ${
                form.activeTab === 'user' ? ' border-b-2 border-neutral-800  ' : 'text-neutral-400'
              }`}
              onClick={() => setForm({ ...form, activeTab: 'user', email: '', password: '' })}
            >
              일반 회원
            </button>
            <button
              className={`pb-2 w-1/2 text-center ${
                form.activeTab === 'business' ? 'border-b-2 border-neutral-800' : 'text-neutral-400'
              }`}
              onClick={() => setForm({ ...form, activeTab: 'business', email: '', password: '' })}
            >
              사업자 회원
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="email"
              placeholder={form.activeTab === 'user' ? '일반 회원 이메일' : '사업자 이메일'}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full sm:w-[400px] h-[48px] pt-[8px] pb-[8px] px-[16px] border border-neutral-300 rounded-[8px] mb-[12px] focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full sm:w-[400px] h-[48px] pt-[8px] pb-[8px] px-[16px] border border-neutral-300 rounded-[8px] mb-[12px] focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="flex items-center justify-end text-sm text-gray-500 mb-4">
              <button
                type="button"
                onClick={() => setForm({ ...form, isFindIdModalOpen: true })}
                className="m-[2px] hover:underline"
              >
                아이디 찾기
              </button>
              <DividerIcon />
              <button
                type="button"
                onClick={() => setForm({ ...form, isFindPasswordOpen: true })}
                className="hover:underline"
              >
                비밀번호 재설정
              </button>
            </div>
            <button
              type="submit"
              className="w-full max-w-[400px] text-[20px] bg-[#B3916A] font-pretendard font-semibold leading-[135%] not-italic text-white py-3 rounded-lg hover:bg-[#a37e5f] transition mb-[12px] sm:mb-[16px]"
            >
              로그인
            </button>
          </form>
          <p className=" w-full sm:w-[400px] p-[12px] flex justify-center text-neutral-600">
            계정이 없으신가요?
            <button onClick={handleSignUp} className="text-[#534431] ml-3 font-semibold">
              회원가입
            </button>
          </p>
          {form.activeTab === 'user' && (
            <>
              <div className="w-full sm:w-[400px] flex items-center my-6">
                <hr className="flex-grow border-neutral-300" />
                <span className="px-4 text-sm text-neutral-400">간편 로그인</span>
                <hr className="flex-grow border-neutral-300" />
              </div>

              <div className="text-center mt-8">
                {form.activeTab === 'user' ? <KakaoSignIn /> : <div className="min-h-[50px] invisible"></div>}
                <div className="flex w-full max-w-[400px] justify-center items-center text-sm text-gray-500 mt-4">
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
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SignInPage;
