import { Tables } from './supabase-type';

export type HotelType = Tables<'hotels'>;

type RoomWithPrice = {
  price: number;
};

// 간소화된 호텔 타입 정의
export interface HotelWithPriceOnly extends HotelType {
  room?: RoomWithPrice[];
  min_price: number;
}

// 슬라이더에서 사용되는 타입 정의
export interface Props {
  hotels: HotelWithPriceOnly[];
}