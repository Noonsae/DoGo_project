import { FacilitiesType } from '@/types/supabase/facilities-type';
import { HotelType } from '@/types/supabase/hotel-type';
import { ReviewType } from '@/types/supabase/review-type';
import React, { useEffect, useState } from 'react';

type HotelBoxProps = {
  facilityData: FacilitiesType[]; // 시설 데이터 배열
  roomOption: JSX.Element; // JSX 요소 타입
  hotelData: HotelType;
  reviews: ReviewType[];
  allReviews: ReviewType[];
};

const HotelBox = ({ facilityData, roomOption, hotelData, reviews, allReviews }: HotelBoxProps) => {
  const [averageRating, setAverageRating] = useState<number>(0);

  const addressIcon = () => {
    return (
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0.25C3.56234 0.25 0.75 3.00613 0.75 6.37504C0.75 10.9687 7 17.75 7 17.75C7 17.75 13.25 10.9687 13.25 6.37504C13.25 3.00613 10.4377 0.25 7 0.25ZM7 8.56254C5.75016 8.56254 4.76781 7.59984 4.76781 6.37504C4.76781 5.15016 5.75012 4.18754 7 4.18754C8.24988 4.18754 9.23219 5.15016 9.23219 6.37504C9.23219 7.59984 8.24984 8.56254 7 8.56254Z"
          fill="#777777"
        />
      </svg>
    );
  };

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
              {addressIcon()}
              {averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600 ml-2">{allReviews.length}명의 평가</p>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {reviews.length > 0 ? reviews[0].comment : '아직 리뷰가 없습니다.'}
        </p>
      </div>

      {/* 두 번째 박스 */}
      <div className="bg-white rounded-lg p-4 border cursor-pointer w-full">
        <h3 className="text-lg font-bold mb-2">시설/서비스 &gt;</h3>
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
        <h3 className="text-lg font-bold mb-4">위치 정보 &gt;</h3>
        <p className="text-sm text-gray-600 flex items-center gap-1">{hotelData.address}</p>
        <p className="text-sm text-gray-600 flex gap-1 mt-1.5">아오 공항, 숙소에서 차량으로 11분</p>
      </div>
    </div>
  );
};

export default HotelBox;
