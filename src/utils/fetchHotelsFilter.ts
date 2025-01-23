'use client';

import { browserSupabase } from '@/supabase/supabase-client';
import { FetchHotelsFilterResponse, UseFetchHotelsFilterParamsType } from '@/types/filter/hotel-filter-type';

// 필터 타입 정의

// fetchHotelsFilter 함수
const fetchHotelsFilter = async ({
  pageParam = 0,
  filters = {
    label: '',
    stars: [],
    location: '',
    minPrice: 0,
    maxPrice: 10000000,
    facilities: [], // 중첩 구조에 맞게 수정
    services: []
  },
  sortOrder = ''
}: UseFetchHotelsFilterParamsType): Promise<FetchHotelsFilterResponse> => {
  const supabase = browserSupabase();

  // Supabase 기본 쿼리
  let query = supabase.from('hotels').select(
    `
      *,
      rooms(price, view),
      hotel_service:hotel_service(
        service_id,
        services(name)
      ),
      hotel_facility:hotel_facility(
        facility_id,
        facilities(name)
      )
    `,
    { count: 'exact', head: false }
  );

  // 1. 필터 조건 추가
  if (filters.stars.length > 0) {
    query = query.in('stars', filters.stars); // 등급 필터
  }

  // 2. 가격 조건 처리
  if (filters.minPrice != null && filters.minPrice >= 0) {
    query = query.gte('rooms.price', filters.minPrice);
    console.log(filters.minPrice);
  }
  if (filters.maxPrice != null && filters.maxPrice > 0) {
    query = query.lte('rooms.price', filters.maxPrice);
    console.log(filters.maxPrice);
  }

  // 3. 지역 필터 처리
  if (filters.location) {
    query = query.eq('location', filters.location);
  }

  // 4. 상세주소 or 이름 필터링
  if (filters.label) {
    query = query.ilike('name', `&{filters.name}%, 'address', &{filters.address}`); // 부분 일치 검색
  }

  // 5. 제공 시설 처리
  if (filters.facilities.length > 0) {
    query = query.contains('hotel_facility.facilities.name', filters.facilities);
  }

  // 6. 서비스 조건 처리
  if (filters.services.length > 0) {
    query = query.contains('hotel_service.services.name', filters.services);
  }

  // 7. 정렬 조건 처리
  if (sortOrder) {
    query = query.order('rooms.price', { ascending: sortOrder === 'asc' }); // 정렬 기준: 가격
  }

  // 8. 페이지네이션 처리
  const { count } = await query;
  query = query.range(pageParam * 3, pageParam * 3 + 3); // 한 번에 3개씩 가져오기

  // 9. 쿼리 실행
  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch hotels: ${error.message}`);
  }

  console.log(data);

  // 10. 결과 반환
  return {
    items: (data || []).map((hotel) => ({
      id: hotel.id,
      name: hotel.name,
      stars: hotel.stars,
      address: hotel.address,
      description: hotel.description,
      main_img_url: hotel.main_img_url,
      hotel_img_urls: hotel.hotel_img_urls || null,
      check_in: hotel.check_in,
      check_out: hotel.check_out,
      location: hotel.location,
      user_id: hotel.user_id,
      facilities: hotel.hotel_facility,
      services: hotel.hotel_service,
      label: `${hotel.name} ${hotel.address}`
    })),
    totalCount: count || 0
  };
};

export default fetchHotelsFilter;
