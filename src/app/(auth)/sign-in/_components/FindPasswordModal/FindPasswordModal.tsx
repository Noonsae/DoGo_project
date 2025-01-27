'use client';

import React, { useEffect, useState } from 'react';
import { FormState } from '@/types/auth/FindPasswordModalTypes';
import CloseButtonIcon from '@/components/ui/icon/CloseButtonIcon';
import Swal from 'sweetalert2';
import InputModal from './InputModal';
import ResetModal from './ResetModal';
import SuccessModal from './SuccessModal';

const FindPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState<FormState>({
    email: '',
    phone: '',
    otp: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
    modalType: 'input',
    showConfirmPassword: false,
    showPassword: false,
    activeTab: 'user',
    name: ''
  });

  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    otp?: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleFindPassword = async () => {
    const newErrors: { email?: string; phone?: string } = {};

    if (!form.email) {
      newErrors.email = '이메일은 필수 입력값입니다.';
    }
    if (!form.phone) {
      newErrors.phone = '휴대폰 번호는 필수 입력값입니다.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setForm((prevForm) => ({ ...prevForm, isLoading: true }));
    try {
      const response = await fetch('/api/auth/reset-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, phone: form.phone, role: form.activeTab })
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setErrors({ email: errorResult.error || '일치하지 않습니다.' });
        setForm((prevForm) => ({ ...prevForm, isLoading: false }));
        return;
      }

      const result = await response.json();
      await Swal.fire({
        icon: 'success',
        title: '인증코드',
        text: `비밀번호 재설정을 위한 인증코드는: ${result.otp}`
      });

      // `form.name` 업데이트
      setForm((prevForm) => ({
        ...prevForm,
        modalType: 'reset',
        isLoading: false,
        name: result.user_name || '' // userName이 없으면 빈 문자열
      }));
    } catch (error) {
      setErrors({ email: '서버 오류가 발생했습니다.' });
      setForm((prevForm) => ({ ...prevForm, isLoading: false }));
    }
  };

  const handleResetPassword = async () => {
    const newErrors: { otp?: string; password?: string; confirmPassword?: string } = {};

    if (!form.otp) {
      newErrors.otp = '인증코드를 입력해 주세요.';
    }
    if (!form.password) {
      newErrors.password = '비밀번호를 입력해 주세요.';
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해 주세요.';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setForm((prevForm) => {
      return { ...prevForm, setIsLoading: true };
    });

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: form.otp, newPassword: form.password, role: form.activeTab })
      });

      if (response.ok) {
        setForm((prevForm) => ({ ...prevForm, setModalType: 'success' }));
      } else {
        const result = await response.json();
        setErrors({ otp: result.error || '비밀번호 재설정에 실패했습니다.' });
      }
    } catch (error) {
      setErrors({ otp: '서버 오류가 발생했습니다.' });
    } finally {
      setForm((prevForm) => ({ ...prevForm, setIsLoading: false }));
    }
  };
  const handleTabChange = (tab: 'user' | 'business') => {
    setForm((prevForm) => ({
      ...prevForm,
      activeTab: tab,
      name: '',
      phone: '',
      modalType: 'input'
    }));
    setErrors({});
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[424px] h-[635px] bg-white rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute mt-[36px] mr-[36px]  g-[12px] top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
        >
          <CloseButtonIcon />
        </button>
        {/* tab구분점 */}
        {form.modalType === 'input' && (
          <InputModal
            form={form}
            errors={errors}
            setForm={setForm}
            setErrors={setErrors}
            handleFindPassword={handleFindPassword}
            handleTabChange={handleTabChange}
          />
        )}

        {/* 두 번째 모달: 비밀번호 재설정 */}

        <ResetModal
          form={form}
          errors={errors}
          setForm={setForm}
          setErrors={setErrors}
          handleResetPassword={handleResetPassword}
        />
        {/* 세 번째 모달: 성공 메시지 */}

        <SuccessModal form={form} onClose={onClose} />
      </div>
    </div>
  );
};

export default FindPasswordModal;
