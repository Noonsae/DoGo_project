'use client';

import { useState } from 'react';
import SignUpUser from './_components/SignUpUser';
import handleSignupAction from '../actions/handleSignupAction';
import Swal from 'sweetalert2';

export default function SignUpUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nickname, setNickname] = useState('');
  const [businessNumber, setBusinessNumber] = useState<string>('');
  const handleSignup = async () => {
    try {
      const result = await handleSignupAction({
        email,
        password,
        name,
        nickname,
        phone,
        role: 'user'
      });
      if (!result.success) {
        return;
      }
      await Swal.fire({
        icon: 'success',
        title: '회원가입 성공',
        text: `${name}님, 회원가입이 완료되었습니다!`
      });
      window.location.href = '/';
    } catch (err: any) {
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <SignUpUser
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        phone={phone}
        setPhone={setPhone}
        name={name}
        nickname={nickname || ''}
        setNickname={setNickname}
        setName={setName}
        error={error}
        setError={setError}
        handleSignup={handleSignup}
        setBusinessNumber={setBusinessNumber}
      />
    </div>
  );
}
