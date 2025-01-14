import { RoomType } from '@/types/supabase/room-type';
import Image from 'next/image';
import React from 'react';

type HotelRoomProps = {
  roomsData: RoomType[]; // Supabase의 rooms 타입
  getValidImageUrl: (roomImgUrls: RoomType['room_img_url']) => string; // 이미지 처리 함수
  roomOption: React.ReactNode; // SVG 또는 JSX 노드
  formatKoreanCurrency: (price: number) => string; // 가격 포맷 함수
  Modal: React.ComponentType<{ children: React.ReactNode }>; // Modal 컴포넌트 타입
};

const HotelRoom = ({ roomsData, getValidImageUrl, roomOption, formatKoreanCurrency, Modal }: HotelRoomProps) => {
  return (
    <div>
      <section id="rooms" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">객실 선택</h2>
        <div className="w-[1200px] h-full">
          <ul className="space-y-6">
            {roomsData.map((room) => (
              <li key={room.id} className="flex items-center bg-[#FAF4EF] p-6 rounded-lg shadow-md">
                {/* 객실 이미지 */}
                <div className="w-[280px] h-[280px] bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={getValidImageUrl(room.room_img_url)}
                    alt={room.room_name || 'Default Image'}
                    width={280}
                    height={280}
                    className="object-cover w-[280px] h-[280px]"
                  />
                </div>
                <div className="ml-6 flex flex-col w-[824px] bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{room.room_name}</h2>
                    <Modal>
                      <button className="text-sm text-gray-500 hover:text-gray-800 hover:underline">
                        자세히 보기 &gt;
                      </button>
                    </Modal>
                  </div>
                  <p className="grid grid-cols-4 gap-4 mb-4 text-sm">
                    {(Array.isArray(room.option) ? room.option : []).slice(0, 8).map((opt, idx) => (
                      <span key={idx} className="flex items-center gap-2 text-gray-600">
                        {roomOption} {/* SVG 아이콘 */}
                        {String(opt)}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">숙박 가능 인원: 기준 2인 ~ 최대 4인</p>
                  <p className="text-sm text-gray-700 mb-2">체크인: 00:00</p>
                  <p className="text-sm text-gray-700 mb-4">체크아웃: 00:00</p>
                  <p className="text-lg font-bold text-gray-900 mb-4 flex justify-end">
                    {formatKoreanCurrency(room.price)} / 1박
                  </p>
                  <div className="flex justify-end">
                    <button className="w-[124px] h-[44px] bg-[#B3916A] text-white rounded-lg shadow-md hover:bg-[#8B5E3C]">
                      예약하기
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HotelRoom;
