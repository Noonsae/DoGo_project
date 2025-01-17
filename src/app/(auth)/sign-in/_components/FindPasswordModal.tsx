'use client';

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosCheckmark } from 'react-icons/io';
import Swal from 'sweetalert2';
import Error from '../error';
import { RxDividerVertical } from 'react-icons/rx';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
const FindPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<'input' | 'reset' | 'success'>('input');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    otp?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // 가입 정보 확인
  const handleFindPassword = async () => {
    const newErrors: { email?: string; phone?: string } = {};

    // 입력값 검증
    if (!email) {
      newErrors.email = '이메일은 필수 입력값입니다.';
    }
    if (!phone) {
      newErrors.phone = '휴대폰 번호는 필수 입력값입니다.';
    }

    setErrors(newErrors);

    // 에러가 있을 경우 요청 중단
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone })
      });

      const { otp } = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '인증코드',
          text: `비밀번호 재설정을 위한 인증코드는: ${otp}`
        });
        setModalType('reset');
      } else {
        console.error('OTP 요청 실패:', response.statusText);
        setErrors({ email: 'OTP 요청에 실패했습니다.' });
      }
    } catch (error) {
      console.error('OTP 요청 실패:', error);
      setErrors({ email: '서버 오류가 발생했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 재설정
  const handleResetPassword = async () => {
    const newErrors: { otp?: string; password?: string; confirmPassword?: string } = {};

    // 유효성 검증
    if (!otp) {
      newErrors.otp = '인증코드를 입력해 주세요.';
    }
    if (!password) {
      newErrors.password = '비밀번호를 입력해 주세요.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해 주세요.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);

    // 에러가 있을 경우 요청 중단
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, newPassword: password })
      });

      if (response.ok) {
        setModalType('success'); // 성공 모달로 전환
      } else {
        const result = await response.json();
        setErrors({ otp: result.error || '비밀번호 재설정에 실패했습니다.' });
      }
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error);
      setErrors({ otp: '서버 오류가 발생했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-[40px] flex items-center justify-center z-50">
      <div className="w-[424px] h-[635px] bg-white rounded-lg shadow-lg relative">
        <IoClose
          onClick={onClose}
          className="text-[30px] absolute top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
        />

        {/* 첫 번째 모달: 가입 정보 확인 */}
        {modalType === 'input' && (
          <div className="m-10 flex flex-col h-full">
            <h1 className="text-2xl font-bold mt-[50px] mb-[50px]">
              비밀번호를 찾기 위해 <br /> 가입 정보를 입력해 주세요.
            </h1>
            <div className="flex mb-4">
              <form
                className="flex-grow flex flex-col justify-between "
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFindPassword();
                }}
              >
                <div>
                  <label className="block text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    placeholder="이메일을 입력해 주세요."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: undefined })); // 에러 초기화
                    }}
                    className={`w-full p-[13px] border rounded-xl mb-2 focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
                    }`}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

                  <label className="block text-gray-700 mt-4 mb-1">휴대폰 번호</label>
                  <input
                    type="tel"
                    placeholder="휴대폰 번호를 입력해 주세요."
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors((prev) => ({ ...prev, phone: undefined })); // 에러 초기화
                    }}
                    className={`w-full p-[13px] border rounded-xl mb-2 focus:outline-none focus:ring-2 ${
                      errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
                    }`}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
                {/* <div className="flex flex-col"> */}
                <button
                  type="submit"
                  className="w-full mt-[150px]  bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f]"
                  disabled={isLoading}
                >
                  {isLoading ? '조회 중...' : '다음'}
                </button>
                {/* </div> */}
              </form>
            </div>
          </div>
        )}

        {/* 두 번째 모달: 비밀번호 재설정 */}
        {modalType === 'reset' && (
          <div className="m-10 flex flex-col h-full">
            <h1 className="font-semibold text-[24px] mt-[30px] mb-[30px]">
              가입정보가 <br />
              인증 되었습니다.
            </h1>
            <form
              className="flex-grow flex flex-col justify-between"
              onSubmit={(e) => {
                e.preventDefault();
                const newErrors: { otp?: string; password?: string; confirmPassword?: string } = {};

                // 입력값 검증
                if (!otp) {
                  newErrors.otp = 'OTP는 필수 입력값입니다.';
                }
                if (!password) {
                  newErrors.password = '비밀번호는 필수 입력값입니다.';
                }
                if (!confirmPassword) {
                  newErrors.confirmPassword = '비밀번호 확인은 필수 입력값입니다.';
                } else if (password !== confirmPassword) {
                  newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
                }

                setErrors(newErrors);

                // 에러가 있을 경우 요청 중단
                if (Object.keys(newErrors).length > 0) {
                  return;
                }

                handleResetPassword();
              }}
            >
              <div>
                {/* OTP 입력 */}
                <label className="font-semibold text-gray-700 mb-4">OTP</label>
                <input
                  type="text"
                  placeholder="OTP를 입력해 주세요."
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setErrors((prev) => ({ ...prev, otp: undefined })); // 에러 초기화
                  }}
                  className={`w-full p-[13px] border rounded-xl mb-2 focus:outline-none focus:ring-2 ${
                    errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
                  }`}
                />
                {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}

                {/* 새 비밀번호 입력 */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">새 비밀번호</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="새 비밀번호를 입력해 주세요."
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: undefined })); // 에러 초기화
                      }}
                      className={`w-full p-[13px] pr-10 border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#B3916A]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                    >
                      {showPassword ? (
                        <IoMdEye size={24} className="text-neutral-500" />
                      ) : (
                        <IoMdEyeOff size={24} className="text-neutral-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 mt-2">{errors.password}</p>}
                </div>

                {/* 비밀번호 확인 입력 */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">비밀번호 확인</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 입력해 주세요."
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined })); // 에러 초기화
                      }}
                      className={`w-full p-[13px] pr-10 border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.confirmPassword
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-[#B3916A]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                    >
                      {showConfirmPassword ? (
                        <IoMdEye size={24} className="text-neutral-500" />
                      ) : (
                        <IoMdEyeOff size={24} className="text-neutral-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500 mt-2">{errors.confirmPassword}</p>}
                </div>
              </div>
              <div className="flex flex-col ">
                <button
                  type="submit"
                  className="w-full mb-[70px] bg-[#B3916A] font-bold text-white py-[10px] rounded-xl hover:bg-[#a37e5f] transition"
                  disabled={isLoading}
                >
                  <div className="text-[20px]">{isLoading ? '처리 중...' : '완료'}</div>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 세 번째 모달: 성공 메시지 */}
        {modalType === 'success' && (
          <div className="w-[424px] mt-[50px] h-[635px] flex flex-col items-center justify-center p-[30px]">
            <IoIosCheckmark className="text-[150px] text-[#B3916A]" />
            <span className="text-xl  font-semibold  text-center">비밀번호가 재설정 되었습니다.</span>
            <button
              onClick={onClose}
              className="w-full mt-[180px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPasswordModal;
