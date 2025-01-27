'use client';

import { browserSupabase } from '@/supabase/supabase-client';
import { FetchHotelsFilterResponse, UseFetchHotelsFilterParamsType } from '@/types/hotel/hotel-filter-type';

// 필터 타입 정의


// 계획
// 1,2 가 포함되느냐?
// hotels.facility_ids.contains -> 
// hotels: { id: ~, name: ~, facility_ids: [1, 2, 3] -> text -> defined as array , service_ids: []  }
// rooms: { id: ~~~, hotel_id: ~~, price: ~~~ }
// facilities: { id: uuid~~,  name: ~~~ }
// hotel_facilities X 

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
    services: [],
    facilityIds: [],
    serviceIds: [],
  },
  sortOrder = ''
}: UseFetchHotelsFilterParamsType): Promise<FetchHotelsFilterResponse> => {
  const supabase = browserSupabase();

  // Supabase 기본 쿼리
  let query = supabase.from('hotels').select(
    `
      *,
      rooms!inner(price, view),
      hotel_facility!inner(
        facility_id,
        facilities!inner(name)
      ),
      hotel_service(
        service_id,
        services(name)
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
    query = query.gte('rooms.price', 300000);
  }
  if (filters.maxPrice != null && filters.maxPrice > 0) {
    query = query.lte('rooms.price', filters.maxPrice);
  }

  // 예시
  // let a  = [
  //     "23c143b4-cc1e-4972-b4e6-558f85483b4f",
  // "7ceeb937-0ba8-48bd-b301-59dcd015f038",
  // "7ce9323a-9182-4398-908e-419ea2aa4904",
  //   ];

  if (filters.facilityIds.length !== 0) {
    query = query.contains('facility_ids', filters.facilityIds);
  }
  
  // 3. 지역 필터 처리
  if (filters.location) {
    query = query.eq('location', filters.location);
  }

  // 4. 상세주소 or 이름 필터링
  if (filters.label && filters.label.trim()) {
    query = query.or(`name.ilike.%${filters.label.trim()}%,address.ilike.%${filters.label.trim()}%`);
  }

  // 5. 제공 시설 처리
  // TODO 테이터 형식을 정하고 테스트 한번 해보는게 좋음
  // eq -> map

  // if (filters.facilities.length > 0) {
  // query = query.contains('hotel_facility.facilities.name', "주차장");
  // let test = [{name: "주차장"}]
  // test.forEach((fac) => {
  //   query = query.eq('hotel_facility.facilities.name', fac.name);
  // })
  // }
  // [{name: "주차장"}, { name: "바(BAR)"}]
  // query = query.eq('hotel_facility.facilities.name', "주차장");

  // query = query.eq("hotel_facility.facilities.name", "주차장")
  // query = query.contains('hotel_facility.facilities.name', "주차장");

  // console.log(filters.services)
  // 6. 서비스 조건 처리
  // TODO 테이터 형식을 정하고 테스트 한번 해보는게 좋음
  // if (filters.services.length > 0) {
    
  // let a = ["룸서비스", "무료주차"]
  // a.forEach((service) => {
  //     query = query.eq('hotel_service.services.name', service)
  //   })
  // }

  // 7. 정렬 조건 처리
  if (sortOrder) {
    query = query.order('rooms.price', { ascending: sortOrder === 'asc' }); // 정렬 기준: 가격
  }

  // 8. 페이지네이션 처리
  const { count } = await query;
  query = query.range(pageParam * 3, pageParam * 3 + 3); // 한 번에 3개씩 가져오기

  // 9. 쿼리 실행
  const { data, error } = await query;
  console.log({data})

  if (error) {
    throw new Error(`Failed to fetch hotels: ${error.message}`);
  }

  // 10. 결과 반환
  return {
    items: (data || [])
      .map((hotel) => ({
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
        facilities: hotel.hotel_facility.filter((fac) => !!fac.facilities?.name),
        services: hotel.hotel_service,
        label: `${hotel.name} ${hotel.address}`,
        rooms: hotel.rooms
      })),
    totalCount: count || 0
  };
};

export default fetchHotelsFilter;
