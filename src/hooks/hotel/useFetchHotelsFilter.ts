import { useInfiniteQuery } from '@tanstack/react-query';
import fetchHotelsFilter from '@/utils/fetchHotelsFilter';
import {
  UseFetchHotelsFilterParamsType,
  FetchHotelsFilterResponse,
  FiltersType
} from '@/types/hotel/hotel-filter-type';

/**
 * 페이지네이션 또는 인피니티 스크롤을 지원하는 React Query 훅
 * @param filters - 필터 조건
 * @param sortOrder - 정렬 순서
 * @returns React Query의 Infinite Query를 통한 호텔 데이터와 상태
 */

const fetchHotelsQueryFn = async ({
  pageParam = 0,
  filters,
  sortOrder
}: {
  pageParam: number;
  filters: FiltersType;
  sortOrder?: 'asc' | 'desc' | '';
}): Promise<FetchHotelsFilterResponse> => {
  return await fetchHotelsFilter({ pageParam, filters, sortOrder });
};

/**
 * 다음 페이지의 pageParam을 계산하는 getNextPageParam 함수
 * @param lastPage - 마지막 페이지 데이터
 * @param allPages - 지금까지 로드된 모든 페이지
 * @returns 다음 페이지의 pageParam 또는 undefined
 */

// deltaY 값이 최대치일 때, fetchNextPage가 실행되는 함수 getNextPageParamFn
const getNextPageParamFn = (lastPage: FetchHotelsFilterResponse, allPages: FetchHotelsFilterResponse[]) => {
  const totalLoaded = allPages.flatMap((page) => page.items).length;

  console.log('totalLoaded:', totalLoaded);
  console.log('lastPage.totalCount:', lastPage.totalCount);

  // 만약 로딩해야 할 데이터가 남아있다면
  if (totalLoaded >= lastPage.totalCount) return undefined;

  // 다음 페이지 번호 계산
  return allPages.length; // 현재 페이지 개수를 반환
};

/**
 * useInfiniteQuery를 활용하여 호텔 데이터를 가져오는 React Query 훅
 * @param filters - 필터 조건
 * @param sortOrder - 정렬 조건
 */

const useFetchHotelsFilter = ({ filters, sortOrder = '' }: UseFetchHotelsFilterParamsType) =>
  useInfiniteQuery<FetchHotelsFilterResponse, Error>({
    // 캐싱 키
    queryKey: ['hotels', filters, sortOrder],

    // 첫 번째 페이지 파라미터
    initialPageParam: 0,

    // queryFn -> fetchHotels가 실행된다. 이때 pageParam = 0이다.
    // 분리된 queryFn
    queryFn: ({ pageParam = 0 }) => {
      if (typeof pageParam === 'number') {
        return fetchHotelsQueryFn({ pageParam, filters, sortOrder });
      } else {
        return { items: [], totalCount: 0 };
      }
    },

    // 분리된 getNextPageParam
    getNextPageParam: getNextPageParamFn,

    // 데이터를 신선하게 유지하는 시간
    staleTime: 1000 * 60 * 5
  });

export default useFetchHotelsFilter;
