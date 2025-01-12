'use client';
import React, { useEffect, useRef, useState } from 'react';
import AsideFilter from './_components/AsideFilter';
import { HotelType } from '@/types/supabase/hotel-type';
import HotelCardList from './_components/HotelsCardList';
import { useInfiniteQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuth';

// 호텔 데이터를 가져오는 비동기 함수
const fetchHotels = async ({
  pageParam = 0,
  filters = { grade: [] },
  sortOrder = '',
}: {
  pageParam?: number;
  filters?: { grade: number[] };
  sortOrder?: 'asc' | 'desc' | '';
}) => {
  const gradeQuery =
    filters.grade.length > 0
      ? `&grade=in.(${filters.grade.filter((g) => Number.isInteger(g)).join(',')})`
      : '';
  const sortQuery = sortOrder ? `&sortOrder=${sortOrder}` : '';
  const url = `/api/hotel?offset=${pageParam}&limit=8${gradeQuery}${sortQuery}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch hotels: ${res.status}`);
  }

  const data = await res.json();
  return {
    items: data.items,
    totalCount: data.totalCount,
  };
};

const HotelList = () => {
  const [filters, setFilters] = useState<{ grade: number[] }>({ grade: [] });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>(''); 
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 유저 정보 관련 로직
  const loadUserFromCookie = useAuthStore((state) => state.loadUserFromCookie); // 쿠키에서 유저 정보 로드
  const user = useAuthStore((state) => state.user); // 유저 정보
  const [favoriteStatus, setFavoriteStatus] = useState<{ [key: string]: boolean }>({}); // 찜 상태 관리

  // 컴포넌트 마운트 시 유저 정보 로드
  useEffect(() => {
    loadUserFromCookie(); // 쿠키에서 유저 정보 가져오기
  }, [loadUserFromCookie]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['hotels', filters, sortOrder],
    queryFn: async ({ pageParam = 0 }) =>
      fetchHotels({ pageParam, filters, sortOrder }),
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap((page) => page.items).length;
      const totalAvailable = lastPage.totalCount;

      if (totalLoaded >= totalAvailable) {
        console.log('No more data to load.');
        return undefined;
      }

      return totalLoaded; // 다음 offset
    },
    initialPageParam: 0,
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

  const toggleFavorite = async (hotelId: string) => {
    if (!user) {
      Swal.fire({
        title: '로그인이 필요합니다.',
        text: '회원 정보를 확인할 수 없습니다. 로그인 후 이용해 주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    try {
      const action = favoriteStatus[hotelId] ? 'remove' : 'add'; // 상태에 따라 추가/제거
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId: user.id, hotelId }),
      });

      if (!res.ok) {
        throw new Error('Failed to update favorite status');
      }

      setFavoriteStatus((prev) => ({
        ...prev,
        [hotelId]: !prev[hotelId],
      }));

      Swal.fire({
        title: '성공',
        text: `즐겨찾기 상태가 ${favoriteStatus[hotelId] ? '제거' : '추가'}되었습니다.`,
        confirmButtonText: '확인',
      });
    } catch (error) {
      Swal.fire({
        title: '오류 발생',
        text: '즐겨찾기 상태를 변경하는 중 오류가 발생했습니다.',
        confirmButtonText: '확인',
      });
    }
  };

  const handleFilterChange = (newFilters: { grade: number[] }) => {
    setFilters(newFilters);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value as 'asc' | 'desc' | '';
    setSortOrder(selectedOrder);
  };

  return (
    <div className="mx-[360px]">
      <div>
        <h1 className="font-bold my-6">DoGo</h1>
      </div>

      <div className="flex gap-8 mt-16">
        <AsideFilter onFilterChange={(newFilters) => handleFilterChange(newFilters)} />

        <div className="flex-1">
          <div className="flex items-center mb-4">
            <span className="block">
              적용된 필터: {filters.grade.length > 0 ? `${filters.grade.join(', ')}성` : '전체'}
            </span>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              id="sortOrder"
              className="h-[50px] w-[150px] border rounded-md ml-14"
            >
              <option value="">가격 정렬</option>
              <option value="asc">낮은 가격 순</option>
              <option value="desc">높은 가격 순</option>
            </select>
          </div>
          <ul>
            {data?.pages
              ?.flatMap((page, pageIndex) =>
                page.items.map((hotel: HotelType, index: number) => (
                  <HotelCardList
                    key={`${hotel.id}-${pageIndex}-${index}`}
                    hotel={hotel}
                    isFavorite={favoriteStatus[hotel.id] || false}
                    onToggleFavorite={() => toggleFavorite(hotel.id)}
                  />
                ))
              ) || <p>데이터가 없습니다.</p>}
          </ul>

          <div ref={observerRef} className="h-4"></div>

          {isFetchingNextPage && <p>Loading more...</p>}

          {!hasNextPage &&
            Array.isArray(data?.pages) &&
            data.pages.reduce((acc, page) => acc + page.items.length, 0) > 0 ? (
            <p className="text-center mt-4">모든 호텔 데이터를 불러왔습니다.</p>
          ) : null}

          {error && <p className="text-center mt-4 text-red-500">데이터를 불러오는 중 문제가 발생했습니다.</p>}
        </div> 
      </div>
    </div>
  );
};

export default HotelList;
