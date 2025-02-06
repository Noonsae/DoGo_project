'use client';

import { useEffect, useState } from 'react';
import { Database } from '@/types/supabase/supabase-type';
import IoCloseIcon from '../icon/IoCloseIcon';
import IoCheckmarkCircle from '../icon/IoCheckmarkCircle';
import FiChevronLeftIcon from '../icon/FiChevronLeftIcon';
import FiChevronRightIcon from '../icon/FiChevronRightIcon';
import { useRouter } from 'next/navigation';
import CloseButtonIcon from '../icon/CloseButtonIcon';
type RoomType = Database['public']['Tables']['rooms']['Row'];
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomType;
  hotelData: { id: string };
}
const Modal = ({ isOpen, onClose, room, hotelData }: ModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(id); // 활성 탭 설정
    } else {
      console.error(`섹션을 찾을 수 없습니다: ${id}`);
    }
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (room.room_img_url as string[]).length);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? (room.room_img_url as string[]).length - 1 : prevIndex - 1));
  };
  const router = useRouter();
  const handleBooking = (room: RoomType) => {
    router.push(`/booking?hotel_id=${hotelData.id}&room_id=${room.id}&price=${room.price}`);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#221A1A] bg-opacity-30 ">
      <div className=" bg-white rounded shadow-lg w-full h-full md:w-[600px] md:h-[700px] max-w-4xl overflow-y-auto scrollbar-hide">
        <div className="w-full sticky top-0 z-10 bg-[#221A1A] text-[#FDF9F4] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold text-center">
          <div className="h-[56px] sm:h-[67px] flex items-center justify-between px-4 py-2 w-full bg-[#221A1A] text-[#FDF9F4] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold">
            <div className="flex-1 text-center">{room.room_name}</div>
            <button
              onClick={onClose}
              className="ml-auto flex items-center justify-center text-[#FDF9F4] font-bold cursor-pointer p-2"
            >
              <CloseButtonIcon />
            </button>
          </div>
          <nav className="bg-white flex border-b sticky top-0 z-10">
            {[
              { id: 'info', label: '객실 정보' },
              { id: 'amenities', label: '객실 편의 시설' },
              { id: 'price', label: '가격 상세 정보' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-3 text-sm text-[16px] font-medium focus:font-semibold ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#B3916A] text-[#B3916A]'
                    : 'text-neutral-900 hover:text-[#000000]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="space-y-6">
          <section id="info" className="space-y-4">
            <div className="relative w-full h-[240px] md:h-64 bg-gray-100">
              {Array.isArray(room.room_img_url) && room.room_img_url.length > 0 ? (
                <>
                  <img
                    src={(room.room_img_url as string[])[currentImageIndex]}
                    alt="Room"
                    className="object-cover w-full h-full md:w-[calc(100%-64px)] md:mx-8"
                  />
                  <button
                    onClick={showPreviousImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <FiChevronLeftIcon />
                  </button>
                  <button
                    onClick={showNextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <FiChevronRightIcon />
                  </button>
                  <div className="absolute right-10 w-[65px] h-[27px] text-white bg-neutral-600 rounded-full text-sm flex justify-center items-center top-[202px] md:top-[215px] mb-[10px] md:mb-0">
                    {currentImageIndex + 1} / {room.room_img_url.length}
                  </div>
                </>
              ) : (
                <p className="flex items-center justify-center w-full h-full text-gray-500">
                  이미지를 불러올 수 없습니다.
                </p>
              )}
            </div>
            <div className="p-6 m-0">
              <p className="text-lg font-semibold text-[20px] sm:text-[22px]">객실 정보</p>
              <ul className="list-disc pl-6 text-gray-700 mt-[20px]">
                <li className="mb-[8px]">{room.bed_type}</li>
                <li className="mb-[8px]">{room.view}</li>
                <li className="mb-[16px]">{room.is_breakfast_included === '포함' ? '조식 포함' : '조식 불포함'}</li>
              </ul>
            </div>
          </section>
          <section id="amenities" className="space-y-4 p-6 mt-0">
            <h3 className="font-semibold text-[20px] sm:text-[22px]">객실 편의 시설</h3>
            <ul className="grid grid-cols-3 md:grid-cols-4 text-gray-700">
              {Array.isArray(room.option) && room.option.length > 0 ? (
                room.option.map((item, index) => (
                  <li key={index} className="text-[14px] flex items-center space-x-2 p-2">
                    <IoCheckmarkCircle />
                    <span>{item as string}</span>
                  </li>
                ))
              ) : (
                <p className="col-span-2 text-gray-500">객실 편의 시설 정보가 없습니다.</p>
              )}
            </ul>
          </section>
          <section id="price" className="space-y-4 p-6">
            <h3 className="text-lg font-semibold text-[20px] sm:text-[22px]">가격 상세 정보</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span className="text-[16px] sm:text-[18px]">객실 1개 x 1박</span>
                <span className="text-[16px] sm:text-[16px]">{room.price.toLocaleString()}원</span>
              </li>
            </ul>
          </section>
        </div>
        <div className="sticky bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between items-center">
          <p className="text-neutral-900 text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-semibold">
            {room.price.toLocaleString()}원{' '}
            <span className="ml-1 sm:ml-2 md:ml-4 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-medium text-neutral-500">
              /1박
            </span>
          </p>
          <button
            onClick={() => handleBooking(room)}
            className="text-[16px] sm:text-[18px] md:text-[20px] bg-[#B3916A] text-white py-2 px-6 rounded-md hover:bg-[#8B5E3C]"
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
