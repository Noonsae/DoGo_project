import { useQuery } from '@tanstack/react-query';
import fetchUserQuery from '@/utils/api/fetch/fetchUserData';

const useUserQuery = (userId: string | null) => {
  return useQuery({
    queryKey: ['user', userId], // 최신 문법에서도 queryKey는 동일
    queryFn: async () => {
      if (!userId) throw new Error('유저 ID가 없습니다.');
      return await fetchUserQuery(userId);
    },
    enabled: Boolean(userId), // 최신 문법에서도 Boolean 변환 권장
    staleTime: Infinity, // 데이터가 만료되지 않도록 설정
    gcTime: 1000 * 60 * 60 * 24, // ✅ V5에서 cacheTime 대신 gcTime 사용 (24시간 유지)
    retry: 2, // 요청 실패 시 최대 2번 재시도
    refetchOnWindowFocus: false, // ✅ 최신 권장 옵션 (포커스 변경 시 자동 리패치 방지)
    refetchOnReconnect: false // ✅ 네트워크 재연결 시 자동 리패치 방지
  });
};

export default useUserQuery;
