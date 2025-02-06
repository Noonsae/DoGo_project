'use client';

import React, { useEffect, useState } from 'react';
import { FormState } from '@/types/auth/FindPasswordModalTypes';
import CloseButtonIcon from '@/components/ui/icon/CloseButtonIcon';
import InputModal from './InputModal';
import ResetModal from './ResetModal';
import SuccessModal from './SuccessModal';
import { isValidPassword } from '@/utils/calculator/validation';
import Swal from 'sweetalert2';

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

      setForm((prevForm) => ({
        ...prevForm,
        modalType: 'reset',
        isLoading: false,
        name: result.user_name || '',
        otp: result.otp
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
    } else if (!isValidPassword(form.password)) {
      newErrors.password = '영문 + 숫자 또는 특수문자 조합, 8자~32자 입력하세요.';
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해 주세요.';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호 설정 실패',
        text: '비밀번호 형식을 다시 확인해주세요.',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isDismissed) {
          onClose();
        }
      });

      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      isLoading: true
    }));

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: form.otp, newPassword: form.password, role: form.activeTab })
      });

      if (response.ok) {
        setForm((prevForm) => ({ ...prevForm, modalType: 'success' }));
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
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex sm:items-center items-start justify-center bg-black bg-opacity-50 px-0 sm:px-4">
      <div className="flex justify-center bg-white shadow-lg relative w-full h-screen sm:h-auto sm:max-w-[424px] sm:rounded-lg">
        <button
          onClick={onClose}
          className="absolute mt-[36px] mr-[36px] top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
        >
          <div className="flex flex-row">
            <CloseButtonIcon />
          </div>
        </button>
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
        {form.modalType === 'reset' && (
          <ResetModal
            form={form}
            errors={errors}
            setForm={setForm}
            setErrors={setErrors}
            handleResetPassword={handleResetPassword}
          />
        )}
        {form.modalType === 'success' && <SuccessModal form={form} onClose={onClose} />}
      </div>
    </div>
  );
};

export default FindPasswordModal;
