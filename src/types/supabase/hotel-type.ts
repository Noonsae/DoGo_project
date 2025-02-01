import { Tables } from './supabase-type';

export type HotelType = Tables<'hotels'>;

type RoomWithPrice = {
  price: number;
  view: string;
};

// 간소화된 호텔 타입 정의
export interface HotelWithPriceOnly extends Partial<HotelType> {
  rooms?: RoomWithPrice[];
  min_price?: number;
  max_price?: number;
  facility_ids?: string[] | null; // ✅ undefined 허용 (선택적 속성으로 변경)
  service_ids?: string[] | null; // ✅ undefined 허용
}

// 슬라이더에서 사용되는 타입 정의
export interface Props {
  hotels: HotelWithPriceOnly[];
}
