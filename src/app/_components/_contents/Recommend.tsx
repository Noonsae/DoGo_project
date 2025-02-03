'use client';

import { useEffect } from 'react';
import useHotelsByLocation from '@/hooks/hotel/useHotelsByLocation';
import HotelListSlider from '@/components/ui/slider/HotelListSlider';
import useHistoryStore from '@/store/useHistoryStore';

const Recommend = () => {
  const { history, setMostFrequentLocation, mostFrequentLocation } = useHistoryStore();
  const { data: hotels, isError, error } = useHotelsByLocation(mostFrequentLocation);

  useEffect(() => {
    if (history.length > 0) {
      const locationCount = history.reduce<Record<string, number>>((acc, hotel) => {
        const location = hotel.location; // hotel의 location 속성을 가져옴
        if (location) {
          acc[location] = (acc[location] || 0) + 1; // 해당 location의 카운트를 증가
        }
        return acc;
      }, {});

      const mostFrequentLocation = Object.keys(locationCount).reduce((a, b) =>
        locationCount[a] > locationCount[b] ? a : b
      );

      setMostFrequentLocation(mostFrequentLocation);
    }
  }, [history, setMostFrequentLocation]);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // 히스토리가 없을 때
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-[1300px] h-[778px] px-[50px] pt-[80px] pb-[120px] mx-auto">
      <h3 className="text-[24px] font-semibold">이런 호텔은 어떠신가요?</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45] mb-[32px]">
        회원님이 관심있으셨던 호텔 목록을 참고해 비슷한 추천 목록을 준비했어요.
      </p>

      <HotelListSlider hotels={hotels ?? []} />
    </section>
  );
};

export default Recommend;
