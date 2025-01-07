'use client';
import { login } from '@/app/api/sign-in/route';
import { useAuthState } from '@/utils/isLogin';
// import { logout } from '@/app/api/sign-out/route';

import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Signin = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useAuthState();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('이메일과 비밀번호를 입력해주세요.');
        return;
      }

      console.log('Login Request Data:', { email, password }); // 디버깅 추가
      const response = await login({ email, password });

      if (!response || !response.user) {
        throw new Error('로그인 응답 데이터가 없습니다.');
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

  return (
    <div className="flex justify-center items-center">
      <div className="p-[150px] bg-white  rounded-lg">
        <div>
          <button onClick={() => setActiveTab('user')}>일반 회원</button>
          <button onClick={() => setActiveTab('business')}>사업자 회원</button>
        </div>

        {activeTab === 'user' && (
          <div>
            <h2 className="mb-2">일반 회원 로그인</h2>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <button>아이디찾기 | </button>
              <button> 비밀번호찾기</button>
            </div>
            <button onClick={handleLogin}>로그인</button>
            <div>
              <div>계정이 없으신가요?</div>
              <button>회원가입</button>
            </div>

            <p className="mb-2">간편로그인</p>
            <button>카카오톡으로 시작하기</button>
            <button>개인정보처리방침</button>
            <button>이용약관</button>
          </div>
        )}

        {activeTab === 'business' && (
          <div>
            <h2 className="mb-2">사업자 회원 로그인</h2>
            <input
              type="email"
              placeholder="사업자 이메일"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input type="password" placeholder="비밀번호" className="w-full p-2 border border-gray-300 rounded mb-4" />
            <div>
              <button>아이디찾기 | </button>
              <button> 비밀번호찾기</button>
            </div>
            <button>로그인</button>
            <div>
              <div>계정이 없으신가요?</div>
              <button>회원가입</button>
            </div>

            <p className="mb-2">간편로그인</p>
            <button>카카오톡으로 시작하기</button>
            <button>개인정보처리방침</button>
            <button>이용약관</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
