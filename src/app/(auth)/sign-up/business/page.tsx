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
  // const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  const handleSignup = async () => {
    try {
      // const supabase = browserSupabase(); // 클라이언트 생성

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
          text: result.message
        });
        return;
      }
      await Swal.fire({
        icon: 'success',
        title: '회원가입 성공',
        text: `${name}님, 회원가입이 완료되었습니다!`
      });
      // if (!result.success) {
      //   setError(result.message);
      //   return;
      // }
      // 서버액션을 쓰면 signInWithPassword 함수 안써도 돼서 지움
      // 자동 로그인
      // const { error: loginError } = await supabase.auth.signInWithPassword({
      //   email,
      //   password
      // });

      // if (loginError) {
      //   setError('로그인 중 오류가 발생했습니다.');
      //   return;
      // }

      // store에 유저 정보 저장
      // setUser({
      //   email,
      //   name,
      //   phone,
      //   role: 'business'
      // });
      // setIsModalOpen(true);
      window.location.href = '/';

      // 모달을 살리고 싶은데, 뭘해도 안됨.⭐
      // setTimeout(setIsModalOpen, 2000);
    } catch (err: any) {
      setError('회원가입 중 오류가 발생했습니다.');
      console.error(err);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    // window.location.href = '/';
    // router.push('/');
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
      {/* 모달추가! */}
      <SignupModal isOpen={isModlaOpen} onClose={closeModal}>
        <div className="flex flex-col p-[40px 32px 32px 32px] items-center g-[32px]">
          <div className="m-[32px]">
            <img src="/images/clap.png" alt="clap" width={100} height={100} />
          </div>
          <div className="text-[28px] text-[#444] aligin-center">
            <p className="flex justify-center flex-row">환영합니다!</p>
            <p className="flex justify-center flex-row">회원가입이 완료되었습니다.</p>
          </div>
          <button
            className="bg-[#B3916A] m-[32px] text-white items-center p-[8px 24px] w-[436px] h-[48px] rounded-[8px]"
            onClick={closeModal}
          >
            홈페이지로 이동하기
          </button>
        </div>
      </SignupModal>
    </div>
  );
}
