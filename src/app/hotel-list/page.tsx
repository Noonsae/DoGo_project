'use client';
import React, { useEffect, useState, useRef } from 'react';
import useAuthStore from '@/store/useAuth';
import HotelCardList from './_components/HotelsCardList';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import AsideFilter from './_components/AsideFilter';
import { HotelType } from '@/types/supabase/hotel-type';
import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';
import SortBtn from './_components/SortBtn';
import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';
import { useSearchParams } from 'next/navigation';

interface UserType {
  id: string;
}

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

  // 사용자 정보
  const user = useAuthStore((state) => state.user) as UserType | null;
  const { favoriteStatus, toggleFavorite, initializeFavorites } = useFavoriteStore();

  // 초기 즐겨찾기 상태 로드
  useEffect(() => {
    if (user?.id) {
      initializeFavorites(user.id);
    }
  }, [user, initializeFavorites]);

  // 무한 스크롤 및 데이터 가져오기
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
      if (totalLoaded >= lastPage.totalCount) return undefined;
      return totalLoaded;
    },
    initialPageParam: 0
  });

  // 무한 스크롤 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full max-w-[1300px] mx-auto px-[50px] py-[200px] flex flex-row justify-between gap-[30px] ">
      
        <AsideFilter
          onFilterChange={(newFilters) => setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))}
        />

        <div className="flex-1 ml-11">
          <div className="flex justify-between items-center mb-4">
          <p className="text-[24px] text-[#232527] font-semibold">
            {/* 결과의 대한 갯수 가져오기 */}
              총 9,999개의 결과를 불러왔습니다.
            </p>
            <SortBtn sortOrder={sortOrder} handleSortChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} />
          </div>
          <ul className='border border-blue-400 '>
            {data?.pages?.flatMap((page) =>
              page.items.map((hotel: HotelType) => (
                <li key={hotel.id}>
                  <Link href={`/hotel-list/${hotel.id}`}>
                    <HotelCardList hotel={hotel} isFavorite={favoriteStatus[hotel.id] || false} hotelId={hotel.id} />
                  </Link>
                </li>
              ))
            )}
          </ul>
          <div ref={observerRef} />
          {isFetchingNextPage && <p>Loading more...</p>}
          {!hasNextPage && <p>모든 호텔 데이터를 불러왔습니다.</p>}
        </div>
      </div>    
  );
};

export default HotelList;
