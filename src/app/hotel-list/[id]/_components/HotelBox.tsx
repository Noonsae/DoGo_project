import React, { useEffect, useState } from 'react';

import { HotelBoxProps } from '@/types/hotel/hotel-box-type';

import NearMeIcon from '@/components/ui/icon/NearMeIcon';
import PinIcon from '@/components/ui/icon/PinIcon';
import RatingIcon from '@/components/ui/icon/RatingIcon';
import useAverageRating from '@/hooks/hotel/useAverageRating';
import CheckCircle from '@/components/ui/icon/CheckCircle';

const HotelBox = ({ facilityData, roomOption, hotelData, reviews, allReviews }: HotelBoxProps) => {
  const averageRating = useAverageRating(reviews);

  const getTotalCount = () => {
    const facilityCount = facilityData?.length ?? 0; // 시설 개수 (배열이면 개수 가져오기)
    const serviceCount = Array.isArray(roomOption)
      ? roomOption.length
      : typeof roomOption === 'object'
      ? Object.keys(roomOption).length
      : 0;

    return facilityCount + serviceCount;
  };

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full max-w-[1180px] mx-auto"
      style={{ marginBottom: window.innerWidth <= 360 ? '0px' : '120px' }}
    >
      {/* 모바일 360px UI */}
      <div className="hidden max-[360px]:block  mb-4 px-5">
        <div className="flex items-center">
          <p className="text-[#232527] w-[65px] h-[18px] font-semibold text-base  flex justify-center items-center gap-2">
            <RatingIcon className="w-[18px] h-[18px]" fill="#EEC18D" />
            {averageRating.toFixed(1)}
          </p>
          <li className="text-base font-medium text-[#636363] ml-1 text-[15px]">{allReviews.length}명의 평가 &gt;</li>
        </div>

        <div>
          <p className=" flex ml-[5px] mt-2 gap-1 items-center text-[#636363] text-[15px]">
            <CheckCircle />총 {getTotalCount()}개의 시설/서비스 &gt;
          </p>
        </div>

        <div>
          <p className="flex mt-2 ml-[3px] text-[#636363] text-[15px]">
            <PinIcon />
            {hotelData.address} &gt;
          </p>
        </div>
      </div>

      <div className="hidden max-[360px]:block border-b-[10px]" />

      {/* 첫 번째 박스 */}
      <div className="bg-white rounded-lg p-6 border cursor-pointer w-full max-[360px]:hidden">
        <div className="flex items-center mb-4">
          <div className="bg-[#FFE9D5] p-2 rounded-full">
            <span className="text-[#444] w-[65px] h-[18px] font-semibold text-lg flex justify-center items-center">
              <RatingIcon className="" />
              {averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-base font-semibold text-gray-600 ml-2">{allReviews.length}명의 평가</p>
        </div>
        <p className="text-[15px] text-gray-600 mb-4">
          {reviews.length > 0 ? reviews[0].comment : '아직 리뷰가 없습니다.'}
        </p>
      </div>

      {/* 두 번째 박스 */}
      <div className="bg-white rounded-lg p-4 border cursor-pointer w-full max-[360px]:hidden">
        <h3 className="text-neutral-800 text-base font-semibold mb-2">시설/서비스 &gt;</h3>
        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
          {facilityData.slice(0, 6).map((facility) => (
            <div key={facility.id} className="flex items-center gap-2 text-gray-700">
              {roomOption}
              <p className="text-[15px]">{facility.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 세 번째 박스 */}
      <div className="bg-white rounded-lg p-4 border cursor-pointer w-full max-[360px]:hidden">
        <h3 className="text-neutral-800 text-base font-semibold mb-4">위치 정보 &gt;</h3>
        <p className="text-[15px] text-neutral-500 flex items-center gap-1">
          {PinIcon()}
          {hotelData.address}{' '}
        </p>
        <p className="text-[15px] text-gray-600 flex gap-1 mt-1.5">{NearMeIcon()}아오 공항, 숙소에서 차량으로 11분</p>
      </div>
    </div>
  );
};

export default HotelBox;
