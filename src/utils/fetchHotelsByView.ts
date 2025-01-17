import { browserSupabase } from '@/supabase/supabase-client';

import { HotelType } from '@/types/supabase/hotel-type';
import { HotelWithMinPrice, RoomType } from '@/types/supabase/room-type';

// Room과 연결된 데이터 타입 정의
type RoomWithView = Pick<RoomType, 'price' | 'view'>;

// TODO: 추후 supabase 기본 타입이 있으면 변경하기
type RoomHotelsWithView = RoomWithView & {
  hotels: Pick<HotelType, 'id' | 'name' | 'address' | 'stars' | 'location' | 'main_img_url'>
}

/**
 * Supabase에서 데이터 조회
 * @param view - 필터링할 뷰 (예: "city", "mountain", "ocean", "river")
 * @returns 조회된 rooms와 hotels 데이터를 포함한 배열
 */
const fetchRoomDataByView = async (view: string): Promise<RoomHotelsWithView[]> => {
  const supabase = browserSupabase();

  const { data, error } = await supabase
    .from('rooms') // `rooms` 테이블을 기준으로 조회
    .select(
      `
      hotel_id,
      price,
      view,
      hotels(
        id,
        name,
        address,
        stars,
        location,
        main_img_url
      )
    `
    )
    .eq('view', view) // 특정 view 필터
    .limit(10); // 결과를 10개로 제한

  if (error) {
    throw new Error(`호텔 데이터를 가져오는 중 오류 발생: ${error.message}`);
  }

  console.log('Fetching hotels for view:', view);

  return data;
};

/**
 * 최소 가격 계산 및 데이터 재구성
 * @param data - 조회된 rooms와 hotels 데이터를 포함한 배열
 * @returns HotelWithMinPrice 배열
 */
const calculateMinPrice = (data: RoomHotelsWithView[]): HotelWithMinPrice[] => {
  return data.reduce((acc: HotelWithMinPrice[], room: RoomHotelsWithView) => {
    const hotel = room.hotels as HotelType;
    if (!hotel) return acc;

    const existingHotel = acc.find((h) => h.id === hotel.id);
    if (existingHotel) {
      existingHotel.min_price = Math.min(existingHotel.min_price, room.price);
    } else {
      acc.push({
        ...hotel,
        min_price: room.price
      });
    }
    return acc;
  }, [])
};

/**
 * 특정 view에 따라 호텔 데이터 가져오기
 * @param view - 필터링할 뷰 (예: "city", "mountain", "ocean", "river")
 * @returns 조건에 맞는 호텔 및 최소 가격 데이터
 */
const fetchHotelsByViewWithMinPrice = async (view: string): Promise<HotelWithMinPrice[]> => {
  try {
    if (view === 'all') {
      // "all"일 때 모든 뷰 데이터를 병렬로 가져오기
      const [city, ocean, mountain, river] = await Promise.all([
        fetchRoomDataByView('city'),
        fetchRoomDataByView('ocean'),
        fetchRoomDataByView('mountain'),
        fetchRoomDataByView('river')
      ]);

      // 모든 데이터를 합쳐서 계산
      const mergedData = [...city, ...ocean, ...mountain, ...river];

      const calculatedData = calculateMinPrice(mergedData);

      // 최대 20개의 결과만 반환
      return calculatedData.slice(0, 20);
    }

    // 단일 뷰 데이터 처리
    const data = await fetchRoomDataByView(view);
    return calculateMinPrice(data);
  } catch (error) {
    console.error('호텔 데이터를 가져오는 중 오류가 발생하였습니다. :', error);
    throw error;
  }
};

export default fetchHotelsByViewWithMinPrice;
