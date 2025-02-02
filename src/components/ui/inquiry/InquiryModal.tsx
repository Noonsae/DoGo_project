//문의하기 모달 UI 컴포넌트
import React, { useRef, useState } from 'react';
import CloseButtonIcon from '../icon/CloseButtonIcon';

import InquiryCategory from './InquiryCategory';
import InquiryForm from './InquiryForm';
interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const InquiryModal = ({ isOpen, onClose }: InquiryModalProps) => {
  if (!isOpen) return null;
  const [category, setCategory] = useState<string>('');
  const formRef = useRef<{ submit: () => void } | null>(null);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full h-auto">
        {/* 상단 바 (제목 & 닫기 버튼) */}
        <div className=" flex items-center justify-between bg-[#221A1A] text-white px-5 py-4 rounded-t-lg">
          <p className="ml-[32px] text-lg font-semibold">문의하기</p>
          <button onClick={onClose}>
            <CloseButtonIcon />
          </button>
        </div>
        <div className="mt-4 w-full max-w-[480px] mx-auto">
          {/* 카테고리 선택 */}
          <div className="mt-4">
            <label className="flex flex-row text-sm font-semibold mb-1 text-[#221A1A]">
              <p className="text-[#444] font-pretendard text-[16px] font-semibold leading-[135%] sm:text-[14px]">
                카테고리 선택
              </p>
              <span className="ml-[4px] text-red-500 ">*</span>
            </label>
            <InquiryCategory onCategoryChange={setCategory} />
          </div>

          {/* 문의 입력 폼 */}
          <InquiryForm ref={formRef} category={category} />
        </div>
        {/* 등록하기 버튼 */}
        <div className="p-4 mt-[24px] flex justify-end">
          <button
            type="button"
            className="w-[117px] bg-[#B08968] text-white py-3 rounded-lg font-semibold hover:bg-[#8E6B4A] transition"
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
