'use client';

import { useState } from 'react';

import useHotelsByView from '@/hooks/hotel/useHotelsByView';

import HotelListSlider from '@/components/ui/slider/HotelListSlider';

const HotelByView = () => {
  const [selectedViews, setSelectedViews] = useState<string>(`all`);

  // React Query 훅 사용
  const { data: hotels, isError, error } = useHotelsByView(selectedViews);

  // 에러 처리
  if (isError) {
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
      <h3 className="text-[24px] font-semibold mb-1">다양한 전망의 호텔들을 소개합니다.</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45]">
        탁 트인 전망과 감성을 더하는 객실 뷰를 통해 힐링과 여유를 만끽하세요.
      </p>

      <div className="flex flex-wrap flex-row md:gap-2 xxs:gap-0">
        {Views.map((select) => (
          <button
            key={select.id}
            type="button"
            onClick={() => handleBtnClick(select.id)}
            className={`mr-[12px] mt-[28px] md:px-6 xxs:px-4 md:py-2.5 xxs:py-2 border border-[#CDCDCD] rounded-[8px] md:text-[18px] xxs:text-[15px] font-semibold outline-none transition duration-200 ${
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
