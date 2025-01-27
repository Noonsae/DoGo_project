'use client';
import { FormState, ErrorState } from '@/types/signIn/FindPasswordModalTypes';
interface InputModalProps {
  form: FormState;
  errors: ErrorState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorState>>;
  handleFindPassword: () => void;
  handleTabChange: (tab: 'user' | 'business') => void;
}
const InputModal = ({ form, setForm, errors, setErrors, handleFindPassword, handleTabChange }: InputModalProps) => (
  <div className="m-4 md:m-10 flex flex-col h-full">
    <p className="text-xl md:text-2xl font-bold mt-[24px] md:mt-[36px] mb-[24px] md:mb-[40px]">
      비밀번호를 찾기 위해 <br /> 가입 정보를 입력해 주세요.
    </p>
    <div className="flex border-b-2 w-full max-w-[352px]">
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
      className="flex flex-col justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        handleFindPassword();
      }}
    >
      <div>
        <div className="mt-[20px] md:mt-[30px]">
          <label className="block text-sm md:text-base text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            onChange={(e) => {
              setForm((prevForm) => ({ ...prevForm, email: e.target.value }));
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={`w-full max-w-[352px] h-[40px] md:h-[48px] pl-[12px] md:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
            }`}
          />
        </div>
        {errors.email && <p className="text-xs md:text-sm text-red-500">{errors.email}</p>}
        <label className="block mt-[16px] md:mt-[20px] text-sm md:text-base text-gray-700">
          {form.activeTab === 'user' ? '휴대폰 번호' : '담당자 번호'}
        </label>
        <input
          type="number"
          placeholder={`${form.activeTab === 'user' ? '휴대폰 번호를' : '담당자 휴대폰 번호를'} 입력해주세요`}
          value={form.phone}
          onChange={(e) => {
            setForm((prevForm) => ({
              ...prevForm,
              phone: e.target.value
            }));
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          className={`appearance-none w-full max-w-[352px] h-[40px] md:h-[48px] pl-[12px] md:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-2 ${
            errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
          }`}
        />
        {errors.phone && <p className="text-xs md:text-sm text-red-500">{errors.phone}</p>}
      </div>
      <div className="flex flex-col rounded">
        <button
          type="submit"
          className="w-full max-w-[352px] bg-[#B3916A] mt-[80px] md:mt-[120px] font-bold text-white py-[12px] md:py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
        >
          {form.isLoading ? '조회중' : '비밀번호찾기'}
        </button>
      </div>
    </form>
  </div>
);

export default InputModal;
