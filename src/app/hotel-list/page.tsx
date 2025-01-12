'use client';

import React, { useEffect, useState } from 'react';
import AsideFilter from './_components/AsideFilter';
import { HotelType } from '@/types/supabase/hotel-type';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuth';
import HotelCardList from './_components/HotelsCardList';

const HotelList = () => {
  const [allHotels, setAllHotels] = useState<HotelType[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelType[]>([]);
  const [filters, setFilters] = useState<{
    grade: number[];
    facilities: string[];
    services: string[];
  }>({
    grade: [],
    facilities: [],
    services: [],
  });
  const [favoriteStatus, setFavoriteStatus] = useState<{ [key: string]: boolean }>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');

  const loadUserFromCookie = useAuthStore((state) => state.loadUserFromCookie);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    loadUserFromCookie();
  }, []);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const response = await fetch('/api/hotel');
      if (!response.ok) throw new Error('Failed to fetch hotels');
      const hotelsData: HotelType[] = await response.json();
      setAllHotels(hotelsData);
      setFilteredHotels(hotelsData);
    } catch (error) {
      console.error('Error loading hotels:', error);
    }
  };

  // 필터 상태가 변경될 때마다 필터를 적용
  useEffect(() => {
    applyFilters(filters);
  }, [filters]);

  const applyFilters = (currentFilters: typeof filters) => {
    const filtered = allHotels.filter((hotel) => {
      const gradeMatch =
        currentFilters.grade.length > 0 ? currentFilters.grade.includes(hotel.stars) : true;

      const facilitiesMatch =
        currentFilters.facilities.length > 0
          ? currentFilters.facilities.every((facility) => hotel.facilities?.[facility])
          : true;

      const servicesMatch =
        currentFilters.services.length > 0
          ? currentFilters.services.every((service) => hotel.services?.[service])
          : true;

      return gradeMatch && facilitiesMatch && servicesMatch;
    });

    setFilteredHotels(filtered);
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value as 'asc' | 'desc' | '';
    setSortOrder(selectedOrder);

    const sortedHotels = [...filteredHotels];
    if (selectedOrder === 'asc') {
      sortedHotels.sort((a, b) => (a.min_price ?? Infinity) - (b.min_price ?? Infinity));
    } else if (selectedOrder === 'desc') {
      sortedHotels.sort((a, b) => (b.min_price ?? 0) - (a.min_price ?? 0));
    }

    setFilteredHotels(sortedHotels);
  };

  const getAppliedFilters = () => {
    const appliedFilters: string[] = [];
    if (filters.grade.length > 0) appliedFilters.push(`성급: ${filters.grade.join(', ')}`);
    if (filters.facilities.length > 0) appliedFilters.push(`시설: ${filters.facilities.join(', ')}`);
    if (filters.services.length > 0) appliedFilters.push(`서비스: ${filters.services.join(', ')}`);
    return appliedFilters.join(' | ');
  };

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
      const action = favoriteStatus[hotelId] ? 'remove' : 'add';

      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId: user.id, hotelId }),
      });

      if (!res.ok) {
        throw new Error('Failed to update favorite status');
      }

      setFavoriteStatus((prev) => ({ ...prev, [hotelId]: !prev[hotelId] }));
    } catch (error) {
      Swal.fire({
        title: '오류 발생',
        text: '즐겨찾기 상태를 변경하는 중 오류가 발생했습니다.',
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <div className="mx-[360px]">
      <div>
        <h1 className="font-bold my-6">DoGo</h1>
      </div>

      <div className="flex gap-8 mt-16">
        <AsideFilter onFilterChange={handleFilterChange} />

        <div className="flex-1">
          <span>적용필터 : {getAppliedFilters()}</span>
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
          <ul>
            {filteredHotels.map((hotel) => (
              <HotelCardList
                key={hotel.id}
                hotel={hotel}
                isFavorite={favoriteStatus[hotel.id] || false}
                onToggleFavorite={() => toggleFavorite(hotel.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
