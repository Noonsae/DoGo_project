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
  const [category, setCategory] = useState<string>('호텔 시설 관련 문의');
  const formRef = useRef<{ submit: () => void } | null>(null);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] h-[687px] max-w-md relative p-6">
        <div className="sticky top-0 z-10 bg-[#221A1A] text-white">
          <p className="text-lg font-semibold">문의하기</p>
          <button onClick={onClose}>
            <CloseButtonIcon />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-1">카테고리 선택 *</label>
          <InquiryCategory onCategoryChange={setCategory} />
        </div>

        <InquiryForm ref={formRef} category={category} />

        <div className="p-4 flex justify-end">
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
