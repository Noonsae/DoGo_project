'use client';

import { useEffect, useState } from 'react';
import { Database } from '@/types/supabase/supabase-type';
import IoCloseIcon from '../icon/IoCloseIcon';
import IoCheckmarkCircle from '../icon/IoCheckmarkCircle';
import FiChevronLeftIcon from '../icon/FiChevronLeftIcon';
import FiChevronRightIcon from '../icon/FiChevronRightIcon';
import { useRouter } from 'next/navigation';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg w-[600px] max-w-4xl relative h-[700px] overflow-y-auto scrollbar-hide">
        {/* 닫기 버튼 */}
        <div className="sticky top-0 z-10 bg-[#221A1A] text-white">
          <h2 className="text-xl font-bold p-4 text-center">{room.room_name}</h2>
          <IoCloseIcon onClick={onClose} className="absolute top-4 right-4 text-2xl cursor-pointer" />
        </div>

        {/* 네비게이션 탭 */}
        <nav className="bg-white flex justify-center border-b sticky top-0 z-10">
          {[
            { id: 'info', label: '객실 정보' },
            { id: 'amenities', label: '객실 편의 시설' },
            { id: 'price', label: '가격 상세 정보' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === tab.id ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 콘텐츠 */}
        <div className="p-6 space-y-6">
          {/* 객실 정보 */}
          <section id="info" className="space-y-4">
            <div className="relative w-full h-64 bg-gray-100 rounded-md">
              {(room.room_img_url as string[]).length > 0 ? (
                <>
                  <img
                    src={(room.room_img_url as string[])[currentImageIndex]}
                    alt="Room"
                    className="object-cover w-full h-full rounded-md"
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
                </>
              ) : (
                <p className="flex items-center justify-center w-full h-full text-gray-500">
                  이미지를 불러올 수 없습니다.
                </p>
              )}
            </div>
            <h3 className="text-lg font-semibold">객실 정보</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>{room.bed_type}</li>
              <li>{room.view}</li>
              <li>{room.is_breakfast_included === '포함' ? '조식 포함' : '조식 불포함'}</li>
            </ul>
          </section>

          {/* 객실 편의 시설 */}
          <section id="amenities" className="space-y-4">
            <h3 className="text-lg font-semibold">객실 편의 시설</h3>
            <ul className="grid grid-cols-4 gap-4 text-gray-700">
              {Array.isArray(room.option) && room.option.length > 0 ? (
                room.option.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 p-2">
                    <IoCheckmarkCircle />
                    <span>{item as string}</span>
                  </li>
                ))
              ) : (
                <p className="col-span-2 text-gray-500">객실 편의 시설 정보가 없습니다.</p>
              )}
            </ul>
          </section>

          {/* 가격 상세 정보 */}
          <section id="price" className="space-y-4">
            <h3 className="text-lg font-semibold">가격 상세 정보</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>객실 1개 x 1박</span>
                <span>{room.price.toLocaleString()}원</span>
              </li>
            </ul>
          </section>
        </div>

        {/* 하단 고정 버튼과 가격 */}
        <div className="sticky bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between items-center">
          <p>{room.price.toLocaleString()}원</p>
          <button
            onClick={() => handleBooking(room)}
            className="bg-[#B3916A] text-white py-2 px-6 rounded-md hover:bg-[#8B5E3C]"
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
