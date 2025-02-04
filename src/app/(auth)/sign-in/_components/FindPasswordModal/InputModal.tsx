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
  <div className=" flex flex-col h-full w-full max-w-[360px] sm:max-w-[375px] p-4">
    <p className=" sm:hidden flex flex-col justify-center items-center text-neutral-800 mt-[30px]">비밀번호 재설정 </p>
    <p className="text-[20px] font-semibold leading-[135%] text-neutral-800  text-xl sm:text-2xl mt-6 sm:mt-10 mb-6 sm:mb-8">
      비밀번호를 재설정하기 위해 <br /> 가입 정보를 입력해 주세요.
    </p>
    <div className="flex border-b-2 w-full">
      <button
        className={`flex-1 pb-2 text-center ${
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
          <label className="block text-sm md:text-base text-gray-700 mb-[4px] sm:mb-[8px]">이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            onChange={(e) => {
              setForm((prevForm) => ({ ...prevForm, email: e.target.value }));
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={`w-full h-[40px] md:h-[48px] pl-[12px] md:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
            }`}
          />
        </div>
        <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.email ? 'visible' : 'invisible'}`}>
          {errors.email || 'placeholder'}
        </p>

        <label className="block mb-[4px] sm:mb-[8px] text-sm md:text-base text-gray-700 ">
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
          className={`appearance-none w-full h-[40px] md:h-[48px] pl-[12px] md:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-2 ${
            errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
          }`}
        />
        <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.phone ? 'visible' : 'invisible'}`}>
          {errors.phone || 'placeholder'}
        </p>
      </div>

      <div className="flex flex-col rounded mt-[90px]">
        <button
          type="submit"
          className=" text-[18px] sm:text-[20px] text-white text-center font-semibold leading-[135%] w-full mb-[14px] sm:mb-[12px] max-w-[360px] sm:max-w-[375px] md:max-w-[352px] bg-[#B3916A] py-[12px] md:py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
        >
          {form.isLoading ? '조회중' : '비밀번호찾기'}
        </button>
      </div>
    </form>
  </div>
);

export default InputModal;
