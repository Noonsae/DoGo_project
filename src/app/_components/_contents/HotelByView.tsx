'use client';

import { useState } from 'react';

import useHotelsByView from '@/hooks/hotel/useHotelsByView';

import HotelByViewSkeletonUI from '@/components/ui/skeleton/HotelByViewSkeletonUI';

import HotelListSlider from '@/components/ui/slider/HotelListSlider';

const HotelByView = () => {
  const [selectedViews, setSelectedViews] = useState<string>(`all`);

  // React Query 훅 사용
  const { data: hotels, isLoading, isError, error } = useHotelsByView(selectedViews);

  console.log(hotels);

  // 로딩 중 상태 처리
  if (isLoading) {
    return <HotelByViewSkeletonUI />;
  }

  // 에러 처리
  if (isError) {
    console.error('Error fetching hotels:', error);
    return <div className="text-red-500">호텔 데이터를 불러오는 중 오류가 발생했습니다. {error.message}</div>;
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
    <section className="box-border w-full max-w-[1300px] h-[850px] px-[50px] mx-auto py-[80px] pb-[120px]">
      <h3 className="text-[24px] font-semibold">객실 뷰가 아름다운 호텔</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45]">
        휴식을 취하면서 바라보는 아름다운 뷰는 힐링하는데 큰 도움을 줄 수 있어요.
      </p>

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

      <HotelListSlider hotels={hotels} />
    </section>
  );
};

export default HotelByView;
