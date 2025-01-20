'use client';
import React, { useEffect, useState, useRef } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import useAuthStore from '@/store/useAuth';
import HotelCardList from './_components/HotelsCardList';

import AsideFilter from './_components/AsideFilter';
import { HotelType } from '@/types/supabase/hotel-type';
import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';
import SortBtn from './_components/SortBtn';
import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';
import useFetchHotelsFilter from '@/hooks/hotel/useFetchHotelsFilter';
import { FiltersType, sortOrder } from '@/types/hotel-filter-type';

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
  const location = searchParams.get('location') || ''; // location 파라미터 가져오기
  const minPrice = searchParams.get('minPrice') || '0'; // minPrice 가져오기
  const maxPrice = searchParams.get('maxPrice') || '10000000'; // maxPrice 가져오기
  const stars = searchParams.get('stars')?.split(',').map(Number) || []; // stars는 쉼표로 구분된 문자열을 배열로 변환
  const facilities = searchParams.get('facilities')?.split(',').map(Number) || []; // stars는 쉼표로 구분된 문자열을 배열로 변환
  const services = searchParams.get('services')?.split(',').map(Number) || []; // stars는 쉼표로 구분된 문자열을 배열로 변환

  const [filters, setFilters] = useState<FiltersType>({
    stars: [],
    minPrice: 0,
    maxPrice: 10000000,
    location: '',
    facilities: [],
    services: []
  });
  const [sortOrder, setSortOrder] = useState<sortOrder>('');
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchHotelsFilter({ filters, sortOrder });

  console.log(data);

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
      <ScrollSearchBox />

      <AsideFilter onFilterChange={(newFilters) => setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))} />

      <div className="flex-1 ml-11">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[24px] text-[#232527] font-semibold">
            {/* 결과의 대한 갯수 가져오기 */}총 9,999개의 결과를 불러왔습니다.
          </p>
          <SortBtn sortOrder={sortOrder} handleSortChange={setSortOrder} />
        </div>
        <ul className="border border-blue-400 ">
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
