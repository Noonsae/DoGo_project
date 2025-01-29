'use client';

import { useEffect } from 'react';
import useHotelsByLocation from '@/hooks/hotel/useHotelsByLocation';
import HotelListSlider from '@/components/ui/slider/HotelListSlider';
import useHistoryStore from '@/store/useHistoryStore';
import { HotelType } from '@/types/supabase/hotel-type';

const Recommend = () => {
  const { history, setMostFrequentLocation, mostFrequentLocation } = useHistoryStore();
  const { data: hotels, isLoading, isError, error } = useHotelsByLocation(mostFrequentLocation);

  useEffect(() => {
    if (history.length > 0) {
      const locationCount = history.reduce((acc: Record<string, number>, hotel: HotelType) => {
        acc[hotel.location] = (acc[hotel.location] || 0) + 1;
        return acc;
      }, {});

      const mostFrequentLocation = Object.keys(locationCount).reduce((a, b) =>
        locationCount[a] > locationCount[b] ? a : b
      );

      setMostFrequentLocation(mostFrequentLocation);
    }
  }, [history, setMostFrequentLocation]);

  if (isLoading) {
    return;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // 히스토리가 없을 때
  if (!history || history.length === 0) {
    return;
  }

  return (
    <section className="w-full max-w-[1300px] h-[778px] px-[50px] pt-[80px] pb-[120px] mx-auto ">
      <h3 className="text-[24px] font-semibold">이런 호텔은 어떠신가요?</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45] mb-[32px]">
        회원님의 리스트를 바탕으로 비슷한 호텔을 추천해 드릴게요.
      </p>

      <HotelListSlider hotels={hotels ?? []} />
    </section>
  );
};

export default Recommend;
