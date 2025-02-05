import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import fetchBookingHotelNameAndRoomName from '@/utils/fetchBookingHotelNameAndRoomName';

const useHotelNameAndRoomName = (hotelId: string, roomId: string) => {
  return useQuery({
    queryKey: ['hotelAndRoomNames', hotelId, roomId], // Query Key
    queryFn: ({ queryKey }: QueryFunctionContext) => {
      const [, hId, rId] = queryKey as [string, string, string];
      return fetchBookingHotelNameAndRoomName(hId, rId);
    },
    enabled: !!hotelId && !!roomId, // 조건부로 쿼리 실행
    staleTime: 5 * 60 * 1000, // 데이터가 5분 동안 캐시로 유지됨
    retry: 2, // 실패 시 재시도 횟수
    refetchOnWindowFocus: false // 포커스 이동 시 다시 로드 방지 (옵션)
  });
};

export default useHotelNameAndRoomName;