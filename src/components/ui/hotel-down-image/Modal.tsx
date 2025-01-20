'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

interface DownModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  name: string;
}

const DownModal: React.FC<DownModalProps> = ({ isOpen, onClose, images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || images.length === 0) return null;

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

      {/* 모달 */}
      <div className="relative bg-white rounded-lg shadow-lg w-[1124px] h-[767px] overflow-hidden">
        {/* 헤더 */}
        <div className="flex justify-center items-center px-6 bg-gray-900 text-white rounded-t-lg h-[67px]">
          <h2 className="text-lg font-semibold">{name}</h2>
          <IoClose
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            aria-label="Close modal"
          />
        </div>

        {/* 메인 이미지 */}
        <div className="bg-[#FAFAFA] w-full relative flex justify-center items-center h-[540px] ">
          <FiChevronLeft
            onClick={handlePrev}
            className="text-[48px] absolute left-[24px] top-1/2 transform -translate-y-1/2 text-gray-500 bg-white shadow-md rounded-full p-2 hover:shadow-lg hover:text-gray-700 focus:ring cursor-pointer"
            aria-label="Previous image"
          />
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            width={736}
            height={540}
            className="object-contain w-full h-full rounded-md"
          />
          <FiChevronRight
            onClick={handleNext}
            className="text-[48px] absolute right-[24px] top-1/2 transform -translate-y-1/2 text-gray-500 bg-white shadow-md rounded-full p-2 hover:shadow-lg hover:text-gray-700 focus:ring cursor-pointer"
            aria-label="Next image"
          />
          {/* 인덱스 표시 */}
          <div className="flex justify-center items-center absolute bottom-4 right-[24px] w-[65px] h-[27px] text-white bg-gray-500 bg-opacity-60  rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* 미리보기 */}
        <div className="w-[1124px] h-[160px] flex justify-center items-center space-x-2 p-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[120px] h-[120px] rounded-lg overflow-hidden cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-[#B3916A]' : 'opacity-50'
              }`}
              onClick={() => handleSelectImage(index)}
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

export default DownModal;
