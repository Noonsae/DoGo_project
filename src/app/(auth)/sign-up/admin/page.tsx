'use client';
import useAuthStore from '@/store/useAuth';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import handleSignupAction from '../actions/handleSignupAction';
import SignUpAdmin from './_components/sign-up-admin';

const SignUpAdminPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [admin_name, setAdminName] = useState('');
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignup = async () => {
    try {
      const result = await handleSignupAction({
        email,
        password,
        name: admin_name,
        phone,
        role: 'admin'
      });

      Swal.fire('회원가입 성공!', result.message, 'success');
      setUser({
        email,
        admin_name,
        phone,
        role: 'admin'
      });
      Swal.fire('회원가입 성공!', '', 'success');
    } catch (err: any) {
      console.error('Signup Error:', err.message);
      setError(err.message || '회원가입 실패!');
    }
  };
  return (
    <div>
      <SignUpAdmin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        phone={phone}
        setPhone={setPhone}
        admin_name={admin_name}
        setAdminName={setAdminName}
        error={error}
        handleSignup={handleSignup}
      />
    </div>
  );
};

export default SignUpAdminPage;
