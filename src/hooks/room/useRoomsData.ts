import { useQuery } from '@tanstack/react-query';
import { fetchRoomQuery } from '@/utils/fetchRoomsData';

const useRoomQuery = (roomId: string | null) => {
  return useQuery({
    queryKey: ['room', roomId], // ✅ 최신 문법: Query Key 배열 사용
    queryFn: async () => {
      if (!roomId) throw new Error('객실 ID가 없습니다.');
      return await fetchRoomQuery(roomId);
    },
    enabled: Boolean(roomId), // ✅ roomId가 존재할 때만 실행
    staleTime: Infinity, // ✅ 데이터를 영구적으로 캐싱 (결제창에서 유용하다고 함)
    gcTime: 1000 * 60 * 60 * 24, // ✅ 24시간 동안 캐시 유지
    retry: 2, // ✅ 요청 실패 시 최대 2번 재시도
    refetchOnWindowFocus: false, // ✅ 창 포커스 변경 시 리패치 방지
    refetchOnReconnect: false // ✅ 네트워크 재연결 시 리패치 방지
  });
};

export default useRoomQuery;