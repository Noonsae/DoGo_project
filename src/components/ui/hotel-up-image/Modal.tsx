'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import FiChevronLeftIcon from '../icon/FiChevronLeftIcon';
import FiChevronRightIcon from '../icon/FiChevronRightIcon';
import IoCloseIcon from '../icon/IoCloseIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  name: string;
}

const UpModal = ({ isOpen, onClose, images = [], name }: ModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setCurrentIndex(0);
      setSelectedImage(null);
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
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[1124px] h-full overflow-hidden md:w-[1124px] md:h-[767px] md:max-h-[767px]">
        <div className="flex items-center px-6 bg-[#221A1A] text-white rounded-t-lg h-[56px] md:h-[67px] relative">
          {/* 이름 (가운데 정렬) */}
          <h2 className="flex-1 text-center text-lg font-semibold">{name}</h2>

          {/* 닫기 버튼 (우측 정렬 유지) */}
          <IoCloseIcon
            onClick={onClose}
            className="absolute right-3 text-xl cursor-pointer md:right-4 md:text-2xl"
            aria-label="Close modal"
          />
        </div>

        <div className="block md:hidden w-full h-full overflow-y-auto px-5 py-4">
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
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="hidden md:flex flex-col items-center">
          <div className="bg-[#FAFAFA] w-full relative flex justify-center items-center h-[540px]">
            <button
              onClick={handlePrev}
              className="text-[48px] absolute left-[24px] top-1/2 transform -translate-y-1/2 text-gray-500 bg-white shadow-md rounded-full p-2 hover:shadow-lg hover:text-gray-700 focus:ring cursor-pointer"
              aria-label="Previous image"
            />
            <FiChevronLeftIcon />

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

            <div className="absolute bottom-4 right-[24px] w-[65px] h-[27px] text-white bg-gray-500 bg-opacity-60 rounded-full text-sm flex justify-center items-center">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-[20px]">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleSelectImage(index)}
                className={`w-[120px] h-[120px] rounded-lg overflow-hidden cursor-pointer ${
                  index === currentIndex ? 'ring-1 ring-[#B3916A]' : 'opacity-50'
                }`}
              >
                <Image
                  src={image}
                  alt={`Preview ${index + 1}`}
                  width={152}
                  height={152}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 모바일 확대 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90">
          {/* 상단 닫기 버튼 */}
          <div className="w-full h-[56px] bg-[#221A1A] flex items-center justify-between px-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="w-full text-white flex justify-end pr-[16px] pt-[16px]"
            >
              <IoCloseIcon />
            </button>
          </div>

          {/* 확대된 이미지 */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="확대된 이미지"
              width={360}
              height={480}
              quality={100}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
//
export default UpModal;
