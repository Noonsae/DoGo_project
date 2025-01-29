'use client';

import React, { useEffect, useState, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import useAuthStore from '@/store/useAuth';
import useHistoryStore from '@/store/useHistoryStore';

import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';
import useFetchHotelsFilter from '@/hooks/hotel/useFetchHotelsFilter';

import { HotelWithPriceOnly } from '@/types/supabase/hotel-type';
import { FiltersType, sortOrder } from '@/types/hotel/hotel-filter-type';

import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';

import HotelCardList from './_components/HotelsCardList';
import AsideFilter from './_components/AsideFilter';
import SortBtn from './_components/SortBtn';
import HotelListSkeleton from '../../components/ui/skeleton/HotelListSkeleton';
import { UserType } from '@/types/supabase/user-type';

/**
 * 1. url에서 필터 조건을 가져온다. useSearchParams 활용
 * 2. location, 날짜, 지역 -> API 요청 (fetchHotels의 파라미터로 전달한다)
 */

const HotelList = () => {
  // TODO: 재사용 로직으로 변경
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  // TODO: 추후 수정
  const stars =
    searchParams
      .get('stars')
      ?.split(',')
      .filter((star) => star !== '')
      .map((star) => parseInt(star, 10)) // 문자열을 숫자로 변환
      .filter((star) => !isNaN(star)) || []; // NaN 값 필터링
  const label = searchParams.get('label') || '';
  const minPrice = parseInt(searchParams.get('minPrice') || '0', 10);
  const maxPrice = parseInt(searchParams.get('maxPrice') || '5000000', 10);
  const facilityIds = searchParams.get('facilities')?.split(',') || [];
  const serviceIds = searchParams.get('services')?.split(',') || [];
  const sort = searchParams.get('sort') || '';

  const [filters, setFilters] = useState<FiltersType>({
    label: '',
    stars: [],
    minPrice: 0,
    maxPrice: 5000000,
    location: '',
    facilityIds: [],
    serviceIds: []
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  // 사용자 정보
  const user = useAuthStore((state) => state.user) as UserType | null;

  // 즐겨찾기 상태
  const { favoriteStatus, initializeFavorites } = useFavoriteStore();

  // onClick Event - 상세 페이지로 이동
  const router = useRouter();
  const addHotel = useHistoryStore((state) => state.addHotel);

  const handleSaveHistoryAndMoveDetailsPage = (hotel: HotelWithPriceOnly) => {
    addHotel(hotel);
    router.push(`/hotel-list/${hotel.id}`);
  };

  // 필터 데이터 호출
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchHotelsFilter({
    filters: {
      label,
      location,
      stars,
      minPrice,
      maxPrice,
      facilityIds: facilityIds,
      serviceIds: serviceIds
    },
    sortOrder: sort as sortOrder
  });

  const [isLoading, setIsLoading] = useState(true); // 추가된 최소 로딩 상태

  useEffect(() => {
    if (data || !isFetchingNextPage) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [data, isFetchingNextPage]);

  const hotels = data?.pages.flatMap((page) => page.items) || [];
  const uniqueHotels = hotels.filter((hotel, index, self) => self.findIndex((h) => h.id === hotel.id) === index);

  // 무한 스크롤 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage]);

  // const isLoadingInitialData = !data && isFetchingNextPage;

  return (
    <div className="w-full max-w-[1300px] mx-auto px-[50px] pt-[200px] pb-[50px] flex flex-row justify-between gap-[30px] ">
      <ScrollSearchBox />

      <AsideFilter
      // onFilterChange={(newFilters) => setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))}
      />

      <div className="">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-[24px] text-[#232527] font-semibold">
              {/* 결과의 대한 갯수 가져오기 */}총 {data?.pages[0].totalCount}개의 결과를 불러왔습니다.
            </p>
            <p className="mt-2 text-base text-[#777] font-medium">
              적용된 필터: {filters.stars.length > 0 ? `${filters.stars.join(', ')}성` : '전체'}
            </p>
          </div>
          <SortBtn sortOrder={sort as sortOrder} />
        </div>

        {/* hotel list card */}
        <ul className="flex flex-col gap-8">
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => <HotelListSkeleton key={index} />)
            : uniqueHotels.map((hotel) => (
                <li key={hotel.id}>
                  <button onClick={() => handleSaveHistoryAndMoveDetailsPage(hotel)}>
                    <HotelCardList hotel={hotel} isFavorite={favoriteStatus[hotel.id] || false} hotelId={hotel.id} />
                  </button>
                </li>
              ))}
        </ul>

        {/* infinity scroll event 감지 div */}
        <div ref={observerRef} className="w-full h-[50px] mt-10 items-center text-center "></div>
      </div>
    </div>
  );
};

export default HotelList;
