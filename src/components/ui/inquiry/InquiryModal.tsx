//문의하기 모달 UI 컴포넌트
import React, { useRef, useState } from 'react';
import CloseButtonIcon from '../icon/CloseButtonIcon';

import InquiryCategory from './InquiryCategory';
import InquiryForm from './InquiryForm';
interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel_id?: string;
}
const InquiryModal = ({ isOpen, onClose, hotel_id }: InquiryModalProps) => {
  if (!isOpen) return null;
  const [category, setCategory] = useState<string>('');
  const formRef = useRef<{ submit: () => void } | null>(null);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] h-auto">
        <div className="flex items-center justify-between bg-[#221A1A] text-white px-5 py-4 rounded-t-lg">
          <div className="flex flex-col justify-center items-center w-full">
            <p className="text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-center leading-[135%] text-[#FDF9F4] ml-6">
              문의하기
            </p>
          </div>
          <button onClick={onClose}>
            <CloseButtonIcon className="text-white" />
          </button>
        </div>
        <div className="mt-4 w-full max-w-[536px] mx-auto px-4 sm:px-6">
          <div className="mt-4">
            <label className="mt-[60px] flex flex-row text-sm font-semibold mb-1 text-[#221A1A]">
              <p className="text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold leading-[135%] text-[#444]">
                카테고리 선택
              </p>
              <span className="ml-1 text-red-500">*</span>
            </label>
            <InquiryCategory onCategoryChange={setCategory} />
          </div>

          <InquiryForm ref={formRef} category={category} hotel_id={hotel_id || ''} />
        </div>

        <div className="p-4 mt-6 flex justify-end">
          <button
            type="button"
            className="flex w-[117px] h-[44px] px-6 py-2 items-center gap-2 sm:w-[130px] md:w-[140px] lg:w-[140px] text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[135%] text-center justify-center bg-[#B08968] text-white rounded-lg font-semibold hover:bg-[#8E6B4A] transition"
            onClick={() => formRef.current?.submit()}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
