'use client';
import { login } from '@/app/api/sign-in/route';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Signin = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('이메일과 비밀번호를 입력해주세요.');
        return;
      }

      await login({ email, password });
    } catch (err: any) {
      console.error('로그인 실패:', err.message);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
    Swal.fire('회원가입 성공!', 'success');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          style={{
            borderBottom: activeTab === 'user' ? '2px solid black' : 'none',
            marginRight: '20px',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('user')}
        >
          일반 회원
        </button>
        <button
          style={{
            borderBottom: activeTab === 'business' ? '2px solid black' : 'none',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('business')}
        >
          사업자 회원
        </button>
      </div>

      {activeTab === 'user' && (
        <div>
          <h2>일반 회원 로그인</h2>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', marginBottom: '10px' }}
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

          <p>간편로그인</p>
          <button>카카오톡으로 시작하기</button>
          <button>개인정보처리방침</button>
          <button>이용약관</button>
        </div>
      )}

      {activeTab === 'business' && (
        <div>
          <h2>사업자 회원 로그인</h2>
          <input type="email" placeholder="사업자 이메일" style={{ display: 'block', marginBottom: '10px' }} />
          <input type="password" placeholder="비밀번호" style={{ display: 'block', marginBottom: '10px' }} />
          <div>
            <button>아이디찾기 | </button>
            <button> 비밀번호찾기</button>
          </div>
          <button>로그인</button>
          <div>
            <div>계정이 없으신가요?</div>
            <button>회원가입</button>
          </div>

          <p>간편로그인</p>
          <button>카카오톡으로 시작하기</button>
          <button>개인정보처리방침</button>
          <button>이용약관</button>
        </div>
      )}
    </div>
  );
};

export default Signin;
