'use client';

import React, { useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { PiWarningCircleFill } from 'react-icons/pi';
import Swal from 'sweetalert2';
const FindIdModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'business'>('user');
  const [modalType, setModalType] = useState<'input' | 'success' | 'failure'>('input'); // 모달 상태 구분
  const [resultEmail, setResultEmail] = useState('');

  const maskEmail = (email: string): string => {
    if (!email.includes('@')) {
      console.error('Invalid email format:', email);
      return '유효하지 않은 이메일';
    }

    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart.slice(0, 3) + '***';
    return `${maskedLocal}@${domain}`;
  };

  const handleFindId = async () => {
    if (!name || !phone) {
      Swal.fire({
        icon: 'error',
        title: '입력 오류',
        text: '이름과 휴대폰 번호를 모두 입력해주세요.'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, type: activeTab })
      });
      const result = await response.json();

      if (response.ok && result.email) {
        setResultEmail(maskEmail(result.email));
        setModalType('success');
      } else {
        setModalType('failure'); // 실패 모달로 전환
      }
    } catch (error) {
      console.error('아이디 찾기 실패:', error);
      setModalType('failure');
    } finally {
      setIsLoading(false);
    }
  };
  //// 커밋용 주석
  const handleTabChange = (tab: 'user' | 'business') => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[424px] h-[635px] bg-white rounded-lg shadow-lg relative">
        <IoClose
          onClick={onClose}
          className="text-[30px] absolute top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
        />

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
              className="flex-grow flex flex-col justify-between"
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
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-[13px] border rounded-xl border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <label className="block text-gray-700 mb-1">휴대폰 번호</label>
                <input
                  type="tel"
                  placeholder="휴대폰 번호를 입력해 주세요."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full  p-[13px] border rounded-xl  border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex flex-col py-[60px] rounded mt-auto">
                <button
                  type="submit"
                  className="w-full bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
                  disabled={isLoading}
                >
                  {isLoading ? '조회 중...' : '아이디 찾기'}
                </button>
              </div>
            </form>
          </div>
        )}

        {modalType === 'success' && (
          <div className="w-[424px] h-[635px] p-[35px] flex flex-col items-center">
            <IoIosCheckmark className="text-[150px] text-[#B3916A]" />
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
              className="w-full mt-auto bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
            >
              확인
            </button>
          </div>
        )}

        {modalType === 'failure' && (
          <div className="w-[424px] h-[635px] p-[30px] flex flex-col items-center">
            <PiWarningCircleFill className="text-[100px] m-[50px] text-[#B3916A]" />
            <div className="text-center p-[30px]">
              <p className="text-xl font-semibold">
                입력하신 정보와 일치하는 <br /> 아이디가 존재하지 않습니다.
              </p>
              <p className="text-[15px] text-gray-500 mt-3">입력하신 가입 정보를 다시 한 번 확인해 주세요.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-auto bg-[#B3916A] font-bold text-white py-[15px] rounded-xl hover:bg-[#a37e5f] transition"
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
