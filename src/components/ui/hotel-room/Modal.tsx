'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    room_name: string;
    room_img_url: string;
    options: string[];
    price: number;
    detailed_info: string[];
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, room }) => {
  const [activeTab, setActiveTab] = useState('info');

  if (!isOpen) return null;

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl relative h-[90vh] overflow-y-auto scrollbar-hide">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          ×
        </button>

        {/* 모달 헤더 */}
        <h2 className="text-2xl font-bold text-center mb-6">{room.room_name}</h2>

        {/* 네비게이션 탭 */}
        <nav className="flex justify-center space-x-6 mb-4 border-b">
          {[
            { id: 'info', label: '객실 정보' },
            { id: 'amenities', label: '객실 편의 시설' },
            { id: 'price', label: '가격 상세 정보' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`pb-2 ${
                activeTab === tab.id ? 'border-b-2 border-black text-black font-semibold' : 'text-gray-600'
              }`}
              onClick={() => scrollToSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 콘텐츠 */}
        <div className="space-y-6">
          {/* 객실 정보 */}
          <section id="info" className="space-y-4">
            <div className="flex items-center space-x-4">
              <p className="object-cover rounded-md">이미지위치</p>
              <p className="object-cover rounded-md">이미지위치</p>
              <p className="object-cover rounded-md">이미지위치</p>
              <p className="object-cover rounded-md">이미지위치</p>
              <p className="object-cover rounded-md">이미지위치</p>
              <p className="object-cover rounded-md">이미지위치</p>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">객실 정보</h3>
                <ul className="text-gray-700 list-disc pl-5 space-y-2">
                  {Array.isArray(room.detailed_info) && // 배열인지 확인
                    room.detailed_info.map((info, index) => <li key={index}>{info}</li>)}
                </ul>
                <p>객실정보</p>
                <p>객실정보</p>
                <p>객실정보</p>
                <p>객실정보</p>
                <p>객실정보</p>
                <p>객실정보</p>
                <p>객실정보</p>
                <p>객실정보</p>
                <p>객실정보</p>
                <p>객실정보</p>
              </div>
            </div>
          </section>

          {/* 객실 편의 시설 */}
          <section id="amenities" className="space-y-4">
            <h3 className="text-lg font-semibold">객실 편의 시설</h3>
            <ul className="grid grid-cols-2 gap-4 text-gray-700">
              {Array.isArray(room.options) && // 배열인지 확인
                room.options.map((option, index) => (
                  <li key={index} className="flex items-center space-x-2 border p-2 rounded-md">
                    <span>✔️</span>
                    <span>{option}</span>
                  </li>
                ))}
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
              <p>편의시설</p>
            </ul>
          </section>

          {/* 가격 상세 정보 */}
          <section id="price" className="space-y-4">
            <h3 className="text-lg font-semibold">가격 상세 정보</h3>
            <p className="text-gray-700">₩{room.price.toLocaleString()} / 1박</p>
            <button className="w-full bg-[#B3916A] text-white py-2 rounded-md hover:bg-[#8B5E3C]">예약하기</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Modal;
