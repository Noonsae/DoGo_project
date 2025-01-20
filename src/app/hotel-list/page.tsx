'use client';
import React, { useEffect, useState, useRef } from 'react';
import useAuthStore from '@/store/useAuth';
import HotelCardList from './_components/HotelsCardList';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import AsideFilter from './_components/AsideFilter';
import { HotelType } from '@/types/supabase/hotel-type'; // HotelType 추가
import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';
import SortBtn from './_components/SortBtn';
import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';
import { useSearchParams } from 'next/navigation';

interface UserType {
  id: string;
}

// 호텔 데이터를 가져오는 비동기 함수
const fetchHotels = async ({
  pageParam = 0,
  // 지역, 날짜, .... 추가 예정 
  filters = { grade: []},
  // TODO: 가격 이외의 조건이 있다면 객체로 변경 해야 함  { price: "asc", rating: "desc" }
  sortOrder = ''
}: {
  pageParam?: number;
  filters?: { grade: number[] };
  sortOrder?: 'asc' | 'desc' | '';
}) => {
  const gradeQuery =
    filters.grade && filters.grade.length > 0
      ? `&grade=in.(${filters.grade.filter((g: number) => Number.isInteger(g)).join(',')})`
      : '';
  const sortQuery = sortOrder ? `&sortOrder=${sortOrder}` : '';
  const url = `/api/hotel?offset=${pageParam}&limit=8${gradeQuery}${sortQuery}`;
  const res = await fetch(url);

  // TODO: supabase로
  // let query = supabase.from("hotels").select("*");

  // if (filters.grade.length > 0 ) {
  //   // query.eq("type", ~~~)
  // }

  // if (filters.location) {
  //   query.eq("location", filters.location)
  // }

  // if (sortOrder) {
  //   query.order("~~~", s)
  // }

  // query.limit(10).offset(pageParam * 10)
  // 1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16, 17,... 

  // await query

  // 



  if (!res.ok) {
    throw new Error(`Failed to fetch hotels: ${res.status}`);
  }

  const data = await res.json();
  return {
    items: data.items,
    totalCount: data.totalCount
  };
};

/**
 * 1. url에서 필터 조건을 가져온다. useSearchParams 활용
 * 2. location, 날짜, 지역 -> API 요청 (fetchHotels의 파라미터로 전달한다)
 */

const HotelList = () => {
  // TODO: 이거 활용하기
  const searchParams = useSearchParams(); 
  const params = searchParams.get("location");

  const [filters, setFilters] = useState<{ grade: number[] }>({ grade: [] });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 유저 정보 로드
  const user = useAuthStore((state) => state.user) as UserType | null;
  const { favoriteStatus, toggleFavorite, initializeFavorites } = useFavoriteStore();

  useEffect(() => {
    if (user?.id) {
      initializeFavorites(user.id); // 서버에서 상태 초기화
    }
  }, [user, initializeFavorites]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value as 'asc' | 'desc' | '';
    setSortOrder(selectedOrder);
  };

  const handleToggleFavorite = (hotelId: string) => {
    toggleFavorite(hotelId); // 즐겨찾기 상태 추가 및 취소
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['hotels', filters, sortOrder],
    // 1. queryFn -> fetchHotels가 실행된다. 이때 pageParam = 0이다. 
    queryFn: ({ pageParam = 0 }) => fetchHotels({ pageParam, filters, sortOrder }),
    // 2. 스크롤이 마지막까지 내려가서 fetchNextPage가 실행되면 getNextPageParam 함수가 실행된다. 
    // 3. totalLoaded 가 pageParam으로 들어가진다. -> 
    // 4. pageParam이 바뀌면 fetchHotels가 추가로 더 실행된다. 이때 pageParam = 1이다. 
    getNextPageParam: (lastPage, allPages) => {
      // { pages: [~~~], ~~~~ }
      // console.log(lastPage) 
      const totalLoaded = allPages.flatMap((page) => page.items).length;
      const totalAvailable = lastPage.totalCount;

      if (totalLoaded >= totalAvailable) {
        return undefined;
      }

      return totalLoaded;
    },
    initialPageParam: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="mx-[360px]">
      <div>
        <h1 className="font-bold">DoGo</h1>
      </div>
      <ScrollSearchBox/>
      <div className="flex gap-8 mt-16 pt-[200px]">
        <AsideFilter onFilterChange={(newFilters) => setFilters(newFilters)} />
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <span className="block">
              적용된 필터: {filters.grade.length > 0 ? `${filters.grade.join(', ')}성` : '전체'}
            </span>
            <SortBtn sortOrder={sortOrder} handleSortChange={handleSortChange} />
          </div>
          <ul>
            {data?.pages?.flatMap((page) =>
              page.items.map(
                (
                  hotel: HotelType // HotelType을 명시적으로 지정
                ) => (
                  <li key={hotel.id}>
                    <HotelCardList
                      hotel={hotel}
                      isFavorite={favoriteStatus[hotel.id] || false} // 즐겨찾기 상태
                      onToggleFavorite={() => handleToggleFavorite(hotel.id)} // 즐겨찾기 토글
                    />
                    <Link href={`/hotel-list/${hotel.id}`}>
                      <p>객실 상세 페이지로 이동하기 / 테스트 용입니다.</p>
                    </Link>
                  </li>
                )
              )
            )}
          </ul>
          <div ref={observerRef} className="h-4"></div>
          {isFetchingNextPage && <p>Loading more...</p>}
          {!hasNextPage && <p>모든 호텔 데이터를 불러왔습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
