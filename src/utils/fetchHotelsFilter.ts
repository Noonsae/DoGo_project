'use client';

import { browserSupabase } from '@/supabase/supabase-client';
import { FetchHotelsFilterResponse, UseFetchHotelsFilterParamsType } from '@/types/hotel-filter-type';

// 필터 타입 정의

// fetchHotelsFilter 함수
const fetchHotelsFilter = async ({
  pageParam = 0,
  filters = {
    stars: [],
    minPrice: 0,
    maxPrice: 10000000,
    location: '',
    facilities: [],
    services: []
  },
  sortOrder = ''
}: UseFetchHotelsFilterParamsType): Promise<FetchHotelsFilterResponse> => {
  const supabase = browserSupabase();

  // Supabase 기본 쿼리
  let query = supabase.from('hotels').select('*');

  // // 1. 필터 조건 추가
  if (filters.stars.length > 0) {
    query = query.in('stars', filters.stars); // 등급 필터
  }

  // 2. 가격 조건 처리
  // if (filters.minPrice != null && filters.minPrice >= 0) {
  //   query = query.gte('price', filters.minPrice);
  //   console.log(filters.minPrice);
  // }
  // if (filters.maxPrice != null && filters.maxPrice > 0) {
  //   query = query.lte('price', filters.maxPrice);
  //   console.log(filters.maxPrice);
  // }

  // 3. 위치 필터 처리
  if (filters.location) {
    query = query.eq('location', filters.location);
  }

  // 4. 시설 조건 처리
  if (filters.facilities.length > 0) {
    query = query.contains('facilities', filters.facilities);
  }

  // 5. 서비스 조건 처리
  if (filters.services.length > 0) {
    query = query.contains('services', filters.services);
  }

  // 6. 정렬 조건 처리
  if (sortOrder) {
    query = query.order('price', { ascending: sortOrder === 'asc' }); // 정렬 기준: 가격
  }

  // 7. 페이지네이션 처리
  query = query.range(pageParam * 10, pageParam * 10 + 9); // 한 번에 10개씩 가져오기

  // 8. 쿼리 실행
  const { data, error, count } = await query;

  console.log(data);

  if (error) {
    throw new Error(`Failed to fetch hotels: ${error.message}`);
  }

  // 9. 결과 반환
  return {
    items: (data || []).map((hotel) => ({
      address: hotel.address,
      check_in: hotel.check_in,
      check_out: hotel.check_out,
      description: hotel.description,
      hotel_img_urls: hotel.hotel_img_urls || null,
      id: hotel.id,
      location: hotel.location,
      main_img_url: hotel.main_img_url,
      name: hotel.name,
      stars: hotel.stars,
      user_id: hotel.user_id
    })),
    totalCount: count || 0
  };
};

export default fetchHotelsFilter;
