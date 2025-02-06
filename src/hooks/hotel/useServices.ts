import { useQuery } from '@tanstack/react-query';

import fetchServices from '@/utils/api/fetch/fetchServices';

const useServices = () => {
  return useQuery({
    queryKey: ['services'], // 쿼리 키 설정
    queryFn: fetchServices, // fetchService 함수 사용
    staleTime: Infinity // 항시 신선한 데이터로 간주
  });
};

export default useServices;
