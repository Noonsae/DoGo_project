'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[]; // hotel_img_url 배열
  name: string; // 호텔 이름
}

const UpModal = ({ isOpen, onClose, images = [], name }: ModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

  console.log('Modal Props:', { isOpen, images });

  if (!isOpen || !images || images.length === 0) {
    console.log('모달이 렌더링되지 않음:', { isOpen, images });
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
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-[900px] max-h-[80%] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex justify-center items-center px-6 py-4 bg-gray-900 text-white rounded-t-lg">
          <h2 className="text-lg font-semibold ">{name}</h2>
          <IoClose
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            aria-label="Close modal"
          />
        </div>

        {/* 메인 이미지 */}
        <div className="relative flex justify-center items-center p-4">
          <FiChevronLeft
            onClick={handlePrev}
            className="text-[50px] absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 bg-white shadow-md rounded-full p-2 hover:shadow-lg hover:text-gray-700 focus:ring cursor-pointer "
            aria-label="Previous image"
          />

          <Image
            src={images[currentIndex]}
            alt={`Hotel Image ${currentIndex + 1}`}
            width={600}
            height={400}
            className="object-contain max-h-[400px] rounded-md"
          />
          <FiChevronRight
            onClick={handleNext}
            className="text-[50px] absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 bg-white shadow-md rounded-full p-2 hover:shadow-lg hover:text-gray-700 focus:ring cursor-pointer "
            aria-label="Next image"
          />
          {/* 하단 인덱스 */}
          <div className="m-[10px] h-[23px] absolute bottom-4 right-4 text-sm text-white bg-gray-500 bg-opacity-60 px-3  rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* 미리보기 */}
        <div className="flex justify-center items-center space-x-2 p-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleSelectImage(index)}
              className={`border-2 ${
                index === currentIndex ? 'border-gray-900' : 'border-transparent'
              } rounded-lg overflow-hidden`}
            >
              <Image
                src={image}
                alt={`Preview ${index + 1}`}
                width={100}
                height={75}
                className={`object-cover ${index === currentIndex ? 'opacity-100' : 'opacity-50'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpModal;
