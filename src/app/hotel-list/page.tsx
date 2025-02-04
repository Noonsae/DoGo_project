'use client';

import React, { useEffect, useState, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import useAuthStore from '@/store/useAuth';
import useHistoryStore from '@/store/useHistoryStore';

import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';
import useFetchHotelsFilter from '@/hooks/hotel/useFetchHotelsFilter';

import { HotelWithPriceOnly } from '@/types/supabase/hotel-type';
import { FiltersType, sortOrder } from '@/types/hotel/hotel-filter-type';
import { UserType } from '@/types/supabase/user-type';

import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';

import HotelCardList from './_components/HotelsCardList';
import AsideFilter from './_components/AsideFilter';
// import SortBtn from './_components/SortBtn';
import HotelListSkeleton from '../../components/ui/skeleton/HotelListSkeleton';
import AppliedFilters from './_components/AppliedFilters';

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
  const maxPrice = parseInt(searchParams.get('maxPrice') || '2000000', 10);
  const facilityIds = searchParams.get('facilities')?.split(',') || [];
  const serviceIds = searchParams.get('services')?.split(',') || [];
  const sort = searchParams.get('sort') || '';
  const beds = searchParams.get('beds')?.split(',') || []; // beds 파라미터를 URL에서 가져옴

  const [filters, setFilters] = useState<FiltersType>({
    label: '',
    stars: [],
    minPrice: 0,
    maxPrice: 2000000,
    location: '',
    facilityIds: [],
    serviceIds: [],
    beds
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
    // ✅ undefined 대신 null을 명시적으로 할당
    hotel.facility_ids = hotel.facility_ids ?? null;
    hotel.service_ids = hotel.service_ids ?? null;

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
      facilityIds,
      serviceIds,
      beds
    },
    sortOrder: sort as sortOrder
  });

  const [isLoading, setIsLoading] = useState(true); // 추가된 최소 로딩 상태

  useEffect(() => {
    if (data || !isFetchingNextPage) {
      // setTimeout(() => {
      setIsLoading(false);
      // }, 1000);
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

  const getFilteredNames = (
    ids: string[],
    items: { facility_id: string; facilities: { name: string } }[] // facility_id를 string으로 유지
  ) => {
    // 중복되는 값을 제거한 후, 필터링된 시설 이름을 반환
    const uniqueIds = Array.from(new Set(ids)); // Set을 사용하여 중복 제거
    const filteredNames = items
      .filter((item) => uniqueIds.includes(item.facility_id)) // 중복 제거된 ids를 사용하여 필터링
      .map((item) => item.facilities.name);

    // 중복된 이름을 제거
    const uniqueFilteredNames = Array.from(new Set(filteredNames));

    return uniqueFilteredNames.length > 0 ? uniqueFilteredNames.join('') : ''; // 값이 있으면 쉼표로 연결
  };

  const getServiceNames = (serviceIds: string[], services: { service_id: string; services: { name: string } }[]) => {
    // 중복되는 값을 제거한 후, 필터링된 서비스 이름을 반환
    const uniqueServiceIds = Array.from(new Set(serviceIds)); // Set을 사용하여 중복 제거
    const filteredServices = services.filter((service) => uniqueServiceIds.includes(service.service_id));
    const filteredServiceNames = filteredServices.map((service) => service.services.name);

    // 중복된 서비스 이름 제거
    const uniqueFilteredServiceNames = Array.from(new Set(filteredServiceNames));

    return uniqueFilteredServiceNames.length > 0 ? uniqueFilteredServiceNames.join('') : '';
  };

  // const isLoadingInitialData = !data && isFetchingNextPage;

  return (
    <div
      className="w-full max-w-[1300px] mx-auto  pt-[200px] pb-[50px] flex flex-row justify-between gap-[30px]  
              max-[958px]:flex-col"
    >
      <ScrollSearchBox />

      <AsideFilter onFilterChange={(newFilters) => setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))} />

      <div>
        <AppliedFilters
          filters={filters}
          getFilteredNames={getFilteredNames}
          getServiceNames={getServiceNames}
          data={data?.pages[0] ?? { items: [], totalCount: 0 }}
          uniqueHotels={uniqueHotels}
        />
        {/* 일단 주석
          <SortBtn sortOrder={sort as sortOrder} /> */}

        {/* hotel list card */}
        <ul className="w-full flex flex-col gap-8 outline outline-2 outline-red-500">
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => <HotelListSkeleton key={index} />)
            : uniqueHotels.map((hotel) => (
                <button key={hotel.id} onClick={() => handleSaveHistoryAndMoveDetailsPage(hotel)}>
                  <HotelCardList hotel={hotel} isFavorite={favoriteStatus[hotel.id] || false} hotelId={hotel.id} />
                </button>
              ))}
        </ul>

        {/* infinity scroll event 감지 div */}
        <div ref={observerRef} className="w-full h-[50px] mt-10 items-center text-center "></div>
      </div>
    </div>
  );
};

export default HotelList;
