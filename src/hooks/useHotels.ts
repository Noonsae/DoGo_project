import { useQuery } from '@tanstack/react-query';

import { HotelType } from '@/types/supabase/hotel-type';

const fetchHotels = async (): Promise<HotelType[]> => {
  try {
    const response = await fetch('/api/hotel'); // API 엔드포인트
    if (!response.ok) {
      throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
    }
    return await response.json();
    
  } catch (error) {
    console.error('호텔 데이터를 가져오는 중 에러가 발생했습니다.', error);
    throw new Error('호텔 데이터를 가져오는 데 실패했습니다.');
  }
};

export const useHotels = () => {
  return useQuery<HotelType[], Error>({
    queryKey: ['hotels'],
    queryFn: () => fetchHotels(),
    staleTime: Infinity,
    refetchOnWindowFocus: false, // 창 포커스 시 리패치 방지
  });
};