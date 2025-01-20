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

const fetchHotels = async ({
  pageParam = 0,
  // 지역, 날짜, .... 추가 예정 
  filters = { grade: []},
  // TODO: 가격 이외의 조건이 있다면 객체로 변경 해야 함  { price: "asc", rating: "desc" }
  sortOrder = ''
}: {
  pageParam?: number;
  filters: {
    grade: number[];
    minPrice: number;
    maxPrice: number;
    facilities: string[];
    services: string[];
  };
  sortOrder?: 'asc' | 'desc' | '';
}) => {
  const gradeQuery = filters.grade.length ? `&grade=in.(${filters.grade.join(',')})` : '';
  const priceQuery = `&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`;
  const facilitiesQuery = filters.facilities.length ? `&facilities=${filters.facilities.join(',')}` : '';
  const servicesQuery = filters.services.length ? `&services=${filters.services.join(',')}` : '';
  const sortQuery = sortOrder ? `&sortOrder=${sortOrder}` : '';

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
    <div className="mx-[360px]">
      <div>
        <h1 className="font-bold ">DoGo</h1>
      </div>
      <div className="flex gap-8 mt-16">
        <AsideFilter
          onFilterChange={(newFilters) => setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))}
        />
        <div className="flex-1 ml-11">
          <div className="flex justify-between items-center mb-4">
            <span className="block">
              적용된 필터: {filters.grade.length > 0 ? `${filters.grade.join(', ')}성` : '전체'}
            </span>
            <SortBtn sortOrder={sortOrder} handleSortChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} />
          </div>
          <ul>
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
    </div>
  );
};

export default HotelList;
