'use client';

import { useEffect, useState } from 'react';
import CloseButtonIcon from '../icon/CloseButtonIcon';
import FiChevronLeftIcon from '../icon/FiChevronLeftIcon';
import FiChevronRightIcon from '../icon/FiChevronRightIcon';

interface EnlargedImageModalProps {
  imageUrls: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}

const EnlargedImageModal = ({ imageUrls, isOpen, onClose, initialIndex }: EnlargedImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentIndex(initialIndex); // 모달이 열릴 때 현재 인덱스 업데이트
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, initialIndex]);

  if (!isOpen) return null;

  const showNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const showPreviousImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90">
      {/* 상단 헤더 */}
      <div className="w-full h-[56px] bg-[#221A1A] flex items-center justify-between px-4">
        <span className="text-white font-bold text-[18px]">이미지 확대</span>
        <button onClick={onClose} className="text-white">
          <CloseButtonIcon />
        </button>
      </div>

      {/* 확대된 이미지 */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <button onClick={showPreviousImage} className="absolute left-4 p-2 bg-white rounded-full shadow-md">
          <FiChevronLeftIcon />
        </button>
        <img src={imageUrls[currentIndex]} alt="확대된 이미지" className="w-full h-auto object-contain p-4" />
        <button onClick={showNextImage} className="absolute right-4 p-2 bg-white rounded-full shadow-md">
          <FiChevronRightIcon />
        </button>
      </div>

      {/* 하단 페이지 네이션 */}
      <div className="absolute right-4 bottom-4 w-[65px] h-[27px] text-white bg-neutral-600 rounded-full text-sm flex justify-center items-center">
        {currentIndex + 1} / {imageUrls.length}
      </div>
    </div>
  );
};

export default EnlargedImageModal;
