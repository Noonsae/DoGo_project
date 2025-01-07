'use client';

import { useState } from 'react';
import useAuthStore from '@/store/useAuth';
import Swal from 'sweetalert2';
import handleSignupAction from '../actions/handleSignupAction';
import { useRouter } from 'next/navigation';
import SignUpBusiness from './_components/sign-up-business';
import { browserSupabase } from '@/supabase/supabase-client';
export default function SignUpBusinessPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  const handleSignup = async () => {
    try {
      const supabase = browserSupabase(); // 클라이언트 생성

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

      // 자동 로그인
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (loginError) {
        setError('로그인 중 오류가 발생했습니다.');
        return;
      }

      // store에 유저 정보 저장
      setUser({
        email,
        name,
        phone,
        role: 'business'
      });

      Swal.fire('회원가입 성공!', '로그인 되었습니다.', 'success');

      // '/' 경로로 이동
      router.push('/');
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
