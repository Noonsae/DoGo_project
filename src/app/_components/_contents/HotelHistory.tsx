'use client';

import useHistoryStore from '@/store/useHistoryStore';
import HotelListSlider from '@/components/ui/slider/HotelListSlider';

const HotelHistory = () => {
  const history = useHistoryStore((state) => state.history);

  const reversedHistory = [...history].reverse();

  // 히스토리가 없을 때 
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-[1300px] lg:h-[748px] xs:h-[640px] lg:px-[50px] xxs:px-5 lg:py-[80px] xxs:py-[40px] mx-auto">
      <h3 className="text-[24px] font-semibold mb-1">최근에 보셨던 호텔을 소개합니다.</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45] mb-[32px]">
        회원님께서 이전에 관심을 가졌던 호텔 목록을 확인해보세요.
      </p>

      <HotelListSlider hotels={reversedHistory ?? []} />
    </section>
  );
};

export default HotelHistory;
