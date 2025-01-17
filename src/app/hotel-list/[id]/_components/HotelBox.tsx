import { FacilitiesType } from '@/types/supabase/facilities-type';
import { HotelType } from '@/types/supabase/hotel-type';
import { ReviewType } from '@/types/supabase/review-type';
import React, { useEffect, useState } from 'react';

type HotelBoxProps = {
  facilityData: FacilitiesType[]; // 시설 데이터 배열
  roomOption: JSX.Element; // JSX 요소 타입
  hotelData: HotelType;
  reviews: ReviewType[];
};

const HotelBox = ({ facilityData, roomOption, hotelData, reviews }: HotelBoxProps) => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);

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

  const addressMoveIcon = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.0269 2.53505L2.68708 8.78505C2.43318 8.90615 2.44099 9.26943 2.6988 9.38271L6.57771 11.5741C6.80817 11.703 7.09333 11.6757 7.29255 11.5038L14.941 4.91005C14.9918 4.86708 15.1129 4.78505 15.1597 4.83193C15.2105 4.88271 15.1324 4.9999 15.0894 5.05068L8.47224 12.5038C8.28864 12.7108 8.2613 13.0155 8.40974 13.2499L10.9449 17.3163C11.0699 17.5624 11.4254 17.5585 11.5386 17.3085L17.4683 2.96865C17.5972 2.6874 17.3043 2.40224 17.0269 2.53505Z"
          fill="#777777"
        />
      </svg>
    );
  };

  const LikeMiniIcon = () => {
    return (
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.66683 7.49997H4.16683V17.5H1.66683C1.2066 17.5 0.833496 17.1269 0.833496 16.6667V8.33331C0.833496 7.87307 1.2066 7.49997 1.66683 7.49997ZM6.07757 6.42257L11.4113 1.08884C11.5579 0.942216 11.7901 0.925724 11.9559 1.05013L12.6664 1.583C13.0703 1.88593 13.2523 2.40211 13.1277 2.89138L12.1667 6.66664H17.5002C18.4207 6.66664 19.1668 7.41283 19.1668 8.33331V10.0869C19.1668 10.3047 19.1242 10.5202 19.0413 10.7215L16.4627 16.9839C16.3341 17.2962 16.0297 17.5 15.6921 17.5H6.66683C6.2066 17.5 5.8335 17.1269 5.8335 16.6667V7.01182C5.8335 6.79081 5.9213 6.57885 6.07757 6.42257Z"
          fill="#636363"
        />
      </svg>
    );
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0); // 모든 리뷰의 평점 합
      setAverageRating(totalRating / reviews.length); // 평균 평점 계산
      setReviewCount(reviews.length); // 리뷰 수 설정
    }
  }, [reviews]);

  return (
    <>
      <div className="grid grid-cols-3 gap-7 mt-8 w-[1180px] h-[148px]">
        {/* 첫 번째 박스 */}
        <div
          className="bg-white rounded-lg p-6 border cursor-pointer "
          onClick={() => {
            const targetSection = document.getElementById('reviews'); // 스크롤 대상 섹션의 ID
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
            }
          }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-[#FFE9D5] p-2 rounded-full">
              <span className="text-[#444] w-[65px] h-[18px] font-semibold text-lg flex justify-center items-center">
                {LikeMiniIcon()}
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 ml-2">{reviewCount}명의 평가</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {reviews.length > 0 ? reviews[0].comment : '아직 리뷰가 없습니다.'}
          </p>
        </div>

        {/* 두 번째 박스 */}
        <div
          className="bg-white rounded-lg p-4 border cursor-pointer"
          onClick={() => {
            const targetSection = document.getElementById('services'); // 스크롤 대상 섹션의 ID
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
            }
          }}
        >
          <h3 className="text-lg font-bold mb-2">시설/서비스 &gt;</h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2">
            {facilityData.slice(0, 6).map((facility) => (
              <div key={facility.id} className="flex items-center gap-2 text-gray-700">
                {roomOption}
                <p className="text-sm">{facility.name}</p> {/* 올바른 데이터 출력 */}
              </div>
            ))}
          </div>
        </div>

        {/* 세 번째 박스 */}
        <div
          className="bg-white rounded-lg p-4  border cursor-pointer"
          onClick={() => {
            const targetSection = document.getElementById('location'); // 스크롤 대상 섹션의 ID
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
            }
          }}
        >
          <h3 className="text-lg font-bold mb-4">위치 정보 &gt;</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            {addressIcon()}
            {hotelData.address}
          </p>
          <p className="text-sm text-gray-600 flex gap-1 mt-1.5">
            <span className="-ml-1">{addressMoveIcon()}</span>
            아오 공항, 숙소에서 차량으로 11분
          </p>
        </div>
      </div>
    </>
  );
};

export default HotelBox;
