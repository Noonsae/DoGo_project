'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useHotels } from '@/hooks/useHotels';

import HotelByViewSkeletonUI from '@/components/ui/skeleton/HotelByViewSkeletonUI';

const HotelByView = () => {
  const [selectedViews, setSelectedViews] = useState<string | null>(`all`);

  // React Query 훅 사용
  const { data: hotels, isLoading, isError, error } = useHotels();

  // 로딩 중 상태 처리
  if (isLoading) {
    return <HotelByViewSkeletonUI />;
  }
  const handleBtnClick = (id: string) => {
    setSelectedViews(id);
  };

  const Views = [
    { id: `all`, label: `전체` },
    { id: `city`, label: `시티뷰` },
    { id: `ocean`, label: `오션뷰` },
    { id: `mountain`, label: `마운틴뷰` },
    { id: `river`, label: `리버뷰` }
  ];

  return (
    <section className="box-border w-full max-w-[1300px] px-[50px] mx-auto h-[850px] py-[80px] pb-[120px]">
      <h3 className="text-[24px] font-semibold">객실 뷰가 아름다운 호텔</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45]">
        휴식을 취하면서 바라보는 아름다운 뷰는 힐링하는데 큰 도움을 줄 수 있어요.
      </p>

      {/* 슬라이드로 구현될 예정 */}
      {/* 슬라이드로 구현될 예정 */}
      <div className="flex flex-row gap-2">
        {Views.map((select) => (
          <button
            key={select.id}
            type="button"
            onClick={() => handleBtnClick(select.id)}
            className={`w-[80px] h-[44px] mr-[12px] mt-[28px] border border-[#CDCDCD] rounded-[8px] text-[18px] font-semibold outline-none transition duration-200 ${
              selectedViews === select.id
                ? 'bg-[#B3916A] text-white'
                : 'bg-[#fff] text-[#777] font-medium hover:bg-[#8F7455] hover:text-[#fff] active:bg-[#6B573F]'
            }`}
          >
            {select.label}
          </button>
        ))}
      </div>

      <div className="w-full h-[488px] overflow-hidden flex flex-row flex-wrap justify-between items-center gap-[30px] mt-8">
        {hotels?.map((hotel) => (
          <div
            key={hotel.id}
            className="w-[380px] h-[484px] p-[16px] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]"
          >
            <Image
              src={hotel.main_img_url || ''}
              width={348}
              height={282}
              alt={'호텔 메인 이미지'}
              className="w-full h-[282px] rounded-[12px]"
            />
            <h3 className="mt-[12px]">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.address}</p>

            <p className="mt-[11px] text-[#D9D9D9]">
              ⭐ {hotel.stars}
              <span className="text-[#9E9E9E]"> (3,222) </span>
            </p>
            <p className="w-full mt-[24px] text-right text-[24px]-black font-semibold">
              <span className="text-base text-[#5b5b5b] font-medium mr-1">Sale%</span>
              <span>최솟값 구하는 함수 만들어야 함</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelByView;
