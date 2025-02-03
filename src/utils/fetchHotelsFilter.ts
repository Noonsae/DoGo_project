import { browserSupabase } from '@/supabase/supabase-client';
import { FetchHotelsFilterResponse, UseFetchHotelsFilterParamsType } from '@/types/hotel/hotel-filter-type';

// fetchHotelsFilter 함수
const fetchHotelsFilter = async ({
  pageParam = 0,
  filters = {
    label: '',
    stars: [],
    location: '',
    minPrice: 0,
    maxPrice: 2000000,
    facilities: [], // 중첩 구조에 맞게 수정
    services: [],
    facilityIds: [],
    serviceIds: [],
    beds: [] // 추가: 침대 필터
  },
  sortOrder = ''
}: UseFetchHotelsFilterParamsType): Promise<FetchHotelsFilterResponse> => {
  const supabase = browserSupabase();

  // Supabase 기본 쿼리
  // 방법1) sql문을 바꾼다 -> 정렬 상태에 따라 미리 최소 방 가격을 가져와서 ~~~~
  // 방법3) schema에 미리 min_price를 넣어둔다.
  let query = supabase.from('hotels').select(
    `*,      
      rooms!inner(price, bed_type),
      hotel_facility(facility_id, facilities(name)),
      hotel_service(service_id, services(name))`,
    { count: 'exact', head: false }
  );

  // 1. 필터 조건 추가
  if (filters.stars.length > 0) {
    query = query.in('stars', filters.stars); // 등급 필터
  }

  // 2. 가격 조건 처리
  if (filters.minPrice != null && filters.minPrice >= 0) {
    query = query.gte('rooms.price', filters.minPrice);
  }
  if (filters.maxPrice != null && filters.maxPrice > 0) {
    query = query.lte('rooms.price', filters.maxPrice);
  }

  // 2.5 필터가 없을 경우 조건 처리
  if (!filters.minPrice && !filters.maxPrice) {
    query = query.order('rooms.price', { ascending: true }); // 가장 저렴한 가격 먼저 정렬
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
  if (filters.facilityIds.length !== 0) {
    query = query.contains('facility_ids', filters.facilityIds);
  }

  // 6. 제공 서비스 처리
  if (filters.serviceIds.length !== 0) {
    query = query.contains('service_ids', filters.serviceIds);
  }

  // 7. 침대 타입 필터 처리
  // TODO: 임시 방편 처리 -> 추후 수정 가능
  const decodedBeds = filters.beds.map((bed) => decodeURIComponent(bed));
  if (decodedBeds.length > 0) {
    query = query.in('rooms.bed_type', decodedBeds[0].split(','));
  }

  // 8. 정렬 조건 처리
  if (sortOrder) {
    query = query.order('rooms.price', { ascending: sortOrder === 'asc' });
  }

  // ⭐ 추가: stars 순으로 정렬
  query = query.order('stars', { ascending: false }); // 높은 등급(stars) 먼저 가져오기

  // 9. 페이지네이션 처리
  const { count } = await query;

  query = query.range(pageParam ? 4 * (pageParam - 1) : 0, 4 * pageParam - 1); // 한 번에 4개씩 가져오기

  // 10. 쿼리 실행
  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch hotels: ${error.message}`);
  }

  // 11. 결과 반환
  return {
    items: (data || []).map((hotel) => {
      // 호텔의 객실을 필터링한 후 가격 계산
      const filteredRooms = hotel.rooms.filter(
        (room) => filters.beds.length === 0 || filters.beds.includes(room.bed_type)
      );

      // 해당 호텔에서 최소 가격 계산
      const min_price = filteredRooms.length > 0 ? Math.min(...filteredRooms.map((room) => room.price)) : 0;

      // 방법2) 가져온 후 정렬
      return {
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
        facility_ids: hotel.facility_ids ?? null,
        service_ids: hotel.service_ids ?? null,
        facilities: hotel.hotel_facility.filter((fac) => !!fac.facilities?.name),
        services: hotel.hotel_service,
        label: `${hotel.name} ${hotel.address}`,
        min_price: min_price, // 필터링된 객실 가격을 반영
        rooms: filteredRooms // 필터링된 객실 정보
      };
    }),
    totalCount: count || 0
  };
};

export default fetchHotelsFilter;
