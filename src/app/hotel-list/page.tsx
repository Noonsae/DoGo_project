'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { fetchHotels } from '../api/hotel/list/hotelsApi';
import { HotelsDatabase } from '@/types/supabase/supabase-type';
import Image from 'next/image';

type Hotel = HotelsDatabase['public']['Tables']['hotels']['Row'];

const hotelList = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const loadHotels = async () => {
      const data = await fetchHotels();
      setHotels(data);
    };
    loadHotels();
  }, []);
  return (
    <>
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
          <aside className="w-[300px] p-4 border border-gray-300 rounded-md bg-gray-50">
            <h2 className="text-lg font-bold mb-4">필터</h2>
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-2">가격</h3>
              {/* 가격 필터 */}
              <input type="range" min="0" max="30000000" step="100000" className="w-full" />
            </div>
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-2">평점</h3>
              {/* 평점 필터 */}
              <ul>
                <li>
                  <input type="radio" id="rating1" name="rating" />
                  <label htmlFor="rating1" className="ml-2">
                    5점
                  </label>
                </li>
                <li>
                  <input type="radio" id="rating2" name="rating" />
                  <label htmlFor="rating2" className="ml-2">
                    4점 이상
                  </label>
                </li>
              </ul>
            </div>
            {/* 추가 필터 섹션 */}
            <div>
              <h3 className="text-md font-semibold mb-2">공용 시설</h3>
              <ul>
                <li>
                  <input type="checkbox" id="facility1" />
                  <label htmlFor="facility1" className="ml-2">
                    Wi-Fi
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="facility2" />
                  <label htmlFor="facility2" className="ml-2">
                    주차장
                  </label>
                </li>
              </ul>
            </div>
          </aside>

          {/* 호텔 리스트 */}

          <ul>
            <p>총 {}개의 결과</p>
            <p className="mt-3">적용 필터:</p>

            <div className="flex-1 border border-gray-300 rounded-md p-6 w-full ">
              <Link href="">
                {hotels.map((hotel, index) => (
                  <li className="w-[872px] h-[277px] mt-[32px] flex items-center" key={index}>
                    <Image src={hotel.main_img_url} alt={hotel.name || 'Default Image'} width={325} height={245} />
                    <h3>{hotel.name}</h3>
                  </li>
                ))}
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default hotelList;
