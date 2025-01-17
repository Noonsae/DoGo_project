'use client';

import { useState, useEffect } from 'react';
import RecommendSkeletonUI from '@/components/ui/skeleton/RecommendSkeletonUI';
import HotelListSlider from '@/components/ui/slider/HotelListSlider';
import { HotelWithMinPrice } from '@/types/supabase/room-type';

const History = () => {
  const [history, setHistory] = useState<HotelWithMinPrice[]>([]);

  // 로컬스토리지에서 초기 데이터 가져오기
  useEffect(() => {
    const storedHistory = localStorage.getItem('hotelHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const transformedHistory: HotelWithMinPrice[] = history.map((hotel) => ({
    ...hotel,
    min_price: hotel.min_price || 0 // 기본값 추가
  }));
  
  // 로딩 중 상태 처리
  if (!history) {
    return <RecommendSkeletonUI />;
  }

  return (
    <section className="w-full max-w-[1300px] px-[50px] pt-[80px] pb-[120px] mx-auto h-[748px]">
      <h3 className="text-[24px] font-semibold">최근 본 호텔 상품</h3>

      <HotelListSlider hotels={transformedHistory ?? []} />
    </section>
  );
};

export default History;
