'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import handleSignupAction from '../actions/handleSignupAction';
import SignUpBusiness from './_components/SignUpBusiness';
import SignupModal from '@/components/ui/sign-up/SignUpUi';
import Swal from 'sweetalert2';

export default function SignUpBusinessPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nickname, setNickname] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [isModlaOpen, setIsModalOpen] = useState(false);

  const handleSignup = async () => {
    try {
      const result = await handleSignupAction({
        email,
        password,
        name,
        phone,
        businessNumber,
        nickname,
        role: 'business'
      });
      console.log({ result });
      if (!result.success) {
        await Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: '모두 작성해주세요!'
        });
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
      console.error(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        nickname={nickname}
        businessNumber={businessNumber}
        setBusinessNumber={setBusinessNumber}
        error={error}
        setNickname={setNickname}
        setError={setError}
        handleSignup={handleSignup}
      />
    </div>
  );
}
