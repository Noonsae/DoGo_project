'use client';

import React, { useEffect, useState, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import useAuthStore from '@/store/useAuth';
import useHistoryStore from '@/store/useHistoryStore';

import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';
import useFetchHotelsFilter from '@/hooks/hotel/useFetchHotelsFilter';

import { HotelType, HotelWithPriceOnly } from '@/types/supabase/hotel-type';
import { FiltersType, sortOrder } from '@/types/hotel-filter-type';

import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';

import HotelCardList from './_components/HotelsCardList';
import AsideFilter from './_components/AsideFilter';
import SortBtn from './_components/SortBtn';

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
  // location 파라미터 가져오기
  const location = searchParams.get('location') || '';
  // minPrice 가져오기
  const minPrice = searchParams.get('minPrice') || '0';
  // maxPrice 가져오기
  const maxPrice = searchParams.get('maxPrice') || '10000000';
  // stars(성급) 가져오기
  const stars = searchParams.get('stars')?.split(',').map(Number) || [];
  // facilities는 디코딩을 해서 가져와야 함 ( 가져오는 로직의 수정 필요 )
  // const facilities = searchParams.get('facilities')?.split(',').map(Number) || [];
  // services는 디코딩을 해서 가져와야 함 ( 가져오는 로직의 수정 필요 )
  // const services = searchParams.get('services')?.split(',').map(Number) || [];

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

  const router = useRouter();
  const addHotel = useHistoryStore((state) => state.addHotel);

  const handleSaveHistoryAndMoveDetailsPage = (hotel: HotelWithPriceOnly) => {
    addHotel(hotel);
    router.push(`/hotel-list/${hotel.id}`);
  };

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
          console.log('Fetching next page...');
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full max-w-[1300px] mx-auto px-[50px] pt-[200px] pb-[50px] flex flex-row justify-between gap-[30px] ">
      <ScrollSearchBox />

      <AsideFilter onFilterChange={(newFilters) => setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))} />

      <div className="">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[24px] text-[#232527] font-semibold">
            {/* 결과의 대한 갯수 가져오기 */}총 9,999개의 결과를 불러왔습니다.
          </p>
          <SortBtn sortOrder={sortOrder} handleSortChange={setSortOrder} />
        </div>

        {/* hotel list card */}
        <ul className="border border-red-400">
          {data?.pages?.flatMap((page) =>
            page.items.map((hotel: HotelType) => (
              <li key={hotel.id}>
                <button onClick={() => handleSaveHistoryAndMoveDetailsPage(hotel)}>
                  <HotelCardList hotel={hotel} isFavorite={favoriteStatus[hotel.id] || false} hotelId={hotel.id} />
                </button>
              </li>
            ))
          )}
        </ul>

        {/* infinity scroll event 감지 div */}
        <div
          ref={observerRef}
          className="w-full h-[50px] mt-10 border border-gray-300 items-center text-center text-sm text-gray-600 leading-[50px]"
        >
          저는 Infinity scroll event를 감지하는 박스입니당! 저한테 잘보이세용 😂
        </div>

        {/* 여기에 스켈레톤 ui 만들면 좋을 듯 */}
        {isFetchingNextPage && <p>Loading more...</p>}

        {/* 얘는 !hasNextPage뿐 아니라 다른 장치도 필요할 듯. */}
        {/* {!hasNextPage && <p>모든 호텔 데이터를 불러왔습니다.</p>} */}
      </div>
    </div>
  );
};

export default HotelList;
