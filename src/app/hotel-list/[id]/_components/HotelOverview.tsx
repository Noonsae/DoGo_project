import UpModal from '@/components/ui/hotel-up-image/Modal';
import { HotelType } from '@/types/supabase/hotel-type';
import Image from 'next/image';
import React, { useState } from 'react';

interface HotelOverviewProps {
  hotelData: HotelType; // HotelType에 대한 정의를 가져옵니다.
  toggleFavorite: (hotelId: string) => void; // 즐겨찾기 토글 함수
  hotelId: string; // 호텔 ID
  favoriteStatus: Record<string, boolean>; // 즐겨찾기 상태를 담은 객체
}

const HotelOverview = ({ hotelData, toggleFavorite, hotelId, favoriteStatus }: HotelOverviewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    console.log('openModal 호출됨, 이미지:', image); // 이미지 URL 출력
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <section id="overview" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">{hotelData.name}</h2>
        <p className="mb-6">{hotelData.description}</p>
        <div className="flex gap-4">
          <div className="rounded-lg shadow-md overflow-hidden relative">
            <Image
              src={hotelData.main_img_url || '/placeholder.png'}
              alt={hotelData.name || 'Default Image'}
              width={594}
              height={363}
              className="object-cover block rounded-md"
              onClick={() => openModal(hotelData.main_img_url)}
            />

            <button
              onClick={() => {
                toggleFavorite(hotelId); // 즐겨찾기 버튼 클릭 시 상태 토글
              }}
              className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${
                favoriteStatus[hotelId] ? 'bg-white text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {favoriteStatus[hotelId] ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 w-[594px] h-[363px]">
            {/* hotel_img_urls가 배열일 때만 slice를 사용 */}
            {Array.isArray(hotelData.hotel_img_urls) &&
              hotelData.hotel_img_urls.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative bg-gray-200 rounded-lg shadow-md overflow-hidden"
                  style={{ width: '291px', height: '190px' }}
                  onClick={() => openModal(image as string)}
                >
                  <Image
                    src={image as string}
                    alt={`Image ${index + 1}`}
                    width={291}
                    height={175.5}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              ))}
          </div>
        </div>
        <UpModal
          isOpen={isModalOpen}
          onClose={closeModal}
          images={
            Array.isArray(hotelData?.hotel_img_urls)
              ? (hotelData.hotel_img_urls.filter((url) => typeof url === 'string') as string[])
              : []
          }
          name={hotelData?.name || ''} // name 컬럼 전달
        />
      </section>
    </div>
  );
};

export default HotelOverview;
