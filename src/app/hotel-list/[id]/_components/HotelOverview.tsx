import React, { useState } from 'react';

import Image from 'next/image';

import { HotelOverviewProps } from '@/types/hotel/hotel-overview-type';

import UpModal from '@/components/ui/hotel-up-image/Modal';
import RenderStars from '../../_components/RenderStars';

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
      className="scroll-mt-20 w-full mt-[60px] max-w-[1200px] mx-auto px-[50px] max-[360px]:mt-0 max-[360px]:px-0"
    >
      <div className="flex flex-col lg:flex-row gap-[12px]">
        {/* 메인 이미지 */}
        <div
          className="relative overflow-hidden rounded-[16px_0_0_16px] max-[360px]:rounded-none 
             max-[360px]:w-full max-[360px]:h-[260px] shadow-md"
        >
          <Image
            src={validImage(hotelData.main_img_url)}
            alt={hotelData.name || 'Default Image'}
            width={594} // 명확한 크기 설정
            height={363}
            className="object-cover h-[363px] max-[360px]:h-[260px]"
            onClick={() => openModal(validImage(hotelData.main_img_url))}
          />
          {Array.isArray(hotelData.hotel_img_urls) && (
            <div
              className="absolute bottom-2 right-2 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-full 
                  hidden max-[360px]:block"
            >
              +{hotelData.hotel_img_urls.length}
            </div>
          )}
        </div>

        {/* 추가 이미지 */}
        <div className="grid grid-cols-2 gap-[12px] max-[360px]:hidden">
          {(Array.isArray(hotelData.hotel_img_urls) ? hotelData.hotel_img_urls : [])
            .slice(1, 5)
            .filter((image): image is string => typeof image === 'string')
            .map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden"
                style={{
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
                  className="object-cover h-[175px]"
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
                {index === 3 && Array.isArray(hotelData.hotel_img_urls) && (
                  <div className="absolute bottom-2 right-2 px-3 py-1 bg-[#777] text-white text-sm rounded-full">
                    +{hotelData.hotel_img_urls.length}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {/* 호텔 정보 */}
      <div className="mt-4 text-center lg:text-left max-[360px]:px-[20px]">
        <div className="flex mt-2 max-[360px]:justify-between max-[360px]:items-center max-[360px]:mt-3">
          <h2 className="text-neutral-900 text-[28px] font-semibold max-[360px]:text-[20px] max-[360px]:w-[85%] max-[360px]:text-left ">
            {hotelData.name || 'Hotel Name'}
          </h2>
          <span className="flex justify-center items-center ml-2 max-[360px]:absolute max-[360px]:bottom-[220px] max-[360px]:left-3">
            <RenderStars stars={hotelData.stars} />
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(hotelId);
            }}
            className={` ml-[30px] p-2 rounded-full shadow-md bg-white text-gray-600 hidden max-[360px]:block ${
              favoriteStatus[hotelId] ? 'active' : ''
            }`}
          >
            {favoriteStatus[hotelId] ? '❤️' : '🤍'}
          </button>
        </div>
        <p className="mt-2 text-gray-700 max-[360px]:flex max-[360px]:mt-6 max-[360px]:text-left max-[360px]:w-[85%]">
          {hotelData.description || 'No description available.'}
        </p>
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
