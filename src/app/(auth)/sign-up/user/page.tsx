'use client';
import useAuthStore from '@/store/useAuth';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import handleSignupAction from '../actions/handleSignupAction';
import SignUpUser from './_components/sign-up-user';

const SignUpUserPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [customer_name, setCustomer_name] = useState('');
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  let debounceTimer: NodeJS.Timeout;

  const handleSignup = async () => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      try {
        const result = await handleSignupAction({
          email,
          password,
          name: customer_name,
          phone,
          role: 'user'
        });

        Swal.fire('회원가입 성공!', result.message, 'success');
        setUser({ email, customer_name, phone, role: 'user' });
      } catch (err: any) {
        console.error('Signup Error:', err.message);
        setError(err.message || '회원가입 실패!');
      }
    }, 500); // 500ms 디바운스
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
        name={customer_name}
        setName={setCustomer_name}
        error={error}
        handleSignup={handleSignup}
      />
    </div>
  );
};

export default SignUpUserPage;
