import NearMeIcon from '@/components/ui/icon/NearMeIcon';
import PinIcon from '@/components/ui/icon/PinIcon';
import RatingIcon from '@/components/ui/icon/RatingIcon';
import { HotelBoxProps } from '@/types/hotel/hotel-box-type';
import React, { useEffect, useState } from 'react';

const HotelBox = ({ facilityData, roomOption, hotelData, reviews, allReviews }: HotelBoxProps) => {
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(totalRating / reviews.length);
    }
  }, [reviews]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-8 w-full max-w-[1180px] mx-auto">
      {/* 첫 번째 박스 */}
      <div className="bg-white rounded-lg p-6 border cursor-pointer w-full">
        <div className="flex items-center mb-4">
          <div className="bg-[#FFE9D5] p-2 rounded-full">
            <span className="text-[#444] w-[65px] h-[18px] font-semibold text-lg flex justify-center items-center">
              {RatingIcon()}
              {averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-base font-semibold text-gray-600 ml-2">{allReviews.length}명의 평가</p>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {reviews.length > 0 ? reviews[0].comment : '아직 리뷰가 없습니다.'}
        </p>
      </div>

      {/* 두 번째 박스 */}
      <div className="bg-white rounded-lg p-4 border cursor-pointer w-full">
        <h3 className="text-neutral-800 text-base font-semibold mb-2">시설/서비스 &gt;</h3>
        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
          {facilityData.slice(0, 6).map((facility) => (
            <div key={facility.id} className="flex items-center gap-2 text-gray-700">
              {roomOption}
              <p className="text-sm">{facility.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 세 번째 박스 */}
      <div className="bg-white rounded-lg p-4 border cursor-pointer w-full">
        <h3 className="text-neutral-800 text-base font-semibold mb-4">위치 정보 &gt;</h3>
        <p className="text-sm text-neutral-500 flex items-center gap-1">
          {PinIcon()}
          {hotelData.address}{' '}
        </p>
        <p className="text-sm text-gray-600 flex gap-1 mt-1.5">{NearMeIcon()}아오 공항, 숙소에서 차량으로 11분</p>
      </div>
    </div>
  );
};

export default HotelBox;
