'use client';

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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
    name?: string;
    // 로그인된 상태에서 마이페이지에서만 가능하게 만들어야 함...
    password?: string;
    confirmPassword?: string;
  }>({});
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[424px] h-[635px] bg-white rounded-lg shadow-lg relative">
        <button onClick={onClose}>
          <svg
            className="mt-[36px] mr-[36px] text-[30px] absolute top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.59094 7L13.0441 2.54687C13.2554 2.3359 13.3743 2.04962 13.3745 1.75099C13.3748 1.45237 13.2564 1.16587 13.0455 0.95453C12.8345 0.743185 12.5482 0.624305 12.2496 0.624041C11.951 0.623778 11.6645 0.742152 11.4531 0.953123L7 5.40625L2.54687 0.953123C2.33553 0.741779 2.04888 0.623047 1.75 0.623047C1.45111 0.623047 1.16447 0.741779 0.953123 0.953123C0.741779 1.16447 0.623047 1.45111 0.623047 1.75C0.623047 2.04888 0.741779 2.33553 0.953123 2.54687L5.40625 7L0.953123 11.4531C0.741779 11.6645 0.623047 11.9511 0.623047 12.25C0.623047 12.5489 0.741779 12.8355 0.953123 13.0469C1.16447 13.2582 1.45111 13.3769 1.75 13.3769C2.04888 13.3769 2.33553 13.2582 2.54687 13.0469L7 8.59375L11.4531 13.0469C11.6645 13.2582 11.9511 13.3769 12.25 13.3769C12.5489 13.3769 12.8355 13.2582 13.0469 13.0469C13.2582 12.8355 13.3769 12.5489 13.3769 12.25C13.3769 11.9511 13.2582 11.6645 13.0469 11.4531L8.59094 7Z"
              fill="#444444"
            />
          </svg>
        </button>

        {/* 첫 번째 모달: 가입 정보 확인 */}
        {modalType === 'input' && (
          <div className="m-10 flex flex-col ">
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
                  className="w-full mt-[77px]  bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f]"
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
          <div className="m-10 flex flex-col">
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
                    setErrors((prev) => ({ ...prev, otp: undefined }));
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
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.0047 3.7875C13.6391 3.7875 15.7812 5.91094 15.7812 8.52656C15.7812 9.14062 15.6594 9.72187 15.4391 10.2609L18.2281 13.0266C19.6719 11.8312 20.8062 10.2891 21.5047 8.52656C19.85 4.36875 15.7719 1.42031 10.9953 1.42031C9.65937 1.42031 8.37969 1.65938 7.19375 2.08125L9.25625 4.12969C9.8 3.91406 10.3859 3.7875 11.0047 3.7875ZM1.45625 1.20469L3.63594 3.36563L4.07656 3.80156C2.4875 5.02031 1.24531 6.65156 0.5 8.52656C2.15 12.6844 6.22813 15.6328 11.0047 15.6328C12.4859 15.6328 13.8969 15.3469 15.1859 14.8359L15.5891 15.2344L18.3875 18L19.6016 16.7953L2.66562 0L1.45625 1.20469ZM6.73438 6.44062L8.21563 7.90781C8.16875 8.10469 8.14062 8.31563 8.14062 8.52188C8.14062 10.0922 9.42031 11.3625 11.0047 11.3625C11.2156 11.3625 11.4266 11.3344 11.6234 11.2875L13.1047 12.7547C12.4672 13.0688 11.7594 13.2562 11.0047 13.2562C8.37031 13.2562 6.22812 11.1328 6.22812 8.51719C6.22812 7.77656 6.42031 7.07812 6.73438 6.44062ZM10.85 5.70469L13.8594 8.69062L13.8781 8.54062C13.8781 6.97031 12.5984 5.7 11.0141 5.7L10.85 5.70469Z"
                            fill="#A0A0A0"
                          />
                        </svg>
                      ) : (
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.0047 3.7875C13.6391 3.7875 15.7812 5.91094 15.7812 8.52656C15.7812 9.14062 15.6594 9.72187 15.4391 10.2609L18.2281 13.0266C19.6719 11.8312 20.8062 10.2891 21.5047 8.52656C19.85 4.36875 15.7719 1.42031 10.9953 1.42031C9.65937 1.42031 8.37969 1.65938 7.19375 2.08125L9.25625 4.12969C9.8 3.91406 10.3859 3.7875 11.0047 3.7875ZM1.45625 1.20469L3.63594 3.36563L4.07656 3.80156C2.4875 5.02031 1.24531 6.65156 0.5 8.52656C2.15 12.6844 6.22813 15.6328 11.0047 15.6328C12.4859 15.6328 13.8969 15.3469 15.1859 14.8359L15.5891 15.2344L18.3875 18L19.6016 16.7953L2.66562 0L1.45625 1.20469ZM6.73438 6.44062L8.21563 7.90781C8.16875 8.10469 8.14062 8.31563 8.14062 8.52188C8.14062 10.0922 9.42031 11.3625 11.0047 11.3625C11.2156 11.3625 11.4266 11.3344 11.6234 11.2875L13.1047 12.7547C12.4672 13.0688 11.7594 13.2562 11.0047 13.2562C8.37031 13.2562 6.22812 11.1328 6.22812 8.51719C6.22812 7.77656 6.42031 7.07812 6.73438 6.44062ZM10.85 5.70469L13.8594 8.69062L13.8781 8.54062C13.8781 6.97031 12.5984 5.7 11.0141 5.7L10.85 5.70469Z"
                            fill="#A0A0A0"
                          />
                        </svg>
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
                      className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                    >
                      {showConfirmPassword ? (
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.0047 3.7875C13.6391 3.7875 15.7812 5.91094 15.7812 8.52656C15.7812 9.14062 15.6594 9.72187 15.4391 10.2609L18.2281 13.0266C19.6719 11.8312 20.8062 10.2891 21.5047 8.52656C19.85 4.36875 15.7719 1.42031 10.9953 1.42031C9.65937 1.42031 8.37969 1.65938 7.19375 2.08125L9.25625 4.12969C9.8 3.91406 10.3859 3.7875 11.0047 3.7875ZM1.45625 1.20469L3.63594 3.36563L4.07656 3.80156C2.4875 5.02031 1.24531 6.65156 0.5 8.52656C2.15 12.6844 6.22813 15.6328 11.0047 15.6328C12.4859 15.6328 13.8969 15.3469 15.1859 14.8359L15.5891 15.2344L18.3875 18L19.6016 16.7953L2.66562 0L1.45625 1.20469ZM6.73438 6.44062L8.21563 7.90781C8.16875 8.10469 8.14062 8.31563 8.14062 8.52188C8.14062 10.0922 9.42031 11.3625 11.0047 11.3625C11.2156 11.3625 11.4266 11.3344 11.6234 11.2875L13.1047 12.7547C12.4672 13.0688 11.7594 13.2562 11.0047 13.2562C8.37031 13.2562 6.22812 11.1328 6.22812 8.51719C6.22812 7.77656 6.42031 7.07812 6.73438 6.44062ZM10.85 5.70469L13.8594 8.69062L13.8781 8.54062C13.8781 6.97031 12.5984 5.7 11.0141 5.7L10.85 5.70469Z"
                            fill="#A0A0A0"
                          />
                        </svg>
                      ) : (
                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.0047 3.7875C13.6391 3.7875 15.7812 5.91094 15.7812 8.52656C15.7812 9.14062 15.6594 9.72187 15.4391 10.2609L18.2281 13.0266C19.6719 11.8312 20.8062 10.2891 21.5047 8.52656C19.85 4.36875 15.7719 1.42031 10.9953 1.42031C9.65937 1.42031 8.37969 1.65938 7.19375 2.08125L9.25625 4.12969C9.8 3.91406 10.3859 3.7875 11.0047 3.7875ZM1.45625 1.20469L3.63594 3.36563L4.07656 3.80156C2.4875 5.02031 1.24531 6.65156 0.5 8.52656C2.15 12.6844 6.22813 15.6328 11.0047 15.6328C12.4859 15.6328 13.8969 15.3469 15.1859 14.8359L15.5891 15.2344L18.3875 18L19.6016 16.7953L2.66562 0L1.45625 1.20469ZM6.73438 6.44062L8.21563 7.90781C8.16875 8.10469 8.14062 8.31563 8.14062 8.52188C8.14062 10.0922 9.42031 11.3625 11.0047 11.3625C11.2156 11.3625 11.4266 11.3344 11.6234 11.2875L13.1047 12.7547C12.4672 13.0688 11.7594 13.2562 11.0047 13.2562C8.37031 13.2562 6.22812 11.1328 6.22812 8.51719C6.22812 7.77656 6.42031 7.07812 6.73438 6.44062ZM10.85 5.70469L13.8594 8.69062L13.8781 8.54062C13.8781 6.97031 12.5984 5.7 11.0141 5.7L10.85 5.70469Z"
                            fill="#A0A0A0"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500 mt-2">{errors.confirmPassword}</p>}
                </div>
              </div>
              <div className="flex flex-col mt-[77px]">
                <button
                  type="submit"
                  className=" bg-[#B3916A] font-bold text-white py-[10px] rounded-xl hover:bg-[#a37e5f] transition"
                  disabled={isLoading}
                >
                  <div className=" text-[20px]">{isLoading ? '처리 중...' : '완료'}</div>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 세 번째 모달: 성공 메시지 */}
        {modalType === 'success' && (
          <div className="w-[424px] h-[635px] flex flex-col items-center justify-center mb-[40px]">
            <div className="w-[352px] h-[411px] flex flex-col flex-nowrap justify-center items-center">
              <svg
                className="mt-[33px] mr-[28px] mb-[33px] ml-[28px]"
                width="42"
                height="32"
                viewBox="0 0 44 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>

              <span className="text-[20px] font-semibold  text-center">비밀번호가 재설정 되었습니다.</span>
            </div>
            <button
              onClick={onClose}
              className=" w-[352px] h-[48px] mt-[40px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
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
