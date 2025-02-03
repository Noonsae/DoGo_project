'use client';
import { FormState, ErrorState } from '@/types/auth/FindPasswordModalTypes';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
import { isValidPassword } from '@/utils/validation';
import React from 'react';

interface ResetModalProps {
  form: FormState;
  errors: ErrorState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorState>>;
  handleResetPassword: () => void;
}

const ResetModal = ({ form, errors, setForm, setErrors, handleResetPassword }: ResetModalProps) => (
  <div className="m-10 flex flex-col z-50">
    {form.modalType === 'reset' && (
      <div className="flex flex-col">
        <p className="font-semibold text-[24px] mt-[30px] mb-[30px]">
          비밀번호를 찾기 위해 <br />
          가입 정보를 입력해 주세요.
        </p>
        <form
          className="flex flex-col justify-between"
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
            // setForm((prevForm) => ({ => 이거 때문에 성공모달창으로 이동되는 거였음
            //   ...prevForm,
            //   modalType: 'success'
            // }));
          }}
        >
          <div>
            <label className="text-base font-semibold text-gray-700 mb-4">OTP</label>
            <input
              type="text"
              placeholder="OTP를 입력해 주세요."
              value={form.otp}
              onChange={(e) => {
                setForm({ ...form, otp: e.target.value });
                setErrors((prev) => ({ ...prev, otp: undefined }));
              }}
              className={`w-full p-[13px] border rounded-xl mb-2 focus:outline-none focus:ring-2 ${
                errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
              }`}
            />
            <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.otp ? 'visible' : 'invisible'}`}>
              {errors.otp || 'placeholder'}
            </p>
            <div className="text-base">
              <label className="block font-semibold text-gray-700 mb-2">새 비밀번호</label>

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
                  className={`w-full p-[13px] border rounded-xl mb-2 focus:outline-none focus:ring-2 text-sm text-neutral-600 mt-[4px]  pr-10  ${
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
                  className="absolute right-3 top-7 text-neutral-500 transform -translate-y-1/2 hover:text-black"
                >
                  {form.showPassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
                </button>
              </div>
              <p className={`text-sm text-red-500 mt-1 min-h-[5px] ${errors.password ? 'visible' : 'invisible'}`}>
                {errors.password || 'placeholder'}
              </p>
            </div>
            <div className="mb-4 ">
              <label className="text-base block font-semibold text-gray-700 mb-2">비밀번호 확인</label>
              <div className="relative">
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
                  className={`w-full p-[13px] pr-10 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#B3916A]'
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      showConfirmPassword: !prevForm.showConfirmPassword
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {form.showConfirmPassword ? <CloseEyesIcon /> : <OpenEyesIcon />}
                </button>
              </div>
              <p
                className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.confirmPassword ? 'visible' : 'invisible'}`}
              >
                {errors.confirmPassword || 'placeholder'}
              </p>
            </div>
          </div>
          <div className="flex flex-col ">
            <button
              type="submit"
              className="w-[352px] h-[48px] mt-[20px] text-xl bg-[#B3916A] font-bold text-white py-[10px] rounded-xl hover:bg-[#a37e5f] transition"
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
