'use client';

import { useState } from 'react';
import handleSignupAction from '../actions/handleSignupAction';
import SignUpBusiness from './_components/SignUpBusiness';
import Swal from 'sweetalert2';

export default function SignUpBusinessPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nickname, setNickname] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');

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

      console.log(result); // 응답 확인

      if (!result.success) {
        // ✅ 중복 이메일 체크
        if (result.message === '이미 사용 중인 이메일입니다.') {
          await Swal.fire({
            icon: 'error',
            title: '회원가입 실패',
            text: '이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.'
          });
          return;
        }

        if (result.message === '이미 등록된 담당자 번호입니다.') {
          await Swal.fire({
            icon: 'error',
            title: '회원가입 실패',
            text: '이미 등록된 담당자 번호입니다. 다른 번호를 입력해주세요.'
          });
          return;
        }

        // ✅ 기타 오류 메시지 출력
        await Swal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: result.message || '회원가입에 실패했습니다.'
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
