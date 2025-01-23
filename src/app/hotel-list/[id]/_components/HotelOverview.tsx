import UpModal from '@/components/ui/hotel-up-image/Modal';
import { HotelType } from '@/types/supabase/hotel-type';
import Image from 'next/image';
import React, { useState } from 'react';
import RenderStars from '../../_components/RenderStars';

interface HotelOverviewProps {
  hotelData: HotelType;
  toggleFavorite: (hotelId: string) => void;
  hotelId: string;
  favoriteStatus: Record<string, boolean>;
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

  const validImage = (image: string | undefined) => {
    return image && typeof image === 'string' ? image : '/placeholder.webp';
  };

  return (
    <section
      id="overview"
      className="scroll-mt-20 w-full max-w-[1200px] mx-auto px-[50px] lg:px-[30px] xl:px-[20px] 2xl:px-0"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* 메인 이미지 */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '16/9',
            borderRadius: '16px 0 0 16px', // 좌측 상단과 좌측 하단 둥글게
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' // 그림자 추가
          }}
        >
          <Image
            src={validImage(hotelData.main_img_url)}
            alt={hotelData.name || 'Default Image'}
            width={594} // 명확한 크기 설정
            height={363}
            className="object-cover"
            onClick={() => openModal(validImage(hotelData.main_img_url))}
          />
        </div>

        {/* 추가 이미지 */}
        <div className="grid grid-cols-2 gap-2">
          {(Array.isArray(hotelData.hotel_img_urls) ? hotelData.hotel_img_urls : [])
            .slice(1, 5)
            .filter((image): image is string => typeof image === 'string')
            .map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '16/9',
                  borderRadius:
                    index === 1
                      ? '0 16px 0 0' // 두 번째 이미지: 우측 상단 둥글게
                      : index === 3
                      ? '0 0 16px 0' // 네 번째 이미지: 우측 하단 둥글게
                      : '0', // 나머지: 직선 처리
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' // 그림자 추가
                }}
                onClick={() => openModal(image)}
              >
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={291} // 명확한 크기 설정
                  height={175}
                  className="object-cover"
                />
                {index === 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(hotelId);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-md bg-white text-gray-600 ${
                      favoriteStatus[hotelId] ? 'active' : ''
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
        <h2 className="text-2xl font-bold">{hotelData.name || 'Hotel Name'}</h2>
        <div className="mt-2">
          <RenderStars rating={hotelData.stars} />
        </div>
        <p className="mt-2 text-gray-700">{hotelData.description || 'No description available.'}</p>
      </div>
      {/* 모달 */}
      <UpModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={
          Array.isArray(hotelData?.hotel_img_urls)
            ? hotelData.hotel_img_urls.filter((url): url is string => typeof url === 'string')
            : []
        }
        name={hotelData?.name || 'Default Name'}
      />
    </section>
  );
};

export default HotelOverview;
