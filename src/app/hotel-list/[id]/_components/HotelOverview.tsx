import UpModal from '@/components/ui/hotel-up-image/Modal';
import { HotelType } from '@/types/supabase/hotel-type';
import Image from 'next/image';
import React, { useState } from 'react';
import RenderStars from '../../_components/RenderStars';

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
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section
      id="overview"
      className="scroll-mt-20 w-full max-w-[1200px] mx-auto px-[50px] lg:px-[30px] xl:px-[20px] 2xl:px-0"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* 메인 이미지 */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <Image
            src={hotelData.main_img_url || '/placeholder.png'}
            alt={hotelData.name || 'Default Image'}
            width={594}
            height={363}
            className="object-cover w-full h-full cursor-pointer"
            onClick={() => openModal(hotelData.main_img_url)}
          />
        </div>
        {/* 추가 이미지 */}
        <div className="grid grid-cols-2 gap-2">
          {Array.isArray(hotelData.hotel_img_urls) &&
            hotelData.hotel_img_urls.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative  rounded-lg  overflow-hidden cursor-pointer"
                onClick={() => openModal(image as string)}
              >
                <div className="w-full max-w-[300px] sm:w-[240px] md:w-[270px] lg:w-[300px] min-w-[300px] aspect-[16/9]">
                  <Image
                    src={image as string}
                    alt={`Image ${index + 1}`}
                    width={291}
                    height={175}
                    className="object-cover"
                  />
                </div>
                {index === 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(hotelId);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-md ${
                      favoriteStatus[hotelId] ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                    }`}
                  >
                    {favoriteStatus[hotelId] ? '❤️' : '🤍'}
                  </button>
                )}
                {index === 3 && (
                  <div className="absolute bottom-2 right-2 px-3 py-1 bg-[#777] text-white text-sm rounded-full">
                    +26
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {/* 호텔 정보 */}
      <div className="mt-4 text-center lg:text-left">
        <h2 className="text-2xl font-bold">{hotelData.name}</h2>
        <div className="mt-2">
          <RenderStars rating={hotelData.stars} />
        </div>
        <p className="mt-2 text-gray-700">{hotelData.description}</p>
      </div>
      {/* 모달 */}
      <UpModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={
          Array.isArray(hotelData?.hotel_img_urls)
            ? (hotelData.hotel_img_urls.filter((url) => typeof url === 'string') as string[])
            : []
        }
        name={hotelData?.name || ''}
      />
    </section>
  );
};

export default HotelOverview;
