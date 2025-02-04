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
  error,
  value,
  onChange,
  isPassword = false,
  togglePasswordVisibility,
  isPasswordVisible,
  className = '',
  helperText
}: InputFieldProps) => {
  return (
    <div>
      <div className="w-full">
        <p className="mt-[20px] sm:mt-[24px] mb-[4px] sm:mb-[8px] font-pretendard text-[16px] font-semibold leading-[135%]">
          {label}
        </p>

        <div className="relative">
          <input
            type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-[400px] h-[48px] sm:w-[450px] sm:h-[56px] px-3 border rounded-[8px] focus:outline-none ${
              error ? 'border-red-500 focus:ring-red-500' : 'border-[#BFBFBF] focus:border-[#B3916A] focus:outline-none'
            } ${className}`}
          />

          {isPassword && togglePasswordVisibility && (
            <button
              type="button"
              tabIndex={-1}
              onClick={togglePasswordVisibility}
              className="absolute right-[-25px] top-7 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {isPasswordVisible ? <CloseEyesIcon /> : <OpenEyesIcon />}
            </button>
          )}
        </div>

        {error && <p className="text-[14px] text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
