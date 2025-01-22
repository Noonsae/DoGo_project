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
        <button
          onClick={onClose}
          className="absolute mt-[36px] mr-[36px]  g-[12px] top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.59094 6.5L13.0441 2.04687C13.2554 1.8359 13.3743 1.54962 13.3745 1.25099C13.3748 0.95237 13.2564 0.665874 13.0455 0.45453C12.8345 0.243185 12.5482 0.124305 12.2496 0.124041C11.951 0.123778 11.6645 0.242152 11.4531 0.453123L7 4.90625L2.54687 0.453123C2.33553 0.241779 2.04888 0.123047 1.75 0.123047C1.45111 0.123047 1.16447 0.241779 0.953123 0.453123C0.741779 0.664468 0.623047 0.951112 0.623047 1.25C0.623047 1.54888 0.741779 1.83553 0.953123 2.04687L5.40625 6.5L0.953123 10.9531C0.741779 11.1645 0.623047 11.4511 0.623047 11.75C0.623047 12.0489 0.741779 12.3355 0.953123 12.5469C1.16447 12.7582 1.45111 12.8769 1.75 12.8769C2.04888 12.8769 2.33553 12.7582 2.54687 12.5469L7 8.09375L11.4531 12.5469C11.6645 12.7582 11.9511 12.8769 12.25 12.8769C12.5489 12.8769 12.8355 12.7582 13.0469 12.5469C13.2582 12.3355 13.3769 12.0489 13.3769 11.75C13.3769 11.4511 13.2582 11.1645 13.0469 10.9531L8.59094 6.5Z"
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 4.92188C7.22812 4.92188 3.16875 7.84688 1.5 12C3.16875 16.1531 7.22812 19.0781 12 19.0781C16.7719 19.0781 20.8312 16.1531 22.5 12C20.8312 7.84688 16.7719 4.92188 12 4.92188ZM12 16.7203C9.375 16.7203 7.22812 14.5969 7.22812 12C7.22812 9.40312 9.375 7.27969 12 7.27969C14.625 7.27969 16.7719 9.40312 16.7719 12C16.7719 14.5969 14.625 16.7203 12 16.7203ZM12 9.16875C10.425 9.16875 9.13594 10.4437 9.13594 12C9.13594 13.5562 10.425 14.8312 12 14.8312C13.575 14.8312 14.8641 13.5562 14.8641 12C14.8641 10.4437 13.575 9.16875 12 9.16875Z"
                            fill="#444444"
                          />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.0047 6.7875C14.6391 6.7875 16.7812 8.91094 16.7812 11.5266C16.7812 12.1406 16.6594 12.7219 16.4391 13.2609L19.2281 16.0266C20.6719 14.8312 21.8062 13.2891 22.5047 11.5266C20.85 7.36875 16.7719 4.42031 11.9953 4.42031C10.6594 4.42031 9.37969 4.65938 8.19375 5.08125L10.2563 7.12969C10.8 6.91406 11.3859 6.7875 12.0047 6.7875ZM2.45625 4.20469L4.63594 6.36563L5.07656 6.80156C3.4875 8.02031 2.24531 9.65156 1.5 11.5266C3.15 15.6844 7.22813 18.6328 12.0047 18.6328C13.4859 18.6328 14.8969 18.3469 16.1859 17.8359L16.5891 18.2344L19.3875 21L20.6016 19.7953L3.66562 3L2.45625 4.20469ZM7.73438 9.44062L9.21563 10.9078C9.16875 11.1047 9.14062 11.3156 9.14062 11.5219C9.14062 13.0922 10.4203 14.3625 12.0047 14.3625C12.2156 14.3625 12.4266 14.3344 12.6234 14.2875L14.1047 15.7547C13.4672 16.0688 12.7594 16.2562 12.0047 16.2562C9.37031 16.2562 7.22812 14.1328 7.22812 11.5172C7.22812 10.7766 7.42031 10.0781 7.73438 9.44062ZM11.85 8.70469L14.8594 11.6906L14.8781 11.5406C14.8781 9.97031 13.5984 8.7 12.0141 8.7L11.85 8.70469Z"
                            fill="#444444"
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 4.92188C7.22812 4.92188 3.16875 7.84688 1.5 12C3.16875 16.1531 7.22812 19.0781 12 19.0781C16.7719 19.0781 20.8312 16.1531 22.5 12C20.8312 7.84688 16.7719 4.92188 12 4.92188ZM12 16.7203C9.375 16.7203 7.22812 14.5969 7.22812 12C7.22812 9.40312 9.375 7.27969 12 7.27969C14.625 7.27969 16.7719 9.40312 16.7719 12C16.7719 14.5969 14.625 16.7203 12 16.7203ZM12 9.16875C10.425 9.16875 9.13594 10.4437 9.13594 12C9.13594 13.5562 10.425 14.8312 12 14.8312C13.575 14.8312 14.8641 13.5562 14.8641 12C14.8641 10.4437 13.575 9.16875 12 9.16875Z"
                            fill="#444444"
                          />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.0047 6.7875C14.6391 6.7875 16.7812 8.91094 16.7812 11.5266C16.7812 12.1406 16.6594 12.7219 16.4391 13.2609L19.2281 16.0266C20.6719 14.8312 21.8062 13.2891 22.5047 11.5266C20.85 7.36875 16.7719 4.42031 11.9953 4.42031C10.6594 4.42031 9.37969 4.65938 8.19375 5.08125L10.2563 7.12969C10.8 6.91406 11.3859 6.7875 12.0047 6.7875ZM2.45625 4.20469L4.63594 6.36563L5.07656 6.80156C3.4875 8.02031 2.24531 9.65156 1.5 11.5266C3.15 15.6844 7.22813 18.6328 12.0047 18.6328C13.4859 18.6328 14.8969 18.3469 16.1859 17.8359L16.5891 18.2344L19.3875 21L20.6016 19.7953L3.66562 3L2.45625 4.20469ZM7.73438 9.44062L9.21563 10.9078C9.16875 11.1047 9.14062 11.3156 9.14062 11.5219C9.14062 13.0922 10.4203 14.3625 12.0047 14.3625C12.2156 14.3625 12.4266 14.3344 12.6234 14.2875L14.1047 15.7547C13.4672 16.0688 12.7594 16.2562 12.0047 16.2562C9.37031 16.2562 7.22812 14.1328 7.22812 11.5172C7.22812 10.7766 7.42031 10.0781 7.73438 9.44062ZM11.85 8.70469L14.8594 11.6906L14.8781 11.5406C14.8781 9.97031 13.5984 8.7 12.0141 8.7L11.85 8.70469Z"
                            fill="#444444"
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
          <div className="w-[424px] mt-[50px] h-[635px] flex flex-col items-center justify-center p-[30px]">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.9967 9.04214L16.1717 8.1937C16.1389 8.1562 16.0873 8.13745 16.0404 8.13745C15.9889 8.13745 15.942 8.1562 15.9092 8.1937L10.1904 13.9546L8.10918 11.8734C8.07168 11.8359 8.0248 11.8171 7.97793 11.8171C7.93105 11.8171 7.88418 11.8359 7.84668 11.8734L7.0123 12.7078C6.9373 12.7828 6.9373 12.9 7.0123 12.975L9.6373 15.6C9.80605 15.7687 10.0123 15.8671 10.1857 15.8671C10.4342 15.8671 10.6498 15.6843 10.7295 15.6093H10.7342L17.0014 9.30933C17.067 9.22964 17.067 9.11245 16.9967 9.04214Z"
                fill="#B3916A"
              />
            </svg>

            <span className="text-xl  font-semibold  text-center">비밀번호가 재설정 되었습니다.</span>
            <button
              onClick={onClose}
              className="w-full mt-[280px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
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
