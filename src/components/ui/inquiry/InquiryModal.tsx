//문의하기 모달 UI 컴포넌트
import { useEffect, useRef, useState } from 'react';
import CloseButtonIcon from '../icon/CloseButtonIcon';

import InquiryCategory from './InquiryCategory';
import InquiryForm from './InquiryForm';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel_id?: string;
}
const InquiryModal = ({ isOpen, onClose, hotel_id }: InquiryModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  const [category, setCategory] = useState<string>('');
  const formRef = useRef<{ submit: () => void } | null>(null);
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      {/* 🌟 모바일: w-full h-full로 화면을 가득 채움 */}
      <div className=" bg-white w-full h-full max-w-none sm:max-w-[500px] md:max-w-[600px] sm:h-auto rounded-none sm:rounded-lg shadow-lg overflow-auto">
        {/* 헤더 */}
        <div className="h-[67px] relative bg-[#221A1A] text-white px-5 py-4 rounded-none sm:rounded-t-lg flex items-center justify-center">
          {/* 제목 + 닫기 버튼을 flex 정렬 */}
          <p className="text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-center text-[#FDF9F4]">
            문의하기
          </p>
          <button onClick={onClose} className="absolute top-1/2 right-4 transform -translate-y-1/2 ">
            <CloseButtonIcon className="text-white" />
          </button>
        </div>

        {/* 폼 */}
        <div className=" w-full max-w-[536px] mx-auto">
          <InquiryCategory onCategoryChange={setCategory} />

          <InquiryForm ref={formRef} category={category} hotel_id={hotel_id || ''} />
        </div>

        {/* 등록 버튼 */}
        <div className="px-[32px] py-[24px] sm:py-[16px] sm:px-[20px] mt-6 flex justify-end">
          <button
            type="button"
            className=" px-[24px] py-[8px] text-[18px] w-[117px] sm:w-[111px] h-[44px] flex items-center gap-2 leading-[135%] text-center justify-center bg-[#B08968] text-white rounded-lg font-semibold hover:bg-[#8E6B4A] transition"
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
