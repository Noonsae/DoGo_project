'use client';

import useAuthStore from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import KakaoSignIn from './KakaoSignIn';
import FindIdModal from './FindIdModal';
import FindPasswordModal from './FindPasswordModal';
import { browserSupabase } from '@/supabase/supabase-client';
import { RxDividerVertical } from 'react-icons/rx';
const Signin = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'business'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { setUser } = useAuthStore();
  const [isFindIdModalOpen, setIsFindIdModalOpen] = useState(false);
  const [isFindPasswordOpen, setFindPasswordOpen] = useState(false);
  // zustand 가져오기
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSignUp = () => {
    router.push('/sign-up');
  };
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        await Swal.fire({
          icon: 'warning',
          title: '입력 오류',
          text: '이메일과 비밀번호를 입력해주세요.'
        });
        return;
      }

      const supabase = browserSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        await Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '잘못된 이메일 또는 비밀번호입니다.'
        });
        return;
      }

      const { data: userTypeData, error: userTypeError } = await supabase
        .from(activeTab === 'user' ? 'users' : 'businesses')
        .select('id')
        .eq('email', email)
        .single();

      if (userTypeError || !userTypeData) {
        await Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: activeTab === 'user' ? '사업자 회원으로 로그인해주세요!' : '일반 회원으로 로그인해주세요!'
        });
        return;
      }

      setUser(data.user);
      document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/;`;

      // 로그인 성공 시 Swal 표시 후 페이지 이동
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
      <div className="justify-center items-center w-[400px]">
        <h1 className=" w-[400px] text-[40px] font-bold mb-[40px] text-center">DoGo</h1>
        <div className="flex justify-between mb-8 border-b-2">
          <button
            className={`pb-2 w-1/2 text-center ${
              activeTab === 'user' ? 'border-b-2 border-neutral-800' : 'text-neutral-600'
            }`}
            onClick={() => {
              setActiveTab('user');
              setEmail('');
              setPassword('');
            }}
          >
            일반 회원
          </button>
          <button
            className={`pb-2 w-1/2 text-center ${
              activeTab === 'business' ? 'border-b-2 border-black' : 'text-gray-400'
            }`}
            onClick={() => {
              setActiveTab('business');
              setEmail('');
              setPassword('');
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
            placeholder={activeTab === 'user' ? '일반 회원 이메일' : '사업자 이메일'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px]  p-3 border border-neutral-300 rounded-[8px] mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] p-3 border border-neutral-300 rounded-[8px] mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex w-[400px] justify-end text-sm text-gray-500 mb-4">
            <button type="button" onClick={() => setIsFindIdModalOpen(true)} className="m-[2px] hover:underline">
              아이디 찾기
            </button>
            <RxDividerVertical className="text-[22px] text-neutral-400" />
            <button type="button" onClick={() => setFindPasswordOpen(true)} className="hover:underline">
              비밀번호 찾기
            </button>
          </div>
          <button
            type="submit"
            className="w-[400px] bg-[#B3916A] font-bold text-white py-[15px] rounded-[8px] hover:bg-[#a37e5f] transition"
          >
            로그인
          </button>
        </form>
        <p className="w-[400px] p-[12px] flex justify-center text-neutral-600">
          이미 계정이 있으신가요?
          <button onClick={handleSignUp} className="text-[#534431] ml-3">
            {' '}
            회원가입
          </button>
        </p>
        <div className="w-[400px] flex items-center my-6">
          <hr className="flex-grow border-neutral-300" />
          <span className="px-4 text-sm text-neutral-400">간편 로그인</span>
          <hr className="flex-grow border-neutral-300" />
        </div>

        {isFindIdModalOpen && <FindIdModal onClose={() => setIsFindIdModalOpen(false)} />}
        {isFindPasswordOpen && <FindPasswordModal onClose={() => setFindPasswordOpen(false)} />}

        <div className="text-center mt-8">
          <KakaoSignIn />
        </div>
      </div>
    </div>
  );
};

export default Signin;
