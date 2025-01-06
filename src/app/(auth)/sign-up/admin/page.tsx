'use client';
import useAuthStore from '@/store/useAuth';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SignUpAdminPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [admin_name, setAdminName] = useState('');
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  // const handleSignup = async () => {
  //   try {
  //     const response = await fetch('/api/sign-up/admin', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password, admin_name, phone }) // 필드 이름 수정
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setError(errorData.error || '회원가입 실패!');
  //       return;
  //     }

  //     const result = await response.json();
  //     console.log('Success Response:', result); // 성공 응답 확인
  //     setUser(result.user); // Zustand 상태 업데이트
  //     Swal.fire('회원가입 성공!', '', 'success');
  //   } catch (err) {
  //     console.error('Fetch Error:', err);
  //     setError('서버와 통신 중 문제가 발생했습니다.');
  //   }
  // };
  const handleSignup = async () => {
    try {
      // API 요청 보내기
      const response = await fetch('/api/sign-up/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, admin_name, phone })
      });

      // 응답 처리
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || '회원가입 실패!');
        return;
      }

      const result = await response.json();
      console.log('Success Response:', result); // 성공 응답 확인
      Swal.fire('회원가입 성공!', '', 'success');
    } catch (err) {
      console.error('Fetch Error:', err); // 네트워크 또는 기타 에러
      setError('서버와 통신 중 문제가 발생했습니다.');
    }
  };
  return (
    <div>
      <h1>관리자 회원가입</h1>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="이름" value={admin_name} onChange={(e) => setAdminName(e.target.value)} />
      <input type="text" placeholder="휴대폰번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleSignup}>회원가입!</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignUpAdminPage;
