'use client';

import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
import React from 'react';

interface InputFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isPassword?: boolean;
  togglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
  className?: string;
  helperText?: string;
}

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  isPassword = false,
  togglePasswordVisibility,
  isPasswordVisible,
  className = '',
  helperText
}: InputFieldProps) => {
  return (
    <div className="w-full">
      {/* 라벨 */}
      <p className="mt-[20px] sm:mt-[24px] font-pretendard text-[16px] font-semibold leading-[135%]">{label}</p>
      {/* 입력 필드 */}
      <div className="relative">
        <input
          type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full max-w-[340px] sm:max-w-[400px] h-[44px] sm:h-[48px] px-3 border rounded-[8px] focus:outline-none ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-[#BFBFBF] focus:border-[#B3916A] focus:outline-none'
          } ${className}`}
        />

        {/* 비밀번호 보기/숨기기 버튼 */}
        {isPassword && togglePasswordVisibility && (
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePasswordVisibility}
            className="absolute right-[8px] sm:right-[16px] top-1/2 transform -translate-y-2 text-neutral-500 hover:text-neutral-500"
          >
            {isPasswordVisible ? (
              <CloseEyesIcon className="text-neutral-500" />
            ) : (
              <OpenEyesIcon className="text-neutral-500" />
            )}
          </button>
        )}
      </div>

      {/* 헬퍼 텍스트 (옵션) */}
      {helperText && <p className="text-xs text-neutral-600 mt-1">{helperText}</p>}

      {/* 오류 메시지 */}
      {error && <p className="text-[14px] text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
