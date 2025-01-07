'use client';

import { useState } from 'react';
import useAuthStore from '@/store/useAuth';
import Swal from 'sweetalert2';
import SignUpUser from './_components/sign-up-user';
import handleSignupAction from '../actions/handleSignupAction';

export default function SignUpUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nickname, setNickname] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignup = async () => {
    try {
      const result = await handleSignupAction({
        email,
        password,
        name,
        phone,
        role: 'user' // 역할 지정
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      // store에 유저 정보 저장
      setUser({
        email,
        name,
        phone,
        role: 'user'
      });

      Swal.fire('회원가입 성공!', result.message, 'success');
    } catch (err: any) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error(err);
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
        nickname={nickname}
        setNickname={setNickname}
        setName={setName}
        error={error}
        setError={setError}
        handleSignup={handleSignup}
      />
    </div>
  );
}
