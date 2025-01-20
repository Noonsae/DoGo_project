import { useQuery } from '@tanstack/react-query';

import fetchHotelsByViewWithMinPrice from '@/utils/fetchHotelsByView';

import { HotelWithMinPrice } from '@/types/supabase/room-type';

/**
 * 특정 location에 따라 호텔 데이터를 캐싱하고 반환하는 React Query 훅
 * @param view - 필터링할 호텔의 위치
 * @returns TanStack Query를 통한 호텔 데이터와 로딩/에러 상태
 */

const useHotelsByView = (view: string) => {
  return useQuery<HotelWithMinPrice[], Error>({
    queryKey: ['hotelsByView', view], // 캐싱 키
    queryFn: () => fetchHotelsByViewWithMinPrice(view), // API 호출
    enabled: !!view, // location이 있을 때만 활성화
    staleTime: Infinity, // 데이터가 신선한 상태로 간주되는 시간 (5분)
    refetchOnWindowFocus: false // 창 포커스 시 리패치 방지
  });
};

export default useHotelsByView;
