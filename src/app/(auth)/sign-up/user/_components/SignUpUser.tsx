import React, { useState } from 'react';
import { SignUpProps } from '@/types/supabase/supabase-sign-up-type';
import { useRouter } from 'next/navigation';
import LogoAuth from '@/components/ui/icon/LogoAuth';
import handleSignupAction from '../../actions/handleSignupAction';
import Swal from 'sweetalert2';
import InputField from './InputField';
const SignUpUser = ({
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  nickname,
  setNickname,
  name,
  setName,
  handleSignup
}: SignUpProps) => {
  const [form, setForm] = useState({
    confirmPassword: '',
    updatePassword: false,
    checkUpdatePassword: false
  });

  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    name?: string;
    nickname?: string;
    confirmPassword?: string;
    password?: string;
  }>({});
  const router = useRouter();

  const handleSignUp = async () => {
    const newErrors: { email?: string; phone?: string; name?: string; nickname?: string; confirmPassword?: string } =
      {};

    if (!email) newErrors.email = '이메일은 필수 입력값입니다.';
    if (!phone) newErrors.phone = '휴대폰 번호는 필수 입력값입니다.';
    if (!name) newErrors.name = '이름은 필수 입력값입니다.';
    if (!nickname) newErrors.nickname = '닉네임은 필수 입력값입니다.';
    if (password !== form.confirmPassword) newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    const response = await handleSignupAction({
      email: email ?? '',
      password: password ?? '',
      name: name ?? '',
      phone: phone ?? '',
      nickname,
      role: 'user'
    });
    if (!response.success) {
      await Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: response.message
      });
      return;
    }

    await Swal.fire({
      icon: 'success',
      title: '회원가입 성공',
      text: `${name}님, 회원가입이 완료되었습니다!`
    });
    handleSignup();
    router.push('/');
  };

  const handleInputChange = (field: 'email' | 'phone' | 'name' | 'nickname' | 'confirmPassword', value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined
    }));

    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'nickname':
        setNickname(value);
        break;
      case 'confirmPassword':
        setForm((prevForm) => ({ ...prevForm, confirmPassword: value }));
        if (password && value !== password) {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
        }
        break;
      default:
        break;
    }
  };

  const handelSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div className="flex flex-col min-h-screen items-center px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-[400px] sm:max-w-[450px]">
      <div className="flex justify-center mt-[140px]">
        <LogoAuth />
      </div>
      <p className="text-[24px] sm:text-[28px] md:text-[20px] mt-[40px] font-semibold leading-[135%] text-center text-[#444] mb-[12px] sm:mb-[16px]">
        일반 회원 회원가입
      </p>

      <InputField
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요."
        value={email ?? ''}
        onChange={(e) => handleInputChange('email', e.target.value)}
        className="mb-[4px] sm:mb-[8px]"
        error={errors.email}
      />

      <InputField
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        value={password ?? ''}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        isPassword
        togglePasswordVisibility={() => setForm((prev) => ({ ...prev, updatePassword: !prev.updatePassword }))}
        isPasswordVisible={form.updatePassword}
        helperText="영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자"
      />

      <InputField
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해 주세요."
        value={form.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        isPassword
        togglePasswordVisibility={() =>
          setForm((prev) => ({ ...prev, checkUpdatePassword: !prev.checkUpdatePassword }))
        }
        isPasswordVisible={form.checkUpdatePassword}
      />

      <InputField
        label="휴대폰 번호"
        type="tel"
        placeholder="휴대폰 번호를 입력해 주세요."
        value={phone ?? ''}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        error={errors.phone}
      />

      <InputField
        label="이름"
        type="text"
        placeholder="이름을 입력해 주세요."
        value={name ?? ''}
        onChange={(e) => handleInputChange('name', e.target.value)}
        error={errors.name}
      />

      <InputField
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해 주세요."
        value={nickname ?? ''}
        onChange={(e) => handleInputChange('nickname', e.target.value)}
        error={errors.nickname}
      />

      <button
        type="button"
        onClick={handleSignUp}
        className="w-full max-w-[400px] sm:max-w-[450px] h-[48px] sm:h-[56px] mt-[20px] sm:mt-[24px] text-white text-center font-pretendard text-[20px] font-semibold leading-[135%] bg-[#B3916A] py-3 px-4 rounded-md hover:bg-[#a37e5f] transition"
      >
        완료
      </button>
      <div className="w-full flex flex-row justify-center mb-[80px]">
        <span className="text-center text-gray-500">이미 계정이 있으신가요?</span>
        <button onClick={handelSignIn} className="text-[#B3916A] font-semibold underline">
          로그인
        </button>
      </div>
    </div>
  </div>
  );
};

export default SignUpUser;
