'use client';

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosCheckmark } from 'react-icons/io';
import Swal from 'sweetalert2';
import Error from '../error';
import { RxDividerVertical } from 'react-icons/rx';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
const FindPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<'input' | 'reset' | 'success'>('input');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // 가입 정보 확인
  const handleFindPassword = async () => {
    try {
      const response = await fetch('/api/auth/reset-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone })
      });
      // 서버액션으로 빼고 실행이후에 탄스택으로가져와서
      const { otp } = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '인증코드',
          text: `비밀번호 재설정을 위한 인증코드는: ${otp}`
        });
        setModalType('reset');
      } else {
        const result = await response.json();
        alert(result.error);
      }
    } catch (error) {
      console.error('OTP 요청 실패:', error);
      Swal.fire({
        icon: 'error',
        title: '실패!',
        text: '이메일 또는 휴대폰 번호가 잘못되었습니다.'
      });
    }
  };

  // 비밀번호 재설정
  const handleResetPassword = async () => {
    if (!otp) {
      alert('인증코드를 입력해 주세요.');
      return;
    }
    if (!password || !confirmPassword || password !== confirmPassword) {
      alert('비밀번호를 확인해 주세요.');
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
        setModalType('success');
      } else {
        const result = await response.json();
        alert(result.error || '비밀번호 재설정에 실패했습니다.');
      }
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error);
      alert('서버 오류가 발생했습니다.');
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-[13px] border rounded-xl border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-[#B3916A]"
                  />
                  <label className="block text-gray-700 mb-1">휴대폰 번호</label>
                  <input
                    type="tel"
                    placeholder="휴대폰 번호를 입력해 주세요."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-[13px] border rounded-xl border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-[#B3916A]"
                  />
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
                handleResetPassword();
              }}
            >
              <div>
                <label className="font-semibold text-gray-700 mb-4">OTP</label>
                <input
                  type="text"
                  placeholder="OTP를 입력해 주세요."
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-[13px] border rounded-xl border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-[#B3916A]"
                />
                <div className="relative">
                  <label className="block font-semibold text-gray-700 mb-4">새 비밀번호</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="새 비밀번호를 입력해 주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full  p-[13px] border rounded-xl border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-[#B3916A]"
                  />
                  <p className="text-xs mb-4 text-gray-700">
                    영문 대•소문자/숫자/특수문자 중 2가지 이상 조합, 8자~32자
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-[12px] text-gray-600 hover:text-black"
                  >
                    {showPassword ? (
                      <IoMdEye size={24} className="text-neutral-500" />
                    ) : (
                      <IoMdEyeOff size={24} className="text-neutral-500" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <label className="block font-semibold text-gray-700 mb-4">비밀번호 확인</label>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 입력해 주세요."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-[13px] border rounded-xl border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-[#B3916A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-[6px] text-gray-600 hover:text-black"
                  >
                    {showConfirmPassword ? (
                      <IoMdEye size={24} className="text-neutral-500" />
                    ) : (
                      <IoMdEyeOff size={24} className="text-neutral-500" />
                    )}
                  </button>
                  {error && <Error message={error} />}
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
