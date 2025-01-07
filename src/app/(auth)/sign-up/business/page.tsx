'use client';

import { useState } from 'react';
import useAuthStore from '@/store/useAuth';
import Swal from 'sweetalert2';
import handleSignupAction from '../actions/handleSignupAction';
import SignUpBusiness from './_components/sign-up-business';

export default function SignUpBusinessPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [error, setError] = useState('');

  const setUser = useAuthStore((state) => state.setUser);

  const handleSignup = async () => {
    try {
      const result = await handleSignupAction({
        email,
        password,
        name,
        phone,
        business_number: businessNumber,
        role: 'business'
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
        role: 'business'
      });

      Swal.fire('회원가입 성공!', result.message, 'success');
    } catch (err: any) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div>
      <SignUpBusiness
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        phone={phone}
        setPhone={setPhone}
        name={name}
        setName={setName}
        businessNumber={businessNumber}
        setBusinessNumber={setBusinessNumber}
        error={error}
        setError={setError}
        handleSignup={handleSignup}
      />
    </div>
  );
}
