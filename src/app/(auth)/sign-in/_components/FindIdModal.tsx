'use client';

import React, { useEffect, useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { PiWarningCircleFill } from 'react-icons/pi';

const FindIdModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'business'>('user');
  const [modalType, setModalType] = useState<'input' | 'success' | 'failure'>('input');
  const [resultEmail, setResultEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const maskEmail = (email: string): string => {
    if (!email.includes('@')) {
      return email; // 이메일 형식이 아니면 그대로 반환
    }
    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart.slice(0, 3) + '***';
    return `${maskedLocal}@${domain}`;
  };
  const handleFindId = async () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name) {
      newErrors.name = '이름은 필수 입력값입니다.';
    }
    if (!phone) {
      newErrors.phone = '휴대폰 번호는 필수 입력값입니다.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone })
      });
      const result = await response.json();

      if (response.ok && result.email) {
        setResultEmail(maskEmail(result.email));
        setModalType('success');
      } else {
        setModalType('failure');
      }
    } catch (error) {
      console.error('아이디 찾기 실패:', error);
      setModalType('failure');
    } finally {
      setIsLoading(false);
    }
  };
  const handleTabChange = (tab: 'user' | 'business') => {
    setActiveTab(tab);
    setName('');
    setPhone('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[424px] h-[635px] bg-white rounded-lg shadow-lg relative">
        {/* <IoClose
          onClick={onClose}
          className="text-[30px] absolute top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
        /> */}
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
        {modalType === 'input' && (
          <div className="m-10 flex flex-col h-full">
            <p className="text-2xl font-bold mt-[36px] mb-[40px]">
              DoGo 가입 정보로 <br /> 아이디를 확인하세요.
            </p>

            <div className="flex border-b-2 w-[352px]">
              <button
                className={`flex-1 pb-2 text-center  ${
                  activeTab === 'user' ? 'border-b-2 border-gray-500 font-bold' : 'text-gray-400'
                }`}
                onClick={() => handleTabChange('user')}
              >
                일반 회원 아이디
              </button>
              <button
                className={`flex-1 pb-2 text-center ${
                  activeTab === 'business' ? 'border-b-2 border-gray-500 font-bold' : 'text-gray-400'
                }`}
                onClick={() => handleTabChange('business')}
              >
                사업자 회원 아이디
              </button>
            </div>

            <form
              className="flex flex-col justify-between items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleFindId();
              }}
            >
              <div>
                <div className="mt-[30px]">
                  <label className="block text-gray-700 mb-1 ">이름</label>

                  <input
                    type="text"
                    placeholder="이름을 입력해 주세요."
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: undefined })); // 입력 시 에러 초기화
                    }}
                    className={`w-[352px] h-[48px] pl-[16px] pt-[8px] pb-[8px] border rounded-[8px] focus:outline-none focus:ring-2 ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                <label className="block mt-[20px]  text-gray-700">휴대폰 번호</label>
                <input
                  type="tel"
                  placeholder="휴대폰 번호를 입력해 주세요."
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors((prev) => ({ ...prev, phone: undefined })); // 입력 시 에러 초기화
                  }}
                  className={`w-[352px] h-[48px] pl-[16px] pt-[8px] pb-[8px] border rounded-[8px] mb-1 focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="flex flex-col  rounded ">
                <button
                  type="submit"
                  className="w-[352px] mb-[36px] mt-[120px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
                  disabled={isLoading}
                >
                  {isLoading ? '조회 중...' : '아이디 찾기'}
                </button>
              </div>
            </form>
          </div>
        )}

        {modalType === 'success' && (
          <div className="w-[424px] h-[635px] p-[35px] ">
            <div className="w-[352px] h-[411px] mt-[40px] flex flex-col justify-center">
              <svg
                className="w-[352px] mb-[33px] mt-[33px]"
                width="42"
                height="32"
                viewBox="0 0 44 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.8193 4.67557L39.3818 1.14042C39.2451 0.984168 39.0303 0.906044 38.835 0.906044C38.6201 0.906044 38.4248 0.984168 38.2881 1.14042L14.46 25.1443L5.78808 16.4724C5.63183 16.3162 5.43652 16.2381 5.24121 16.2381C5.0459 16.2381 4.85058 16.3162 4.69433 16.4724L1.21777 19.949C0.905273 20.2615 0.905273 20.7498 1.21777 21.0623L12.1553 31.9998C12.8584 32.7029 13.7178 33.1131 14.4404 33.1131C15.4756 33.1131 16.374 32.3514 16.7061 32.0389H16.7256L42.8389 5.78886C43.1123 5.45682 43.1123 4.96854 42.8193 4.67557Z"
                  fill="#B3916A"
                />
              </svg>

              <div className="text-center">
                <p className="text-xl font-semibold">
                  <span style={{ color: '#B3916A' }}>{name}</span>님의 아이디는
                </p>
                <p className="text-xl font-semibold">
                  <span style={{ color: '#B3916A' }}>{resultEmail}</span>입니다.
                </p>
                <p className="text-[15px] text-gray-500 mt-2">정보 보호를 위해 아이디의 일부만 보여집니다.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className=" w-[352px] h-[48px] mt-[40px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
            >
              확인
            </button>
          </div>
        )}

        {modalType === 'failure' && (
          <div className="w-[424px] h-[635px] p-[30px] flex flex-col items-center">
            {/* <PiWarningCircleFill className="text-[100px] m-[50px] text-[#B3916A]" /> */}
            <div className="flex flex-col items-center w-[352px] h-[411px] mt-[149px]">
              <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M41 0.375C32.9652 0.375 25.1107 2.75761 18.43 7.22155C11.7492 11.6855 6.54222 18.0302 3.46741 25.4535C0.392602 32.8767 -0.411908 41.0451 1.15562 48.9255C2.72314 56.806 6.5923 64.0447 12.2738 69.7262C17.9553 75.4077 25.194 79.2769 33.0745 80.8444C40.955 82.4119 49.1233 81.6074 56.5465 78.5326C63.9698 75.4578 70.3145 70.2508 74.7785 63.57C79.2424 56.8893 81.625 49.0349 81.625 41C81.6136 30.2291 77.3299 19.9026 69.7137 12.2863C62.0975 4.67015 51.7709 0.386374 41 0.375ZM37.875 22.25C37.875 21.4212 38.2043 20.6263 38.7903 20.0403C39.3764 19.4542 40.1712 19.125 41 19.125C41.8288 19.125 42.6237 19.4542 43.2097 20.0403C43.7958 20.6263 44.125 21.4212 44.125 22.25V44.125C44.125 44.9538 43.7958 45.7487 43.2097 46.3347C42.6237 46.9208 41.8288 47.25 41 47.25C40.1712 47.25 39.3764 46.9208 38.7903 46.3347C38.2043 45.7487 37.875 44.9538 37.875 44.125V22.25ZM41 62.875C40.0729 62.875 39.1666 62.6001 38.3958 62.085C37.6249 61.5699 37.0241 60.8379 36.6693 59.9813C36.3145 59.1248 36.2217 58.1823 36.4026 57.273C36.5835 56.3637 37.0299 55.5285 37.6855 54.8729C38.341 54.2174 39.1762 53.7709 40.0855 53.5901C40.9948 53.4092 41.9373 53.502 42.7938 53.8568C43.6504 54.2116 44.3825 54.8124 44.8975 55.5833C45.4126 56.3541 45.6875 57.2604 45.6875 58.1875C45.6875 59.4307 45.1937 60.623 44.3146 61.5021C43.4355 62.3811 42.2432 62.875 41 62.875Z"
                  fill="#B3916A"
                />
              </svg>

              <div className="text-center p-[30px]">
                <p className="text-xl font-semibold m-[4px] font-neutral-700">
                  입력하신 정보와 일치하는 <br /> 아이디가 존재하지 않습니다.
                </p>
                <p className="text-[15px] text-gray-500 mt-[12px]">입력하신 가입 정보를 다시 한 번 확인해 주세요.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-[352px] mt-[120px] mb-[36px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindIdModal;
