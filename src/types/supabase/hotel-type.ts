import { Tables } from './supabase-type';

// HotelType 정의를 가져옵니다
export type HotelType = Tables<'hotels'>;
export type ReviewType = Tables<'reviews'>;

// Room 타입 정의
type RoomWithPrice = {
  price: number;
  view: string;
};

// 간소화된 호텔 타입 정의
export interface HotelWithPriceOnly extends Omit<HotelType, 'facility_ids' | 'service_ids'> {
  rooms?: RoomWithPrice[];
  min_price?: number;
  max_price?: number;
  facility_ids?: string[] | null; // ✅ 선택적 속성으로 변경
  service_ids?: string[] | null; // ✅ 선택적 속성으로 변경
  reviews?: ReviewType[]; // 리뷰 배열 추가
}

// 슬라이더에서 사용되는 타입 정의
export interface Props {
  hotels: HotelWithPriceOnly[];
}
