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
      <div
        className="w-full sm:max-w-[424px] p-5 sm:p-9 min-h-screen sm:min-h-0 sm:h-auto bg-white sm:rounded-lg shadow-lg relative overflow-y-auto
"
      >
        <div className="mt-[14px] w-full flex items-center justify-center relative">
          {/* 아이디 찾기 (모바일에서만 보임, 가운데 정렬) */}
          <p className=" absolute inset-0 flex items-center justify-center text-neutral-800 text-lg sm:text-xl font-semibold sm:hidden">
            아이디 찾기
          </p>

          {/* 닫기 버튼 (우측 정렬 유지) */}
          <button
            onClick={onClose}
            className="absolute right-1 text-neutral-800 hover:text-black font-bold cursor-pointer"
          >
            <CloseButtonIcon />
          </button>
        </div>

        {form.modalType === 'input' && (
          <div className="flex flex-col h-full justify-center">
            <p className="mt-[38px] text-neutral-900 text-xl sm:text-2xl font-bold sm:mt-[24px] mb-10 sm:mb-[24px]">
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
                  <label className="block text-neutral-800 mb-[4px] sm:mb-[8px] font-semibold">이름</label>

                  <input
                    type="text"
                    placeholder="이름을 입력해 주세요."
                    value={form.name}
                    onChange={(e) => {
                      setForm((prevForm) => ({ ...prevForm, name: e.target.value }));
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={`gap-[4px] text-[15px] text-neutral-800 w-full max-w-[352px] h-[48px] pl-4 pt-2 pb-2 border rounded-[8px] focus:outline-none focus:ring-1 border-[#B3916A] ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-[#B3916A] focus:ring-[#B3916A]'
                    }`}
                  />
                </div>
                <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.name ? 'visible' : 'invisible'}`}>
                  {errors.name || 'placeholder'}
                </p>

                <label className="text-neutral-800 font-semibold block mt-4 sm:mt-[20px] mb-[4px] sm:mb-[8px]">
                  {' '}
                  {form.activeTab === 'user' ? '휴대폰 번호' : '담당자 번호'}
                </label>
                <input
                  type="text"
                  placeholder="휴대폰 번호를 입력해 주세요."
                  value={form.phone}
                  onChange={(e) => {
                    const formattedPhone = e.target.value.replace(/[^0-9-]/g, '');
                    setForm((prevForm) => ({ ...prevForm, phone: formattedPhone }));
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  className={`gap-[4px] text-neutral-800 text-[15px] w-full max-w-[352px] h-[48px] pl-4 pt-2 pb-2 border rounded-[8px] mb-1 focus:outline-none focus:ring-1 ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[#B3916A] focus:ring-[#B3916A]'
                  }`}
                />
                <p className={`text-sm text-red-500 mt-1 min-h-[10px] ${errors.phone ? 'visible' : 'invisible'}`}>
                  {errors.phone || 'placeholder'}
                </p>
              </div>

              <div className="flex flex-col rounded mt-[169px] sm:mt-[80px]">
                <button
                  type="submit"
                  className="flex flex-col justify-center items-center text-white text-center text-[18px] sm:text-[20px] font-semibold leading-[135%] w-full bg-[#B3916A] h-[48px]  py-4 rounded-xl hover:bg-[#a37e5f] transition"
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
            </div>
            <button
              onClick={onClose}
              className="h-[48px] flex flex-col justify-center items-center text-[20px] leading-[27px] font-semibold text-center text-white mt-[286px] w-full max-w-[352px] sm:mt-[180px] bg-[#B3916A] py-4 rounded-xl hover:bg-[#a37e5f] transition"
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
                <p className="text-lg sm:text-xl font-semibold text-neutral-800 text-center leading-[135%]">
                  입력하신 정보와 일치하는 <br /> 아이디가 존재하지 않습니다.
                </p>
                <p className="text-sm mt-3 text-neutral-800 text-center leading-[145%]">
                  입력하신 가입 정보를 다시 한 번 확인해 주세요.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-[48px] flex felx-col justify-center items-center mt-[166px] text-[18px] sm:text-[20px] text-white text-center leading-[135%] md:text-[20px] w-full max-w-[352px] sm:mt-[40px] bg-[#B3916A] font-bold py-4 rounded-xl hover:bg-[#a37e5f] transition"
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
