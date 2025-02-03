'use client';
import { FormState, ErrorState } from '@/types/auth/FindPasswordModalTypes';
import CloseEyesIcon from '@/components/ui/icon/CloseEyesIcon';
import OpenEyesIcon from '@/components/ui/icon/OpenEyesIcon';
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

            // 입력값 검증
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
            setForm((prevForm) => ({
              ...prevForm,
              modalType: 'success'
            }));
          }}
        >
          <div>
            {/* OTP 입력 */}
            <label className="text-base font-semibold text-gray-700 mb-4">OTP</label>
            <input
              type="text"
              placeholder="OTP를 입력해 주세요."
              value={form.otp}
              onChange={(e) => {
                setForm({
                  ...form,
                  otp: e.target.value
                });

                setErrors((prev) => ({ ...prev, otp: undefined }));
              }}
              className={`w-full p-[13px] border rounded-xl mb-2 focus:outline-none focus:ring-2 ${
                errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
              }`}
            />
            {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}

            {/* 새 비밀번호 입력 */}
            <div className="mb-4 text-base">
              <label className="block font-semibold text-gray-700 mb-2">새 비밀번호</label>

              <div className="relative">
                <input
                  type={form.showPassword ? 'text' : 'password'}
                  placeholder="새 비밀번호를 입력해 주세요."
                  value={form.password}
                  onChange={(e) => {
                    setForm((prevForm) => ({
                      ...prevForm,
                      password: e.target.value
                    }));

                    // 즉시 검증
                    if (form.confirmPassword && e.target.value !== form.confirmPassword) {
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
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
                  }`}
                />
                <p className="text-sm text-neutral-600 mb-[20px]">
                  영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자
                </p>
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
              {errors.password && <p className="text-sm text-red-500 mt-2">{errors.password}</p>}
            </div>

            {/* 비밀번호 확인 입력 */}
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

                    // 즉시 검증
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
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-2">{errors.confirmPassword}</p>}
            </div>
          </div>
          <div className="flex flex-col mt-[77px]">
            <button
              type="submit"
              className="w-[352px] h-[48px] text-xl bg-[#B3916A] font-bold text-white py-[10px] rounded-xl hover:bg-[#a37e5f] transition"
              // disabled={form.isLoading}
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
