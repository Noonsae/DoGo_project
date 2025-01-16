import { Tables } from './supabase-type';

export type HotelType = Tables<'hotels'>;

type RoomWithPrice = {
  price: number;
};

// 간소화된 호텔 타입 정의
export interface HotelWithPriceOnly extends HotelType {
  rooms: RoomWithPrice[];
  min_price: number;
}