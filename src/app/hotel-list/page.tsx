'use client';
import React, { useEffect, useState } from 'react';
import AsideFilter from './_components/AsideFilter';
import { HotelType } from '@/types/supabase/hotel-type';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuth';
import HotelCardList from './_components/HotelsCardList';

const HotelList = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<{ grade?: number } | undefined>();
  const [favoriteStatus, setFavoriteStatus] = useState<{ [key: string]: boolean }>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');

  const loadUserFromCookie = useAuthStore((state) => state.loadUserFromCookie);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    loadUserFromCookie();
  }, []);

  useEffect(() => {
    loadHotels();
  }, [filteredHotels]); // 필터가 변경되었을 때만 호출

  const loadHotels = async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries({
          ...(filteredHotels || {}),
          ...(sortOrder && { sortOrder })
        }).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      );

      const response = await fetch(`/api/hotel?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch hotels');

      const hotelsData = await response.json();
      setHotels(hotelsData);
    } catch (error) {
      console.error('Error loading hotels:', error);
    }
  };

  useEffect(() => {
    const sortedHotels = [...hotels];

    if (sortOrder === 'asc') {
      sortedHotels.sort((a, b) => (a.min_price ?? Infinity) - (b.min_price ?? Infinity));
    } else if (sortOrder === 'desc') {
      sortedHotels.sort((a, b) => (b.min_price ?? 0) - (a.min_price ?? 0));
    }

    setHotels(sortedHotels);
  }, [sortOrder]);

  const toggleFavorite = async (hotelId: string) => {
    if (!user) {
      Swal.fire({
        title: '로그인이 필요합니다.',
        text: '회원 정보를 확인할 수 없습니다. 로그인 후 이용해 주세요.',
        confirmButtonText: '확인'
      });
      return;
    }

    try {
      const action = favoriteStatus[hotelId] ? 'remove' : 'add';

      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId: user.id, hotelId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Server response:', errorData);
        throw new Error('Failed to update favorite status');
      }

      const { success } = await res.json();
      if (success) {
        setFavoriteStatus((prev) => ({ ...prev, [hotelId]: !prev[hotelId] }));
      }
    } catch (error) {
      Swal.fire({
        title: '오류 발생',
        text: '즐겨찾기 상태를 변경하는 중 오류가 발생했습니다.',
        confirmButtonText: '확인'
      });
    }
  };

  const handleFilterChange = (newFilters: { grade?: number }) => {
    setFilteredHotels(newFilters || undefined);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value as 'asc' | 'desc' | '';
    setSortOrder(selectedOrder);
  };

  return (
    <div className="mx-[360px]">
      <div>
        <h1 className="font-bold w-full my-6">DoGo</h1>
      </div>

      <div className="flex gap-8 mt-16">
        <AsideFilter onFilterChange={handleFilterChange} />
        <div className="flex-1">
          <ul>
            {hotels.map((hotel) => (
              <HotelCardList
                key={hotel.id}
                hotel={hotel}
                isFavorite={favoriteStatus[hotel.id] || false}
                onToggleFavorite={() => toggleFavorite(hotel.id)}
              />
            ))}
          </ul>
        </div>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          id="sortOrder"
          className="h-[50px] w-[150px] border rounded-md"
        >
          <option value="">가격 정렬</option>
          <option value="asc">낮은 가격 순</option>
          <option value="desc">높은 가격 순</option>
        </select>
      </div>
    </div>
  );
};

export default HotelList;
