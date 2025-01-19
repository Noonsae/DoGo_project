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

interface UserType {
  id: string;
}

const fetchHotels = async ({
  pageParam = 0,
  filters,
  sortOrder
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

  const res = await fetch(
    `/api/hotel?offset=${pageParam}&limit=8${gradeQuery}${priceQuery}${facilitiesQuery}${servicesQuery}${sortQuery}`
  );
  if (!res.ok) throw new Error('Failed to fetch hotels');
  return res.json();
};

const HotelList = () => {
  const [filters, setFilters] = useState<{
    grade: number[];
    minPrice: number;
    maxPrice: number;
    facilities: string[];
    services: string[];
  }>({
    grade: [],
    minPrice: 0,
    maxPrice: 10000000,
    facilities: [],
    services: []
  });

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
    queryFn: ({ pageParam = 0 }) => fetchHotels({ pageParam, filters, sortOrder }),
    getNextPageParam: (lastPage, allPages) => {
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
