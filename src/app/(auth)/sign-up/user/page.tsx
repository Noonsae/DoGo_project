'use client';

import { useState } from 'react';
import useAuthStore from '@/store/useAuth';
import SignUpUser from './_components/SignUpUser';
import handleSignupAction from '../actions/handleSignupAction';
import { browserSupabase } from '@/supabase/supabase-client';
import { useRouter } from 'next/navigation';
import SignupUserModal from '@/components/ui/sign-up/SignUpUserUi';
// import clap from '/images/clap.png';

//각페이지 별 임포트 순서는 추후에 진행될 예정입니다.

export default function SignUpUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nickname, setNickname] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const [isModlaOpen, setIsModalOpen] = useState(false);
  //
  const router = useRouter();
  const handleSignup = async () => {
    try {
      const supabase = browserSupabase(); //클라이언트 생성

      const result = await handleSignupAction({
        email,
        password,
        name,
        nickname,
        phone,
        role: 'user' // 역할 지정
      });

      if (!result.success) {
        setError(result.message);
        return;
      }
      //자동 로그인
      const { error: loinError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (loinError) {
        setError('로그인 중 오류가 발생했습니다.');
        return;
      }
      // store에 유저 정보 저장
      setUser({
        email,
        name,
        phone,
        role: 'user'
      });

      // Swal.fire('회원가입 성공!', result.message, 'success');

      setIsModalOpen(true);
    } catch (err: any) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error(err);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/');
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

      {/* 모달추가! */}
      <SignupUserModal isOpen={isModlaOpen} onClose={closeModal}>
        <div className="flex flex-col p-[40px 32px 32px 32px] items-center g-[32px]">
          <div>
            <img src="/images/clap.png" alt="clap" width={100} height={100} />
          </div>
          <div className="text-[28px] text-[#444] aligin-center">
            <p className="flex justify-center flex-row">환영합니다!</p>
            <p className="flex justify-center flex-row">회원가입이 완료되었습니다.</p>
          </div>
          <button
            className="bg-[#B3916A] text-white text-[20px] items-center p-[8px 24px] w-[436px] h-[48px] rounded-[8px]"
            onClick={closeModal}
          >
            확인
          </button>
        </div>
      </SignupUserModal>
    </div>
  );
}
