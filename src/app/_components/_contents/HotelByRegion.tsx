'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useHotels } from '@/hooks/useHotels';
import HotelByRegionSkeletonUI from './_skeletonUI/HotelByRegionSkeletonUI';


const HotelByRegion = () => {
  const [selectedRegions, setSelectedRegions] = useState<string | null>(`all`);

  // React Query 훅 사용
  const { data: hotels, isLoading, isError, error } = useHotels();

  // 로딩 중 상태 처리
  if (isLoading) {
    return <HotelByRegionSkeletonUI />;
  }

  const handleBtnClick = (id: string) => {
    setSelectedRegions(id);
  };

  const regions = [
    { id: `all`, label: `전체` },
    { id: `seoul`, label: `서울` },
    { id: `incheon`, label: `인천` },
    { id: `Gwangju`, label: `광주` },
    { id: `daegu`, label: `대구` },
    { id: `daejeon`, label: `대전` },
    { id: `busan`, label: `부산` },
    { id: `jeju`, label: `제주` }
  ];

  return (
    <section className="w-full max-w-[1300px] px-[50px] mx-auto h-[850px] py-[80px] pb-[120px]">
      <h3 className="text-[24px] font-semibold">많은 회원이 높은 평가를 준 호텔</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45]">
        지역별로 인기가 가장 많았던 호텔을 추천해 드릴게요.
      </p>

      {/* 슬라이드로 구현될 예정 */}
      <div className="flex flex-row gap-2">
        {regions.map((select) => (
          <button
            key={select.id}
            type="button"
            onClick={() => handleBtnClick(select.id)}
            className={`w-[80px] h-[44px] mr-[12px] mt-[28px] border border-[#CDCDCD] rounded-[8px] text-[18px] font-semibold outline-none transition duration-200 ${
              selectedRegions === select.id
                ? 'bg-[#B3916A] text-white'
                : 'bg-[#fff] text-[#777] font-medium hover:bg-[#8F7455] hover:text-[#fff] active:bg-[#6B573F]'
            }`}
          >
            {select.label}
          </button>
        ))}
      </div>

      <div className="flex flex-row justify-between items-center gap-8 mt-8">
        <div className="p-[16px] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
          <div className="w-[348px] h-[282px] py-[130px] bg-[#F4F4F4] rounded-[12px] text-center">(이미지영역)</div>
          <h4 className="mt-[12px]">Title</h4>
          <p>광주광역시 서구 유촌동</p>
          <p className="mt-[11px]">
            <span className="text-[#D9D9D9]">★</span>
            4.8
            <span className="text-[#9E9E9E]"> (3,222) </span>
          </p>
          <p className="w-full mt-[24px] text-right text-[24px]-black font-semibold">
            <span className="text-base text-[#5b5b5b] font-medium mr-1">Sale%</span>
            192,000원
          </p>
        </div>
      </div>
    </section>
  );
};

export default HotelByRegion;
