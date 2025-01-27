import { useQuery } from '@tanstack/react-query';

import fetchFacilities from '@/utils/fetchFacilities'; // Supabase에서 시설 데이터를 가져오는 함수

const useFacilities = () => {
  return useQuery({
    queryKey: ['facilities'], // 쿼리 키 설정
    queryFn: fetchFacilities, // fetchFacilities 함수 사용
    staleTime: Infinity, // 항시 신선한 데이터로 간주    
  });
};

export default useFacilities;
