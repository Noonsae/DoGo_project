'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const handleSignup = async () => {
    try {
      // 회원가입 시 자동 로그인
      const result = await handleSignupAction({
        email,
        password,
        name,
        nickname,
        phone,
        role: 'user'
      });
      if (!result.success) {
        await Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: '모두 입력해주세요!'
        });
        return;
      }
      await Swal.fire({
        icon: 'success',
        title: '회원가입 성공',
        text: `${name}님, 회원가입이 완료되었습니다!`
      });
      // commit용 주석
      // const { error: loinError } = await supabase.auth.signInWithPassword({
      //   email,
      //   password
      // });
      // if (loinError) {
      //   setError('로그인 중 오류가 발생했습니다.');
      //   return;
      // }

      // TODO: 나중에 자동으로 처리하도록 수정할 예정
      // setUser({
      //   email,
      //   name,
      //   phone,
      //   role: 'user'
      // });

      // setIsModalOpen(true);
      // setTimeout(() => setIsModalOpen(), 1000);
      // TODO: 서버측에서 로그인을 시도할 예정 -> Header에서 인식 X
      // router.push('/');
      window.location.href = '/';
    } catch (err: any) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error(err);
    }
  };
  const closeModal = async () => {
    setIsModalOpen(false);
    // await router.push('/');
    // console.log('??');
    // window.location.href = '/';
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
