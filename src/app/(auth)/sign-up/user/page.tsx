'use client';

import { startTransition, useState } from 'react';
import SignUpUser from './_components/SignUpUser';
import handleSignupAction from '../actions/handleSignupAction';
import SignupUserModal from '@/components/ui/sign-up/SignUpUi';
import Swal from 'sweetalert2';

export default function SignUpUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nickname, setNickname] = useState('');
  const [isModlaOpen, setIsModalOpen] = useState(false);
  const [businessNumber, setBusinessNumber] = useState<string>('');
  const handleSignup = async () => {
    startTransition(async () => {
      // ✅ 서버 액션 실행
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
          setError(result.message);
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
    });
    // try {
    //   const result = await handleSignupAction({
    //     email,
    //     password,
    //     name,
    //     nickname,
    //     phone,
    //     role: 'user'
    //   });
    //   if (!result.success) {
    //     return;
    //   }
    //   await Swal.fire({
    //     icon: 'success',
    //     title: '회원가입 성공',
    //     text: `${name}님, 회원가입이 완료되었습니다!`
    //   });
    //   window.location.href = '/';
    // } catch (err: any) {
    //   setError('회원가입 중 오류가 발생했습니다.');
    // }
  };
  const closeModal = async () => {
    setIsModalOpen(false);
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

      <SignupUserModal isOpen={isModlaOpen} onClose={closeModal}>
        <div className="flex flex-col p-[40px 32px 32px 32px] items-center g-[32px]">
          <div className="m-[32px]">
            <img src="/images/clap.png" alt="clap" width={100} height={100} />
          </div>
          <div className="text-[28px] text-[#444] aligin-center">
            <p className="flex justify-center flex-row">환영합니다!</p>
            <p className="flex justify-center flex-row">회원가입이 완료되었습니다.</p>
          </div>
          <button
            className="bg-[#B3916A] text-white text-[20px] items-center m-[32px] p-[8px 24px] w-[436px] h-[48px] rounded-[8px]"
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      </SignupUserModal>
    </div>
  );
}
