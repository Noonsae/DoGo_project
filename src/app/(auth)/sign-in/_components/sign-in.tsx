'use client';

import useAuthStore from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import KakaoSignIn from './kakao-sign-in';
import FindIdModal from './find-id-modal';
import FindPasswordModal from './find-password-modal';
import { isLogined } from '@/utils/isLogin';
import { browserSupabase } from '@/supabase/supabase-client';

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
      const supabase = browserSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        Swal.fire({
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
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: activeTab === 'user' ? '사업자 회원으로 로그인해주세요!' : '일반 회원으로 로그인해주세요!'
        });
        return;
      }

      setUser(data.user);
      document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/;`;
      if (data?.user) {
        console.log('소셜 로그인 성공, 사용자 데이터:', data.user);
        setUser(data.user);
        Swal.fire({
          icon: 'success',
          title: '로그인 성공',
          text: `${data.user.email}님 환영합니다!`
        });
      } else {
        console.error('소셜 로그인 실패:', error);
        Swal.fire({
          icon: 'error',
          title: '서버 오류',
          text: '로그인에 실패했습니다. 다시 시도해주세요.'
        });
      }
    } catch (err) {
      console.error('예기치 않은 오류:', err);
    }

    router.push('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="justify-center items-center w-[400px]">
        <div className="flex justify-between mb-8">
          <button
            className={`pb-2 w-1/2 text-center ${activeTab === 'user' ? 'border-b-2 border-black' : 'text-gray-400'}`}
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
            <button type="button" onClick={() => setIsFindIdModalOpen(true)} className="hover:underline">
              아이디 찾기
            </button>
            <button type="button" onClick={() => setFindPasswordOpen(true)} className="hover:underline">
              비밀번호 찾기
            </button>
          </div>
          <button
            type="submit"
            className="w-[400px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
          >
            로그인
          </button>
        </form>

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
