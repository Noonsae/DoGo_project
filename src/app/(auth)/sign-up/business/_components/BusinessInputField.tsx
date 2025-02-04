'use client';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
import React from 'react';
interface BusinessInputFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isPassword?: boolean;
  togglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
  helperText?: string;
  className?: string;
}
const BusinessInputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  isPassword = false,
  togglePasswordVisibility,
  isPasswordVisible,
  helperText,
  className
}: BusinessInputFieldProps) => {
  return (
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
          }`}
        />
        {isPassword && togglePasswordVisibility && (
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePasswordVisibility}
            className="absolute right-[-25px] top-7 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-500"
          >
            {isPasswordVisible ? (
              <CloseEyesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-500" />
            ) : (
              <OpenEyesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-500" />
            )}
          </button>
        )}
      </div>

      {helperText && <p className="text-xs sm:text-sm text-neutral-600 mt-1">{helperText}</p>}

      {error && <p className=" sm:text-[16px] text-red-500 mt-[4px] sm:mt-[8px] text-sm text-[4px]">{error}</p>}
    </div>
  );
};

export default BusinessInputField;
