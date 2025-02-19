'use client';

import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';

//TODO 타입파일 정리
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
  helperText?: React.ReactNode;
}

const InputPassword = ({
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
      <p className=" mt-[20px] sm:mt-[24px] font-pretendard text-[16px] font-semibold leading-[135%]">{label}</p>

      <div
        className={`relative w-full max-w-[340px] sm:max-w-[400px] h-[44px] sm:h-[48px] flex items-center border ${
          error ? 'border-red-500' : 'border-[#BFBFBF]'
        } rounded-[8px] focus-within:border-[#B3916A]`}
      >
        {/* 입력 필드 */}
        <input
          type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 px-3 h-full focus:outline-none bg-transparent"
        />

        {/* 눈 아이콘 버튼 (고정) */}
        {isPassword && togglePasswordVisibility && (
          <button
            type="button"
            tabIndex={-1}
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
          >
            {isPasswordVisible ? (
              <CloseEyesIcon className="text-neutral-500" />
            ) : (
              <OpenEyesIcon className="text-neutral-500" />
            )}
          </button>
        )}
      </div>

      {helperText && <p className="text-xs text-neutral-600 mt-1">{helperText}</p>}

      {error && <p className="text-[14px] text-red-500">{error}</p>}
    </div>
  );
};

export default InputPassword;
