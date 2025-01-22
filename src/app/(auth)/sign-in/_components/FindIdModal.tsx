'use client';

import React, { useEffect, useState } from 'react';

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
        <button
          onClick={onClose}
          className="absolute mt-[41px] mr-[41px] top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.59094 6.5L13.0441 2.04687C13.2554 1.8359 13.3743 1.54962 13.3745 1.25099C13.3748 0.95237 13.2564 0.665874 13.0455 0.45453C12.8345 0.243185 12.5482 0.124305 12.2496 0.124041C11.951 0.123778 11.6645 0.242152 11.4531 0.453123L7 4.90625L2.54687 0.453123C2.33553 0.241779 2.04888 0.123047 1.75 0.123047C1.45111 0.123047 1.16447 0.241779 0.953123 0.453123C0.741779 0.664468 0.623047 0.951112 0.623047 1.25C0.623047 1.54888 0.741779 1.83553 0.953123 2.04687L5.40625 6.5L0.953123 10.9531C0.741779 11.1645 0.623047 11.4511 0.623047 11.75C0.623047 12.0489 0.741779 12.3355 0.953123 12.5469C1.16447 12.7582 1.45111 12.8769 1.75 12.8769C2.04888 12.8769 2.33553 12.7582 2.54687 12.5469L7 8.09375L11.4531 12.5469C11.6645 12.7582 11.9511 12.8769 12.25 12.8769C12.5489 12.8769 12.8355 12.7582 13.0469 12.5469C13.2582 12.3355 13.3769 12.0489 13.3769 11.75C13.3769 11.4511 13.2582 11.1645 13.0469 10.9531L8.59094 6.5Z"
              fill="#444444"
            />
          </svg>
        </button>

        {modalType === 'input' && (
          <div className="m-10 flex flex-col h-full">
            <h1 className="text-2xl font-bold mt-[50px] mb-[50px]">
              DoGo 가입 정보로 <br /> 아이디를 확인하세요.
            </h1>

            <div className="flex mb-4 border-b-2">
              <button
                className={`flex-1 pb-2 text-center ${
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
              className="flex flex-col justify-between"
              onSubmit={(e) => {
                e.preventDefault();
                handleFindId();
              }}
            >
              <div>
                <label className="block text-gray-700 mb-1">이름</label>

                <input
                  type="text"
                  placeholder="이름을 입력해 주세요."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: undefined })); // 입력 시 에러 초기화
                  }}
                  className={`w-full p-[13px] border rounded-xl mb-2 focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                <label className="block text-gray-700 mb-1">휴대폰 번호</label>
                <input
                  type="tel"
                  placeholder="휴대폰 번호를 입력해 주세요."
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors((prev) => ({ ...prev, phone: undefined })); // 입력 시 에러 초기화
                  }}
                  className={`w-full p-[13px] border rounded-xl mb-2 focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="flex flex-col  rounded">
                <button
                  type="submit"
                  className="w-full bg-[#B3916A]  mt-[120px] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
                  disabled={isLoading}
                >
                  {isLoading ? '조회 중...' : '아이디 찾기'}
                </button>
              </div>
            </form>
          </div>
        )}

        {modalType === 'success' && (
          <div className="w-[424px] h-[635px] p-[30px] flex flex-col items-center">
            {/* <IoIosCheckmark className="text-[150px] text-[#B3916A]" /> */}
            <div className="mt-[142px] p-[33px]">
              <svg width="42" height="32" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.9967 1.54214L10.1717 0.693701C10.1389 0.656201 10.0873 0.637451 10.0404 0.637451C9.98887 0.637451 9.94199 0.656201 9.90918 0.693701L4.19043 6.45464L2.10918 4.37339C2.07168 4.33589 2.0248 4.31714 1.97793 4.31714C1.93105 4.31714 1.88418 4.33589 1.84668 4.37339L1.0123 5.20776C0.937305 5.28276 0.937305 5.39995 1.0123 5.47495L3.6373 8.09995C3.80605 8.2687 4.0123 8.36714 4.18574 8.36714C4.43418 8.36714 4.6498 8.18433 4.72949 8.10933H4.73418L11.0014 1.80933C11.067 1.72964 11.067 1.61245 10.9967 1.54214Z"
                  fill="#B3916A"
                />
              </svg>
            </div>

            <div className="text-center">
              <p className="text-xl font-semibold">
                <span style={{ color: '#B3916A' }}>{name}</span>님의 아이디는
              </p>
              <p className="text-xl font-semibold">
                <span style={{ color: '#B3916A' }}>{resultEmail}</span>입니다.
              </p>
              <p className="text-[15px] text-gray-500 mt-2">정보 보호를 위해 아이디의 일부만 보여집니다.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-[180px] bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
            >
              확인
            </button>
          </div>
        )}

        {modalType === 'failure' && (
          <div className="w-[424px] mt-[50px] h-[635px] flex flex-col items-center justify-center p-[30px]">
            {/* <PiWarningCircleFill className="text-[100px] m-[50px] text-[#B3916A]" /> */}

            <svg width="81" height="81" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0.75C8.07164 0.75 6.18657 1.32183 4.58319 2.39317C2.97982 3.46451 1.73013 4.98726 0.992179 6.76884C0.254225 8.55042 0.061142 10.5108 0.437348 12.4021C0.813554 14.2934 1.74215 16.0307 3.10571 17.3943C4.46928 18.7579 6.20656 19.6865 8.09787 20.0627C9.98919 20.4389 11.9496 20.2458 13.7312 19.5078C15.5127 18.7699 17.0355 17.5202 18.1068 15.9168C19.1782 14.3134 19.75 12.4284 19.75 10.5C19.7473 7.91498 18.7192 5.43661 16.8913 3.60872C15.0634 1.78084 12.585 0.75273 10 0.75ZM9.25 6C9.25 5.80109 9.32902 5.61032 9.46967 5.46967C9.61033 5.32902 9.80109 5.25 10 5.25C10.1989 5.25 10.3897 5.32902 10.5303 5.46967C10.671 5.61032 10.75 5.80109 10.75 6V11.25C10.75 11.4489 10.671 11.6397 10.5303 11.7803C10.3897 11.921 10.1989 12 10 12C9.80109 12 9.61033 11.921 9.46967 11.7803C9.32902 11.6397 9.25 11.4489 9.25 11.25V6ZM10 15.75C9.7775 15.75 9.55999 15.684 9.37499 15.5604C9.18998 15.4368 9.04579 15.2611 8.96064 15.0555C8.87549 14.85 8.85321 14.6238 8.89662 14.4055C8.94003 14.1873 9.04718 13.9868 9.20451 13.8295C9.36184 13.6722 9.5623 13.565 9.78053 13.5216C9.99876 13.4782 10.225 13.5005 10.4305 13.5856C10.6361 13.6708 10.8118 13.815 10.9354 14C11.059 14.185 11.125 14.4025 11.125 14.625C11.125 14.9234 11.0065 15.2095 10.7955 15.4205C10.5845 15.6315 10.2984 15.75 10 15.75Z"
                fill="#B3916A"
              />
            </svg>

            <div className="text-center p-[30px]">
              <p className="text-xl font-semibold">
                입력하신 정보와 일치하는 <br /> 아이디가 존재하지 않습니다.
              </p>
              <p className="text-[15px] text-gray-500 mt-3">입력하신 가입 정보를 다시 한 번 확인해 주세요.</p>
            </div>
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

export default FindIdModal;
