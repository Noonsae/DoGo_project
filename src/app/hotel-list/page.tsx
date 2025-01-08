'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AsideFilter from './_components/AsideFilter';
import { HotelType } from '@/types/supabase/hotel-type';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuth';

const HotelList = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]); // 호텔 데이터
  const [filteredHotels, setFilteredHotels] = useState<{ grade?: number } | null>(null); // 필터 상태
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
    setFilteredHotels(newFilters);
  };

  // 별 렌더링
  const renderStars = (stars: number) => {
    return Array.from({ length: stars }, (_, index) => (
      <svg key={index} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.99984 0.166748L10.0571 5.66852L15.9253 5.92494L11.3285 9.58164L12.898 15.2419L7.99984 12.0001L3.10163 15.2419L4.67114 9.58164L0.0743661 5.92494L5.94259 5.66852L7.99984 0.166748Z"
          fill="#B3B3B3"
        />
      </svg>
    ));
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
              <li
                key={hotel.id}
                className="w-[872px] h-[277px] flex items-center border border-gray-300 rounded-md shadow-md mb-4 p-4 bg-white"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={hotel.main_img_url || '/default-hotel.jpg'}
                    alt={hotel.name || 'Default Image'}
                    width={325}
                    height={245}
                    className="object-cover block ml-3 rounded-md"
                  />
                </div>
                <div className="ml-[16px] h-[245px] flex flex-col justify-between">
                  <h3 className="text-lg font-semibold leading-none">{hotel.name}</h3>
                  <p className="bg-[#E8E8E8] py-1 px-2 flex rounded-sm w-full">{renderStars(hotel.stars)}</p>
                  <button onClick={() => toggleFavorite(hotel.id)} className="ml-auto p-2" aria-label="찜하기 버튼">
                    <svg
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill={favoriteStatus[hotel.id] ? '#FF0000' : '#767676'}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 18.9999L8.55 17.6999C6.86667 16.1832 5.475 14.8749 4.375 13.7749C3.275 12.6749 2.4 11.6874 1.75 10.8124C1.1 9.9374 0.645833 9.13324 0.3875 8.3999C0.129167 7.66657 0 6.91657 0 6.1499C0 4.58324 0.525 3.2749 1.575 2.2249C2.625 1.1749 3.93333 0.649902 5.5 0.649902C6.36667 0.649902 7.19167 0.833236 7.975 1.1999C8.75833 1.56657 9.43333 2.08324 10 2.7499C10.5667 2.08324 11.2417 1.56657 12.025 1.1999C12.8083 0.833236 13.6333 0.649902 14.5 0.649902C16.0667 0.649902 17.375 1.1749 18.425 2.2249C19.475 3.2749 20 4.58324 20 6.1499C20 6.91657 19.8708 7.66657 19.6125 8.3999C19.3542 9.13324 18.9 9.9374 18.25 10.8124C17.6 11.6874 16.725 12.6749 15.625 13.7749C14.525 14.8749 13.1333 16.1832 11.45 17.6999L10 18.9999ZM10 16.2999C11.6 14.8666 12.9167 13.6374 13.95 12.6124C14.9833 11.5874 15.8 10.6957 16.4 9.9374C17 9.17907 17.4167 8.50407 17.65 7.9124C17.8833 7.32074 18 6.73324 18 6.1499C18 5.1499 17.6667 4.31657 17 3.6499C16.3333 2.98324 15.5 2.6499 14.5 2.6499C13.7167 2.6499 12.9917 2.87074 12.325 3.3124C11.6583 3.75407 11.2 4.31657 10.95 4.9999H9.05C8.8 4.31657 8.34167 3.75407 7.675 3.3124C7.00833 2.87074 6.28333 2.6499 5.5 2.6499C4.5 2.6499 3.66667 2.98324 3 3.6499C2.33333 4.31657 2 5.1499 2 6.1499C2 6.73324 2.11667 7.32074 2.35 7.9124C2.58333 8.50407 3 9.17907 3.6 9.9374C4.2 10.6957 5.01667 11.5874 6.05 12.6124C7.08333 13.6374 8.4 14.8666 10 16.2999Z" />
                    </svg>
                  </button>
                  <p className="text-gray-600">{hotel.description}</p>
                  <p className="text-gray-600">{hotel.address}</p>
                  {/* <p className="text-lg font-bold text-gray-800">{hotel.min_price}원</p> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
