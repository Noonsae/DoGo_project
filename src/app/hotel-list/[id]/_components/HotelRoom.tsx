import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/hotel-room/Modal';
import useFormatCurrency from '@/hooks/formatCurrency/useFormatCurrency';

import { RoomType } from '@/types/supabase/room-type';
import { HotelRoomProps } from '@/types/hotel/hotel-room-type';

const HotelRoom = ({ roomsData, getValidImageUrl, roomOption, hotelData }: HotelRoomProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const formatKoreanCurrency = useFormatCurrency();

  const openModal = (room: RoomType) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <section id="rooms" className="scroll-mt-20">
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-4">객실 선택</h2>
        <div>
          <ul className="space-y-6">
            {roomsData.map((room) => (
              <li
                key={room.id}
                className="flex flex-col lg:flex-row items-center bg-[#FAF4EF] p-6 rounded-lg shadow-md gap-6"
              >
                {/* 이미지 영역 */}
                <div className="w-full lg:w-[280px] h-[280px] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getValidImageUrl(room.room_img_url)}
                    alt={room.room_name || 'Default Image'}
                    width={280}
                    height={280}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-4">
                    <div className="w-full flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-800">{room.room_name}</h2>
                      <button
                        className="text-sm text-gray-500 hover:text-gray-800 hover:underline"
                        onClick={() => openModal(room)}
                      >
                        자세히 보기 &gt;
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
                    {/* 객실 옵션 */}
                    <p className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      {(Array.isArray(room.option) ? room.option : []).slice(0, 8).map((opt, idx) => (
                        <span key={idx} className="flex items-center gap-2 text-gray-600">
                          {roomOption}
                          {String(opt)}
                        </span>
                      ))}
                    </p>
                    {/* 예약 버튼 */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <p className="text-sm text-gray-700 mt-1">숙박 가능 인원: 기준 2인 ~ 최대 4인</p>
                        <p className="text-sm text-gray-700 mt-1">체크인: {hotelData.check_in}</p>
                        <p className="text-sm text-gray-700 mt-1">체크아웃: {hotelData.check_out}</p>
                      </div>
                      <div className="mt-5 md:mt-0 text-right">
                        <p className="text-lg font-bold text-gray-900 mb-4">{formatKoreanCurrency(room.price)} / 1박</p>
                        <button className="w-full md:w-[124px] h-[44px] bg-[#B3916A] text-white rounded-lg shadow-md hover:bg-[#8B5E3C]">
                          예약하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {isModalOpen && selectedRoom && <Modal isOpen={isModalOpen} onClose={closeModal} room={selectedRoom} />}
    </div>
  );
};

export default HotelRoom;
