'use client';

import useHistoryStore from '@/store/useHistoryStore';

import RecommendSkeletonUI from '@/components/ui/skeleton/RecommendSkeletonUI';
import HotelListSlider from '@/components/ui/slider/HotelListSlider';

const HotelHistory = () => {
  const history = useHistoryStore((state) => state.history);

  console.log(history);

  // 로딩 중 상태 처리
  if (!history) {
    return <RecommendSkeletonUI />;
  }


  return (
    <section className="w-full max-w-[1300px] px-[50px] pt-[80px] pb-[120px] mx-auto h-[748px]">
      <h3 className="text-[24px] font-semibold">최근 본 호텔 상품</h3>

      <HotelListSlider hotels={history ?? []} />
    </section>
  );
};

export default HotelHistory;
