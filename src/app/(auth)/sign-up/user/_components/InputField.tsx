'use client';

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
      <p className="mt-[20px] sm:mt-[20px] font-pretendard text-[16px] font-semibold leading-[135%]">{label}</p>
      <div className="relative mt-[4px]">
        <input
          type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={` w-full max-w-[340px] sm:max-w-[400px] h-[44px] sm:h-[48px] px-3 border rounded-[8px] focus:outline-none ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-[#BFBFBF] focus:border-[#B3916A] focus:outline-none'
          } ${className}`}
        />
      </div>
      {helperText && <p className="text-xs text-neutral-600 mt-1">{helperText}</p>}

      {error && <p className="text-[14px] text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
