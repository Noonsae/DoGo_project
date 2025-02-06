'use client';
import { FormState, ErrorState } from '@/types/auth/FindPasswordModalTypes';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
import { isValidPassword } from '@/utils/calculator/validation';
import React from 'react';

interface ResetModalProps {
  form: FormState;
  errors: ErrorState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorState>>;
  handleResetPassword: () => void;
}

const ResetModal = ({ form, errors, setForm, setErrors, handleResetPassword }: ResetModalProps) => (
  <div className=" flex flex-col h-full w-full max-w-[360px] sm:max-w-[375px] ">
    {form.modalType === 'reset' && (
      <div className=" flex flex-col">
        <p className="text-[24px] sm:text-[28px] leading-[135%] mb-[40px] sm:mb-[32px] sm:leading-[130%] text-lg sm:text-xl font-semibold ">
          가입정보가 <br />
          인증 되었습니다.
        </p>
        <form
          className="flex flex-col justify-between w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            const newErrors: { otp?: string; password?: string; confirmPassword?: string } = {};

            if (!form.otp) {
              newErrors.otp = 'OTP는 필수 입력값입니다.';
            }
            if (!form.password) {
              newErrors.password = '비밀번호는 필수 입력값입니다.';
            }
            if (!form.confirmPassword) {
              newErrors.confirmPassword = '비밀번호 확인은 필수 입력값입니다.';
            } else if (form.password !== form.confirmPassword) {
              newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
            }

            setErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
              return;
            }

            handleResetPassword();
          }}
        >
          <div className="mb-4">
            <label className="text-base block text-neutral-800 font-semibold mb-[4px] text-[16px]">OTP 인증 코드</label>
            <input
              type="text"
              placeholder="OTP를 입력해 주세요."
              value={form.otp}
              onChange={(e) => {
                setForm({ ...form, otp: e.target.value });
                setErrors((prev) => ({ ...prev, otp: undefined }));
              }}
              className={` text-neutral-800 w-full h-[40px] md:h-[48px] pl-[12px] md:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-2 ${
                errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
              }`}
            />
            <p className="text-sm mt-1 min-h-[5px] text-neutral-500 ml-[1px] ">OTP는 자동으로 입력됩니다.</p>

            {/* 새 비밀번호 입력 */}
            <div className="text-base">
              <label className="block text-neutral-800 font-semibold mb-[4px] text-[16px]">새 비밀번호</label>
              <div className="relative">
                <input
                  type={form.showPassword ? 'text' : 'password'}
                  placeholder="새 비밀번호를 입력해 주세요."
                  value={form.password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setForm((prevForm) => ({
                      ...prevForm,
                      password: newPassword
                    }));

                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      password: isValidPassword(newPassword)
                        ? undefined
                        : '영문 + 숫자 또는 특수문자 조합, 8자~32자 입력하세요.'
                    }));
                  }}
                  className={`text-neutral-800 w-full h-[40px] md:h-[48px] pl-[12px] md:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      showPassword: !prevForm.showPassword
                    }))
                  }
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {form.showPassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
                </button>
              </div>
              <p className="text-[14px] text-neutral-600 ">영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자</p>
              <p className={`text-sm text-red-500 mt-1 min-h-[5px] ${errors.password ? 'visible' : 'invisible'}`}>
                {errors.password || 'placeholder'}
              </p>
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="relative w-full">
              <p className="block text-neutral-800 font-semibold mb-[4px] text-[16px]">비밀번호 확인</p>
              <input
                type={form.showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 입력해 주세요."
                value={form.confirmPassword}
                onChange={(e) => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    confirmPassword: e.target.value
                  }));

                  if (form.password && e.target.value !== form.password) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: '비밀번호가 일치하지 않습니다.'
                    }));
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined
                    }));
                  }
                }}
                className={`text-[16px] font-medium leading-[135%] text-neutral-800 w-full h-[40px] sm:h-[48px] pl-[12px] sm:pl-[16px] border rounded-[8px] focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
                }`}
              />
              <p
                className={`text-sm text-red-500 mt-1 min-h-[5px] ${errors.confirmPassword ? 'visible' : 'invisible'}`}
              >
                {errors.confirmPassword || 'placeholder'}
              </p>
              <button
                type="button"
                tabIndex={-1}
                onClick={() =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    showConfirmPassword: !prevForm.showConfirmPassword
                  }))
                }
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {form.showConfirmPassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
              </button>
            </div>
          </div>

          {/* 완료 버튼 */}
          <div className="flex flex-col">
            <button
              type="submit"
              className="text-[18px] mt-[207px] sm:mt-[40px] sm:text-[20px] text-white text-center font-semibold leading-[135%] mb-[14px] sm:mb-[12px] w-full max-w-md md:w-[352px] h-[48px] text-xl bg-[#B3916A] py-[10px] rounded-xl hover:bg-[#a37e5f] transition"
            >
              {form.isLoading ? '처리 중...' : '완료'}
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
);

export default ResetModal;
