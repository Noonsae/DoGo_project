'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FiChevronLeftIcon from '../icon/FiChevronLeftIcon';
import FiChevronRightIcon from '../icon/FiChevronRightIcon';
import IoCloseIcon from '../icon/IoCloseIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[]; // hotel_img_url 배열
  name: string; // 호텔 이름
}

const UpModal = ({ isOpen, onClose, images = [], name }: ModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setCurrentIndex(0);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleSelectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#221A1A] bg-opacity-40">
      {/* 스크롤 방지 */}
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>

      {/* 모달 콘텐츠 */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[1124px] h-full max-h-[767px] overflow-hidden md:w-[1124px] md:h-[767px] md:max-h-[767px]">
        {/* 헤더 */}
        <div className="flex justify-center items-center px-6 bg-[#231815] text-white rounded-t-lg h-[50px] md:h-[67px]">
          <h2 className="text-lg font-semibold">{name}</h2>
          <IoCloseIcon
            onClick={onClose}
            className="absolute top-3 right-3 text-xl cursor-pointer md:top-4 md:right-4 md:text-2xl"
            aria-label="Close modal"
          />
        </div>

        <div className="md:hidden overflow-y-auto px-5 flex justify-center mt-[16px]">
          <div className="grid grid-cols-2 gap-[16px]">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Hotel Image ${index + 1}`}
                width={152}
                height={152}
                quality={100}
                className="w-full h-auto rounded-md mb-2"
              />
            ))}
          </div>
        </div>

        <div className="hidden md:flex bg-[#FAFAFA] w-full relative justify-center items-center h-[540px]">
          <button
            onClick={handlePrev}
            className="text-[48px] absolute left-[24px] top-1/2 transform -translate-y-1/2 text-gray-500 bg-white shadow-md rounded-full p-2 hover:shadow-lg hover:text-gray-700 focus:ring cursor-pointer"
            aria-label="Previous image"
          >
            <FiChevronLeftIcon />
          </button>
          <Image
            src={images[currentIndex]}
            alt={`Hotel Image ${currentIndex + 1}`}
            width={736}
            height={540}
            quality={100}
            className="object-contain w-full h-full rounded-md"
          />
          <button
            onClick={handleNext}
            className="text-[48px] absolute right-[24px] top-1/2 transform -translate-y-1/2 text-gray-500 bg-white shadow-md rounded-full p-2 hover:shadow-lg hover:text-gray-700 focus:ring cursor-pointer"
            aria-label="Next image"
          >
            <FiChevronRightIcon />
          </button>

          {/* 하단 인덱스 */}
          <div className="absolute bottom-4 right-[24px] w-[65px] h-[27px] text-white bg-gray-500 bg-opacity-60 rounded-full text-sm flex justify-center items-center">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* 🌟 데스크탑 썸네일 (모바일에서는 숨김) */}
        <div className="hidden md:flex justify-center items-center space-x-2 p-4 mt-[20px]">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleSelectImage(index)}
              className={`w-[120px] h-[120px] rounded-lg overflow-hidden cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-[#B3916A]' : 'opacity-50'
              }`}
            >
              <Image
                src={image}
                alt={`Preview ${index + 1}`}
                width={120}
                height={120}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpModal;
