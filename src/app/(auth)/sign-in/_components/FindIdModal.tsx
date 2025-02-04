'use client';

import React, { useEffect, useState } from 'react';
import CheckIcon from '@/components/ui/icon/CheckIcon';
import CloseButtonIcon from '@/components/ui/icon/CloseButtonIcon';
import WarningIcon from '@/components/ui/icon/WarningIcon';

const FindIdModal = ({ onClose }: { onClose: () => void }) => {
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const [form, setForm] = useState({
    name: '',
    phone: '',
    isLoading: false,
    activeTab: 'user',
    modalType: 'input',
    resultEmail: ''
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleFindId = async () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!form.name) {
      newErrors.name = '이름은 필수 입력값입니다.';
    }
    if (!form.phone) {
      newErrors.phone = '휴대폰 번호는 필수 입력값입니다.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setForm((prevForm) => ({
      ...prevForm,
      isLoading: true
    }));

    try {
      const response = await fetch('/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, role: form.activeTab })
      });
      const result = await response.json();

      if (response.ok && result.email) {
        setForm((prevForm) => ({
          ...prevForm,
          resultEmail: result.email,
          modalType: 'success'
        }));
      } else {
        setForm((prevForm) => ({ ...prevForm, modalType: 'failure' }));
      }
    } catch (error) {
      setForm((prevForm) => ({ ...prevForm, modalType: 'failure' }));
    } finally {
      setForm((prevForm) => ({ ...prevForm, isLoading: false }));
    }
  };

  const handleTabChange = (tab: 'user' | 'business') => {
    setForm((prevForm) => ({
      ...prevForm,
      activeTab: tab,
      name: '',
      phone: '',
      modalType: 'input'
    }));

    setErrors({});
  };
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex sm:items-center items-start justify-center z-50 px-0 sm:px-4">
      <div className=" w-full sm:max-w-[424px] min-h-screen sm:min-h-0 sm:h-auto bg-white sm:rounded-lg shadow-lg relative px-4 sm:px-10 sm:py-8 overflow-y-auto">
        <p className=" sm:hidden flex flex-col justify-center items-center text-neutral-800 mt-[30px]">아이디 찾기</p>
        <button
          onClick={onClose}
          className="absolute mt-[20px] sm:mt-[41px] mr-[20px] sm:mr-[41px] top-3 right-3 text-gray-500 hover:text-black font-bold cursor-pointer"
        >
          <CloseButtonIcon />
        </button>

        {form.modalType === 'input' && (
          <div className="flex flex-col h-full justify-center">
            <p className="text-xl sm:text-2xl font-bold mt-[36px] mb-10 sm:mb-[40px]">
              DoGo 가입 정보로 <br /> 아이디를 확인하세요.
            </p>

            <div className="flex border-b-2 w-full max-w-[352px] ">
              <button
                className={`flex-1 pb-2 sm:pb-[10px] text-center ${
                  form.activeTab === 'user'
                    ? 'border-b-2 border-gray-500 font-bold text-neutral-800'
                    : 'text-neutral-400'
                }`}
                onClick={() => handleTabChange('user')}
              >
                일반 회원 아이디
              </button>
              <button
                className={`flex-1 pb-2 sm:pb-[10px] text-center ${
                  form.activeTab === 'business'
                    ? 'border-b-2 border-gray-500 font-bold text-neutral-800'
                    : 'text-neutral-400'
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
                <div className="mt-8 sm:mt-[30px]">
                  <label className="block text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    placeholder="이름을 입력해 주세요."
                    value={form.name}
                    onChange={(e) => {
                      setForm((prevForm) => ({ ...prevForm, name: e.target.value }));
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={`text-[15px] w-full max-w-[352px] h-[48px] pl-4 pt-2 pb-2 border rounded-[8px] focus:outline-none focus:ring-2 ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                    }`}
                  />
                </div>
                <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.name ? 'visible' : 'invisible'}`}>
                  {errors.name || 'placeholder'}
                </p>

                <label className="block mt-4 sm:mt-[20px] text-gray-700">휴대폰 번호</label>
                <input
                  type="text"
                  placeholder="휴대폰 번호를 입력해 주세요."
                  value={form.phone}
                  onChange={(e) => {
                    const formattedPhone = e.target.value.replace(/[^0-9-]/g, '');
                    setForm((prevForm) => ({ ...prevForm, phone: formattedPhone }));
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  className={`text-[15px] w-full max-w-[352px] h-[48px] pl-4 pt-2 pb-2 border rounded-[8px] mb-1 focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.phone ? 'visible' : 'invisible'}`}>
                  {errors.phone || 'placeholder'}
                </p>
              </div>

              <div className="flex flex-col rounded">
                <button
                  type="submit"
                  className="w-full bg-[#B3916A] mt-[100px] sm:mt-[80px]  font-bold text-white py-4 rounded-xl hover:bg-[#a37e5f] transition"
                  disabled={form.isLoading}
                >
                  {form.isLoading ? '조회 중...' : '아이디 찾기'}
                </button>
              </div>
            </form>
          </div>
        )}

        {form.modalType === 'success' && (
          <div className="w-full max-w-[424px] flex flex-col items-center">
            <div className="mt-[142px]">
              <CheckIcon />
            </div>

            <div className="text-center">
              <p className="text-lg sm:text-xl font-semibold">
                <span className="text-[#B3916A]">{form.name}</span>님의 아이디는
              </p>
              <p className="text-lg sm:text-xl font-semibold">
                <span className="text-[#B3916A]">{form.resultEmail}</span>입니다.
              </p>
              <p className="text-sm sm:text-[15px] text-gray-500 mt-2">정보 보호를 위해 아이디의 일부만 보여집니다.</p>
            </div>
            <button
              onClick={onClose}
              className="w-full max-w-[352px] mt-[180px] sm:mt-[180px] bg-[#B3916A] font-bold text-white py-4 rounded-xl hover:bg-[#a37e5f] transition"
            >
              확인
            </button>
          </div>
        )}

        {form.modalType === 'failure' && (
          <div className="w-full max-w-[424px] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center items-center text-center w-full max-w-[352px] h-[411px] mt-[40px]">
                <div className="mb-[13px]">
                  <WarningIcon />
                </div>
                <p className="text-lg sm:text-xl font-semibold text-neutral-700 text-center leading-[135%]">
                  입력하신 정보와 일치하는 <br /> 아이디가 존재하지 않습니다.
                </p>
                <p className="text-sm mt-3 text-neutral-500 text-center leading-[145%]">
                  입력하신 가입 정보를 다시 한 번 확인해 주세요.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white text-center leading-[135%] h-[48px] text-[16px] sm:text-[18px] md:text-[20px] w-full max-w-[352px] mt-[40px] bg-[#B3916A] font-bold py-4 rounded-xl hover:bg-[#a37e5f] transition"
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
