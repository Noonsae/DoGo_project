'use client';
import React, { useState } from 'react';

const Signin = () => {
  const [activeTab, setActiveTab] = useState('user');
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
          <input type="email" placeholder="이메일" style={{ display: 'block', marginBottom: '10px' }} />
          <input type="password" placeholder="비밀번호" style={{ display: 'block', marginBottom: '10px' }} />
          <button>로그인</button>
        </div>
      )}

      {activeTab === 'business' && (
        <div>
          <h2>사업자 회원 로그인</h2>
          <input type="email" placeholder="사업자 이메일" style={{ display: 'block', marginBottom: '10px' }} />
          <input type="password" placeholder="비밀번호" style={{ display: 'block', marginBottom: '10px' }} />
          <button>로그인</button>
        </div>
      )}
    </div>
  );
};

export default Signin;
