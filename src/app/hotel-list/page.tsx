'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import AsideFilter from './_components/AsideFilter';
import { fetchHotelsAndRooms } from '../api/hotel/list/hotelsApi';
import { HotelsType } from '@/types/supabase/supabase-type';

const HotelList = () => {
  const [hotels, setHotels] = useState<HotelsType[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<number | null>(null);

  const loadHotels = async (appliedFilters?: { grade?: number }) => {
    try {
      const { hotels } = await fetchHotelsAndRooms(appliedFilters || filteredHotels);
      setHotels(hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleFilterChange = (newFilters: { grade?: number }) => {
    setFilteredHotels((prevFilters) => ({ ...prevFilters, ...newFilters }));
    loadHotels(newFilters); // 새 필터 조건으로 데이터 로드
  };

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const { hotels } = await fetchHotelsAndRooms();
        setHotels(hotels); // 전체 데이터 저장
        setFilteredHotels(hotels); // 초기에는 전체 데이터를 표시
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    loadHotels(); // 초기 데이터 로드
  }, []);

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
          {/* 지역 검색 */}
          <div className="w-[208px]">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              여행지
            </label>
            <input id="location" type="text" placeholder="서울" className="border rounded-md p-2 w-full h-[40px]" />
          </div>

          {/* 체크인 */}
          <div className="w-[208px]">
            <label htmlFor="checkin" className="block text-sm font-medium text-gray-700">
              체크인
            </label>
            <input id="checkin" type="date" className="border rounded-md p-2 w-full h-[40px]" />
          </div>

          {/* 체크아웃 */}
          <div className="w-[208px]">
            <label htmlFor="checkout" className="block text-sm font-medium text-gray-700">
              체크아웃
            </label>
            <input id="checkout" type="date" className="border rounded-md p-2 w-full h-[40px]" />
          </div>

          {/* 객실 및 인원 */}
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

          {/* 검색 버튼 */}
          <div className="w-auto">
            <button className="bg-[#7C7C7C] text-white px-[24px] py-[8px] rounded-md h-[63px] w-[95px] hover:bg-gray-800">
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 컨텐츠 섹션 */}
      <div className="mt-8 flex gap-8">
        {/* 사이드 필터바 */}
        <AsideFilter onFilterChange={handleFilterChange} />

        {/* 호텔 리스트 */}
        <div className="flex-1">
          <ul>
            {hotels.length > 0 &&
              hotels.map((hotel, index) => (
                <li
                  key={index}
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
                    <p className="text-gray-600">{hotel.description}</p>
                    <p className="text-gray-600">{hotel.address}</p>
                    <p className="text-lg font-bold text-gray-800">{hotel.min_price}원</p>
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
