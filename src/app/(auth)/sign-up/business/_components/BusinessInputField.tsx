'use client';

import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';

// TODO 타입 파일 정리하기 
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
      <p className="mt-[20px] sm:mt-[24px] font-pretendard text-[16px] font-semibold leading-[135%]">{label}</p>
      <div className="relative">
        <input
          type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`text-neutral-800 w-full max-w-[340px] sm:max-w-[400px] h-[44px] sm:h-[48px] px-3 border rounded-[8px] focus:outline-none ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-[#BFBFBF] focus:border-[#B3916A] focus:outline-none'
          } ${className}`}
        />
        {isPassword && togglePasswordVisibility && (
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePasswordVisibility}
            className="absolute right-[8px] sm:right-[16px] top-1/2 transform -translate-y-2 text-neutral-500 hover:text-neutral-500"
          >
            {isPasswordVisible ? (
              <CloseEyesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-500" />
            ) : (
              <OpenEyesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-500" />
            )}
          </button>
        )}
      </div>
      {/* 커밋 */}
      {helperText && <p className="text-xs sm:text-sm text-neutral-600 mt-1">{helperText}</p>}

      {error && <p className=" sm:text-[14px] text-red-500 mt-[4px] sm:mt-[8px]">{error}</p>}
    </div>
  );
};

export default BusinessInputField;
