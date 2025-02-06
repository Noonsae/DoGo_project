import { useState } from 'react';

import Image from 'next/image';

import useFormatCurrency from '@/hooks/formatCurrency/useFormatCurrency';

import { RoomType } from '@/types/supabase/room-type';
import { HotelRoomProps } from '@/types/hotel/hotel-room-type';

import Modal from '@/components/ui/hotel-room/Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import useSearchStore from '@/store/useSearchStore';
import { saveBookingData } from '@/utils/booking/booking';
import Swal from 'sweetalert2';

const HotelRoom = ({ roomsData, getValidImageUrl, roomOption, hotelData }: HotelRoomProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const formatKoreanCurrency = useFormatCurrency();
  const searchParams = useSearchParams();
  const checkIn = useSearchStore((state) => state.checkIn);
  const checkOut = useSearchStore((state) => state.checkOut);
  const stay = useSearchStore((state) => state.stay) ?? 1;
  const month = useSearchStore((state) => state.month);
  const router = useRouter();
  const room_count = searchParams.get('room');

  const handleBooking = (room: RoomType) => {
    if (!checkIn || !checkOut) {
      Swal.fire({
        icon: 'warning',
        title: '기간을 선택해주세요.',
        text: '검색창을 통해 기간 선택 또는 원하시는 일정을 선택해주세요.',
        showCancelButton: true, // 취소 버튼 추가
        confirmButtonColor: '#B3916A', // 확인 버튼 색상
        cancelButtonColor: '#B3916A', // 취소 버튼 색상
        confirmButtonText: '조금 더 둘러볼게요', // 확인 버튼 텍스트
        cancelButtonText: '일정 선택하러 갈래요' // 취소 버튼 텍스트
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = '/hotel-list'; // 호텔 목록 페이지로 이동
        }
      });

      return;
    }

    const newBookingData = {
      checkIn: checkIn,
      checkOut: checkOut,
      stay: stay,
      month: month
    };

    saveBookingData(newBookingData);
    router.push(`/booking?hotel_id=${hotelData.id}&room_id=${room.id}&price=${room.price}&room=${room_count}`);
  };

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
      <section id="rooms" className="scroll-mt-20 mb-[120px]">
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-4 max-[360px]:text-[18px] max-[360px]:ml-[20px]">
          객실 선택
        </h2>
        <div>
          <ul className="space-y-6">
            {roomsData.map((room) => (
              <li key={room.id} className="flex flex-col lg:flex-row items-center bg-[#FAF4EF] p-6 rounded-lg gap-6">
                {/* 이미지 영역 */}
                <h2 className="hidden max-[360px]:block text-[18px] font-semibold text-gray-900 max-[360px]:text-left">
                  {room.room_name}
                </h2>
                <div className="w-full lg:w-[280px] h-[280px] bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 max-[360px]:w-[320px] max-[360px]:h-[220px]">
                  <Image
                    src={getValidImageUrl(room.room_img_url)}
                    alt={room.room_name || 'Default Image'}
                    width={280}
                    height={280}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-4 ">
                    <div className="w-full flex justify-between items-center">
                      <h2 className="text-[28px] font-semibold text-gray-800 max-[360px]:hidden">{room.room_name}</h2>
                      <button
                        className="text-lg text-gray-500 hover:text-gray-800 hover:underline max-[360px]:ml-auto max-[360px]:text-[15px]"
                        onClick={() => openModal(room)}
                      >
                        자세히 보기 &gt;
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col bg-white p-6 rounded-lg max-[360px]:bg-transparent max-[360px]:p-0">
                    {/* 객실 옵션 */}
                    <p className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-[15px] max-[360px]:hidden">
                      {(Array.isArray(room.option) ? room.option : []).slice(0, 8).map((opt, idx) => (
                        <span key={idx} className="flex items-center gap-2 text-gray-600">
                          {roomOption}
                          {String(opt)}
                        </span>
                      ))}
                    </p>
                    {/* 예약 버튼 */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center ">
                      <div className="max-[360px]:bg-white max-[360px]:w-[320px] max-[360px]:px-4 max-[360px]:py-[16.5px] max-[360px]:rounded-lg">
                        <p className="text-base font-semibold text-gray-700 mt-1 max-[360px]:mt-0 max-[360px]:text-[15px] max-[360px]:text-[#444444] max-[360px]:font-medium">
                          숙박 가능 인원{' '}
                          <span className="text-base font-normal text-neutral-600 ml-5 max-[360px]:text-[14px] max-[360px]:text-[#777777]">
                            기준 2인 ~ 최대 4인
                          </span>
                        </p>
                        <p className="text-base font-semibold text-gray-700 mt-1  max-[360px]:mt-0 max-[360px]:text-[15px] max-[360px]:text-[#444444] max-[360px]:font-medium">
                          체크인{' '}
                          <span className="text-base font-normal text-neutral-600 ml-[68px]  max-[360px]:text-[14px] max-[360px]:text-[#777777]">
                            {hotelData.check_in}
                          </span>
                        </p>
                        <p className="text-base font-semibold text-gray-700 mt-1  max-[360px]:mt-0 max-[360px]:text-[15px] max-[360px]:text-[#444444] max-[360px]:font-medium">
                          체크아웃{' '}
                          <span className="text-base font-normal text-neutral-600 ml-[53px]  max-[360px]:text-[14px] max-[360px]:text-[#777777]">
                            {hotelData.check_out}
                          </span>
                        </p>
                      </div>
                      <div className="mt-5 md:mt-0 text-right max-[360px]:bg-white max-[360px]:flex max-[360px]:w-[320px] max-[360px]:justify-between max-[360px]:px-4 max-[360px]:py-3 max-[360px]:items-center max-[360px]:rounded-md">
                        <p className="text-2xl font-semibold text-gray-900 mb-4 max-[360px]:text-[18px] max-[360px]:mb-0 ">
                          {formatKoreanCurrency(room.price * Number(stay))} {''}
                          <span className="text-neutral-500 text-base font-medium max-[360px]:text-[15px]">
                            /{''} {stay}박
                          </span>
                        </p>
                        <button
                          onClick={() => handleBooking(room)} //🔥
                          className="w-full md:w-[124px] h-[44px] text-lg bg-[#B3916A] text-white rounded-lg hover:bg-[#8B5E3C] max-[360px]:w-[88px] max-[360px]:h-[40px]"
                        >
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

      {isModalOpen && selectedRoom && (
        <Modal isOpen={isModalOpen} onClose={closeModal} room={selectedRoom} hotelData={hotelData} />
      )}
    </div>
  );
};

export default HotelRoom;
