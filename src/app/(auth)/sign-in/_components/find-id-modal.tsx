'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';

const FindIdModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'business'>('user');
  const [isResultVisible, setIsResultVisible] = useState(false); // 결과 화면 표시 상태
  const [resultEmail, setResultEmail] = useState(''); // 결과 이메일 저장

  const handleFindId = async () => {
    if (!name || !phone) {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '이름과 휴대폰 번호를 입력해주세요.'
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
        setResultEmail(result.email); // 결과 이메일 저장
        setIsResultVisible(true); // 결과 화면으로 전환
      } else {
        Swal.fire({
          icon: 'error',
          title: '아이디 찾기 실패',
          text: '입력한 정보와 일치하는 이메일을 찾을 수 없습니다.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '서버 오류',
        text: '아이디 찾기 중 문제가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: 'user' | 'business') => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold">
          ×
        </button>

        {/* 입력 폼 */}
        {!isResultVisible ? (
          <>
            {/* 제목 */}
            <h1 className="text-2xl font-bold mb-6">DoGo 가입 정보로 아이디를 확인하세요.</h1>
            {/* 탭 버튼 */}
            <div className="flex mb-4">
              <button
                className={`flex-1 pb-2 text-center ${
                  activeTab === 'user' ? 'border-b-2 border-black font-bold' : 'text-gray-400'
                }`}
                onClick={() => handleTabChange('user')}
              >
                일반 회원 아이디
              </button>
              <button
                className={`flex-1 pb-2 text-center ${
                  activeTab === 'business' ? 'border-b-2 border-black font-bold' : 'text-gray-400'
                }`}
                onClick={() => handleTabChange('business')}
              >
                사업자 회원 아이디
              </button>
            </div>
            {/* 입력 필드 */}
            <form
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
                  className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <label className="block text-gray-700 mb-1">휴대폰 번호</label>
                <input
                  type="tel"
                  placeholder="휴대폰 번호를 입력해 주세요."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              {/* 아이디 찾기 버튼 */}
              <button
                type="submit"
                className="w-full bg-[#7C7C7C] text-white py-2 rounded hover:bg-[#a3a3a3] transition"
                disabled={isLoading}
              >
                {isLoading ? '조회 중...' : '아이디 찾기'}
              </button>
            </form>
          </>
        ) : (
          // 결과 화면
          <>
            <div className="text-center">
              <div className="text-green-500 text-4xl mb-4">✔</div>
              <h2 className="text-lg font-bold mb-2">{name}님의 아이디는</h2>
              <p className="text-xl text-gray-800 font-semibold">{resultEmail}</p>
              <p className="text-sm text-gray-500 mt-2">정보 보호를 위해 아이디의 일부만 보여집니다.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-[#7C7C7C] text-white py-2 rounded hover:bg-[#a3a3a3] transition mt-6"
            >
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FindIdModal;
