'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function SignUpBusinessPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/sign-up/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, phone })
      });

      const result = await response.json();
      if (!result.success) {
        setError(result.message);
        return;
      }

      Swal.fire('회원가입 성공!', result.message, 'success');
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Business 회원가입</h1>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="사업자 등록 번호" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="tel" placeholder="전화번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleSignup}>회원가입</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
