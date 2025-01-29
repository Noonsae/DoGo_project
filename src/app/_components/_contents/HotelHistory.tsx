'use client';

import useHistoryStore from '@/store/useHistoryStore';
import HotelListSlider from '@/components/ui/slider/HotelListSlider';

const HotelHistory = () => {
  const history = useHistoryStore((state) => state.history);

  const reversedHistory = [...history].reverse();

  // 히스토리가 없을 때 
  if (!history || history.length === 0) {
    return;
  }

  return (
    <section className="w-full max-w-[1300px] h-[748px] px-[50px] py-[80px] mx-auto ">
      <h3 className="text-[24px] font-semibold">최근 본 호텔 상품</h3>

      <HotelListSlider hotels={reversedHistory ?? []} />
    </section>
  );
};

export default HotelHistory;
