import { browserSupabase } from '@/supabase/supabase-client';
import { HotelWithPriceOnly } from '@/types/supabase/hotel-type';

/**
 * Supabase에서 호텔 데이터를 가져오는 함수
 * @param location - 필터링할 호텔의 위치
 * @returns 조건에 맞는 호텔 데이터 (raw 데이터)
 */
const fetchRawHotelsByLocation = async (location: string): Promise<HotelWithPriceOnly[]> => {
  const supabase = browserSupabase();

  const query = await supabase
    .from('hotels')
    .select(
      `
      id,
      name,
      address,
      stars,
      location,
      main_img_url,
      rooms(price)
    `
    )
    .eq('location', location)
    .order('stars', { ascending: false })
    .limit(10);

  const { data, error } = (await query) as unknown as { data: HotelWithPriceOnly[]; error: Error | null };

  if (error) {
    throw new Error(`호텔 데이터를 가져오는 중 오류 발생: ${error.message}`);
  }

  return data;
};

/**
 * 최소 가격을 계산하는 함수
 * @param hotels - Supabase에서 가져온 호텔 데이터
 * @returns 최소 가격 필드가 추가된 호텔 데이터
 */
const calculateMinPrice = (hotels: HotelWithPriceOnly[]): (HotelWithPriceOnly & { min_price: number })[] => {
  return hotels.map((hotel) => {
    if (hotel.rooms) {
      const min_price = Math.min(...hotel.rooms.map((rooms) => rooms.price));
      return {
        ...hotel,
        min_price: min_price
      };
    } else {
      // TODO: 수정 필요
      return {
        ...hotel,
        min_price: 0
      };
    }
  });
};

/**
 * 특정 location에 따라 호텔 데이터 가져오기 (최소 가격 포함)
 * @param location - 필터링할 호텔의 위치
 * @returns 조건에 맞는 호텔 데이터 (최소 가격 포함)
 */
const fetchHotelsByLocationWithMinPrice = async (
  location: string
): Promise<(HotelWithPriceOnly & { min_price: number })[]> => {
  try {
    if (location === 'all') {
      // 모든 지역 데이터 병렬로 호출

      const locations = ['seoul', 'incheon', 'gwangju', 'daegu', 'daejeon', 'busan', 'ulsan', 'jeju'];
      const allLocationsData = await Promise.all(locations.map((location) => fetchRawHotelsByLocation(location)));

      // 모든 데이터를 합쳐서 계산
      const mergedData = allLocationsData.flat();

      const uniqueData = Array.from(
        new Map(mergedData.map((hotel) => [hotel.id, hotel])).values() // 중복 제거
      );

      const calculatedData = calculateMinPrice(uniqueData);

      // 최대 20개의 결과만 반환
      return calculatedData.slice(0, 20);
    }

    // 단일 뷰 데이터 처리
    const data = await fetchRawHotelsByLocation(location);
    return calculateMinPrice(data);
  } catch (error) {
    console.error('호텔 데이터를 가져오는 중 오류가 발생하였습니다. :', error);
    throw error;
  }
};

export default fetchHotelsByLocationWithMinPrice;
