'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AsideFilter from './_components/AsideFilter';
import { HotelType } from '@/types/supabase/hotel-type';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuth';
import HotelCardList from './_components/HotelsCardList';

const HotelList = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]); // 호텔 데이터
  const [filteredHotels, setFilteredHotels] = useState<{ grade?: number } | undefined>(undefined); // 필터 상태
  const [favoriteStatus, setFavoriteStatus] = useState<{ [key: number]: boolean }>({}); // 즐겨찾기 상태
  const loadUserFromCookie = useAuthStore((state) => state.loadUserFromCookie);
  const user = useAuthStore((state) => state.user);

  // 유저 정보 로드
  useEffect(() => {
    loadUserFromCookie();
  }, []);

  // 필터 및 유저 상태 변경 감지
  useEffect(() => {
    if (user) {
      loadHotelsAndFavorites(filteredHotels);
    }
  }, [user, filteredHotels]);

  // 호텔 및 즐겨찾기 상태 로드
  const loadHotelsAndFavorites = async (filters?: { grade?: number }) => {
    try {
      // 1. 필터 적용된 호텔 데이터 가져오기
      const queryString = filters ? `?${new URLSearchParams(filters as any).toString()}` : '';
      const response = await fetch(`/api/hotel${queryString}`);
      if (!response.ok) throw new Error('Failed to fetch hotels');
      const hotelsData = await response.json();
      setHotels(hotelsData);

      // 2. 유저의 즐겨찾기 상태 가져오기
      if (user) {
        const favoriteStatuses: { [key: number]: boolean } = {};
        for (const hotel of hotelsData) {
          const res = await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'check', userId: user.id, hotelId: hotel.id })
          });
          const { isFavorite } = await res.json();
          favoriteStatuses[hotel.id] = isFavorite;
        }
        setFavoriteStatus(favoriteStatuses);
      }
    } catch (error) {
      console.error('Error loading hotels or favorites:', error);
    }
  };

  // 즐겨찾기 토글
  const toggleFavorite = async (hotelId: number) => {
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

      if (!res.ok) throw new Error('Failed to update favorite status');
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

  // 필터 변경 시 호출
  const handleFilterChange = (newFilters: { grade?: number }) => {
    setFilteredHotels(newFilters || undefined);
  };

  return (
    <div className="mx-[360px]">
      {/* 헤더 */}
      <div>
        <h1 className="font-bold w-full my-6">DoGo</h1>
      </div>

      {/* 검색 섹션 */}
      <div className="p-6 rounded-md border bg-white shadow-md">
        <div className="flex items-center justify-between px-[32px]">
          <div className="w-[208px]">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              여행지
            </label>
            <input id="location" type="text" placeholder="서울" className="border rounded-md p-2 w-full h-[40px]" />
          </div>
          <div className="w-[208px]">
            <label htmlFor="checkin" className="block text-sm font-medium text-gray-700">
              체크인
            </label>
            <input id="checkin" type="date" className="border rounded-md p-2 w-full h-[40px]" />
          </div>
          <div className="w-[208px]">
            <label htmlFor="checkout" className="block text-sm font-medium text-gray-700">
              체크아웃
            </label>
            <input id="checkout" type="date" className="border rounded-md p-2 w-full h-[40px]" />
          </div>
          <div className="w-[256px]">
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
              객실 및 인원
            </label>
            <input
              id="guests"
              type="text"
              placeholder="성인 2명, 반려동물 1마리"
              className="border rounded-md p-2 w-full h-[40px]"
            />
          </div>
          <div className="w-auto">
            <button className="bg-[#7C7C7C] text-white px-[24px] py-[8px] rounded-md h-[63px] w-[95px] hover:bg-gray-800">
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 컨텐츠 섹션 */}
      <div className="mt-8 flex gap-8">
        <AsideFilter onFilterChange={handleFilterChange} />
        <div className="flex-1">
          <ul>
            {hotels.map((hotel) => (
              <HotelCardList
                key={hotel.id}
                hotel={hotel}
                isFavorite={favoriteStatus[hotel.id] || false}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
