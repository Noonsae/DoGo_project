'use client';
import { FormState, ErrorState } from '@/types/auth/FindPasswordModalTypes';
interface InputModalProps {
  form: FormState;
  errors: ErrorState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorState>>;
  handleFindPassword: () => void;
  handleTabChange: (tab: 'user' | 'business') => void;
}
const InputModal = ({ form, setForm, errors, setErrors, handleFindPassword, handleTabChange }: InputModalProps) => (
  <div className=" flex flex-col h-full w-full max-w-[360px] sm:max-w-[375px] ">
    <p className="mb-[32px] sm:mb-[40px] mt-[38px] sm:mt-[36px] text-[24px] sm:text-[28px] leading-[32.4px] sm:leading-[37.8px] font-semibold text-[#232527]">
      비밀번호를 찾기위해
      <br />
      가입 정보를 입력해 주세요.
    </p>
    <div className="flex border-b-2 w-full">
      <button
        className={` flex-1 pb-2 text-center ${
          form.activeTab === 'user' ? 'border-b-2 border-gray-500 font-bold' : 'text-gray-400'
        }`}
        onClick={() => handleTabChange('user')}
      >
        일반 회원 비밀번호
      </button>
      <button
        className={`flex-1 pb-2 text-center ${
          form.activeTab === 'business' ? 'border-b-2 border-gray-500 font-bold' : 'text-gray-400'
        }`}
        onClick={() => handleTabChange('business')}
      >
        사업자 회원 비밀번호
      </button>
    </div>
    <form
      className="flex flex-col justify-between w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleFindPassword();
      }}
    >
      <div>
        <div className="mt-[20px] md:mt-[30px]">
          <label className="block text-sm md:text-base mb-[4px] sm:mb-[8px] text-neutral-800 font-semibold">
            이메일
          </label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            onChange={(e) => {
              setForm((prevForm) => ({ ...prevForm, email: e.target.value }));
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={`w-full h-[40px] md:h-[48px] pl-[12px] md:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-1 ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-[#B3916A] focus:ring-[#B3916A]'
            }`}
          />
        </div>
        <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.email ? 'visible' : 'invisible'}`}>
          {errors.email || 'placeholder'}
        </p>

        <label className="block mb-[4px] sm:mb-[8px] text-sm md:text-base text-neutral-800 font-semibold">
          {form.activeTab === 'user' ? '휴대폰 번호' : '담당자 번호'}
        </label>
        <input
          type="text"
          placeholder={`${form.activeTab === 'user' ? '휴대폰 번호를' : '담당자 휴대폰 번호를'} 입력해주세요`}
          value={form.phone}
          onChange={(e) => {
            setForm((prevForm) => ({
              ...prevForm,
              phone: e.target.value.replace(/[^0-9-]/g, '')
            }));
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          className={`appearance-none w-full h-[40px] md:h-[48px] pl-[12px] md:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-1 ${
            errors.phone
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-[#B3916A] focus:ring-[#B3916A]'
          }`}
        />
        <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.phone ? 'visible' : 'invisible'}`}>
          {errors.phone || 'placeholder'}
        </p>
      </div>

      <div className="flex flex-col rounded mt-[269px] sm:mt-[40px]">
        <button
          type="submit"
          className="h-[48px] flex flex-col justify-center items-center text-[18px] sm:text-[20px] text-white text-center font-semibold leading-[135%] w-full sm:mb-[16px] max-w-[360px] sm:max-w-[375px] md:max-w-[352px] bg-[#B3916A] py-[12px] md:py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
        >
          {form.isLoading ? '조회중' : '비밀번호찾기'}
        </button>
      </div>
    </form>
  </div>
);

export default InputModal;
