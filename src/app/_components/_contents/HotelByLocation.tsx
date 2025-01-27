'use client';

import { useState } from 'react';

import useHotelsByLocation from '@/hooks/hotel/useHotelsByLocation';

import HotelByLocationSkeletonUI from '@/components/ui/skeleton/HotelByLocationSkeletonUI';
import HotelListSlider from '@/components/ui/slider/HotelListSlider';
import { locations } from '@/constants/constant';

const HotelByLocation = () => {
  const [selectedLocations, setSelectedLocations] = useState<string>(`all`);

  // React Query 훅 사용
  const { data: hotels, isLoading, isError, error } = useHotelsByLocation(selectedLocations);

  // 로딩 중 상태 처리
  if (isLoading) {
    return <HotelByLocationSkeletonUI />;
  }

  // 에러 처리
  if (isError) {
    return <div className="text-red-500">호텔 데이터를 불러오는 중 오류가 발생했습니다. {error.message}</div>;
  }

  const handleBtnClick = (id: string) => {
    setSelectedLocations(id);
  };

  return (
    <section className="w-full max-w-[1300px] h-[850px] px-[50px] mx-auto  py-[80px] pb-[120px]">
      <h3 className="text-[24px] font-semibold">많은 회원이 높은 평가를 준 호텔</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45]">
        지역별로 인기가 가장 많았던 호텔을 추천해 드릴게요.
      </p>

      {/* 슬라이드로 구현될 예정 */}
      <div className="flex flex-row gap-2">
        {locations.map((location) => (
          <button
            key={location.id}
            type="button"
            onClick={() => handleBtnClick(location.id)}
            className={`w-[80px] h-[44px] mr-[12px] mt-[28px] border border-[#CDCDCD] rounded-[8px] text-[18px] font-semibold outline-none transition duration-200 ${
              selectedLocations === location.id
                ? 'bg-[#B3916A] text-white'
                : 'bg-[#fff] text-[#777] font-medium hover:bg-[#8F7455] hover:text-[#fff] active:bg-[#6B573F]'
            }`}
          >
            {location.label}
          </button>
        ))}
      </div>

      <HotelListSlider hotels={hotels ?? []} />
    </section>
  );
};

export default HotelByLocation;
