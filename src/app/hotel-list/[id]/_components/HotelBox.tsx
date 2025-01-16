import { FacilitiesType } from '@/types/supabase/facilities-type';
import React from 'react';

type HotelBoxProps = {
  facilityData: FacilitiesType[]; // 시설 데이터 배열
  roomOption: JSX.Element; // JSX 요소 타입
};

const HotelBox = ({ facilityData, roomOption }: HotelBoxProps) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-7 mt-8 w-[1180px] h-[148px]">
        {/* 첫 번째 박스 */}
        <div
          className="bg-white rounded-lg p-4  border cursor-pointer"
          onClick={() => {
            const targetSection = document.getElementById('reviews'); // 스크롤 대상 섹션의 ID
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
            }
          }}
        >
          <h3 className="text-lg font-bold mb-4">{}명의 평가 &gt;</h3>
          <p className="text-sm text-gray-600">여기에 베스트 리뷰 정보를 입력하세요.</p>
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
          <p className="text-sm text-gray-600">여기에 베스트 리뷰 정보를 입력하세요.</p>
        </div>
      </div>
    </>
  );
};

export default HotelBox;
