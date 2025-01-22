'use client';

import { browserSupabase } from '@/supabase/supabase-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useAuthStore from '@/store/useAuth';
import Swal from 'sweetalert2';
import KakaoSignIn from './KakaoSignIn';
import FindIdModal from './FindIdModal';
import FindPasswordModal from './FindPasswordModal';
import DividerIcon from '@/components/ui/icon/DividerIcon';
const Signin = () => {
  const [form, setForm] = useState({
    activeTab: 'user',
    email: '',
    password: '',
    isFindIdModalOpen: false,
    isFindPasswordOpen: false
  });
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
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

      const supabase = browserSupabase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      });

      if (error || !data.user) {
        await Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '잘못된 이메일 또는 비밀번호입니다.'
        });
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, role')
        .eq('email', form.email)
        .single();

      if (userError || !userData) {
        await Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '사용자 정보를 가져오지 못했습니다.'
        });
        return;
      }

      if (userData.role !== form.activeTab) {
        await Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: form.activeTab === 'user' ? '일반 회원 계정으로 로그인해주세요!' : '사업자 계정으로 로그인해주세요!'
        });
        return;
      }

      setUser(data.user);
      document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/;`;

      await Swal.fire({
        icon: 'success',
        title: '로그인 성공',
        text: `${data.user.email}님 환영합니다!`
      });

      router.push('/');
    } catch (err) {
      console.error('예기치 않은 오류:', err);
      await Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: '예기치 않은 오류가 발생했습니다. 다시 시도해주세요.'
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="justify-center items-center w-[400px] h-[637px]">
        <h1 className="text-[40px] font-bold mb-[40px] text-center">DoGo</h1>
        <div className="flex justify-between mb-8 border-b-2">
          <button
            className={`pb-2 w-1/2 text-center ${
              form.activeTab === 'user' ? 'border-b-2 border-neutral-800' : 'text-neutral-600'
            }`}
            onClick={() => {
              setForm((prevForm) => ({
                ...prevForm,
                activeTab: 'user',
                email: '',
                password: ''
              }));
            }}
          >
            일반 회원
          </button>
          <button
            className={`pb-2 w-1/2 text-center ${
              form.activeTab === 'business' ? 'border-b-2 border-black' : 'text-gray-400'
            }`}
            onClick={() => {
              setForm({
                ...form,
                activeTab: 'business',
                email: '',
                password: ''
              });
            }}
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
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                email: e.target.value
              }))
            }
            className="w-[400px]  p-3 border border-neutral-300 rounded-[8px] mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                password: e.target.value
              }))
            }
            className="w-[400px] p-3 border border-neutral-300 rounded-[8px] mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex w-[400px] justify-end text-sm text-gray-500 mb-4">
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  isFindIdModalOpen: true
                })
              }
              className="m-[2px] hover:underline"
            >
              아이디 찾기
            </button>
            <DividerIcon />

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  isFindPasswordOpen: true
                })
              }
              className="hover:underline"
            >
              비밀번호 찾기
            </button>
          </div>
          <button
            type="submit"
            className="w-[400px]  bg-[#B3916A] font-bold text-white py-[15px] rounded-[8px] hover:bg-[#a37e5f] transition"
          >
            로그인
          </button>
        </form>
        <p className="w-[400px] p-[12px] flex justify-center text-neutral-600">
          이미 계정이 있으신가요?
          <button onClick={handleSignUp} className="text-[#534431] ml-3 font-semibold">
            회원가입
          </button>
        </p>
        <div className="w-[400px] flex items-center my-6">
          <hr className="flex-grow border-neutral-300" />
          <span className="px-4 text-sm text-neutral-400">간편 로그인</span>
          <hr className="flex-grow border-neutral-300" />
        </div>

        {form.isFindIdModalOpen && (
          <FindIdModal
            onClose={() =>
              setForm((prevForm) => ({
                ...prevForm,
                setIsFindIdModalOpen: false
              }))
            }
          />
        )}
        {form.isFindPasswordOpen && (
          <FindPasswordModal
            onClose={() =>
              setForm((prevForm) => ({
                ...prevForm,
                setFindPasswordOpen: false
              }))
            }
          />
        )}

        <div className="text-center mt-8">
          <KakaoSignIn />
        </div>
        <div className="flex w-[400px] justify-center text-sm text-gray-500 mt-4">
          <button
            type="button"
            className="m-[2px] hover:underline"
            onClick={() => window.open('https://www.kakao.com/policy/privacy', '_blank')}
          >
            개인정보처리방침
          </button>
          <DividerIcon />

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

export default Signin;
