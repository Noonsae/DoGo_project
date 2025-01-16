import { HotelType } from "./hotel-type";
import { Tables } from "./supabase-type";

export type RoomType = Tables<'rooms'>;

// HotelType을 확장하여 rooms 필드를 포함
export interface HotelWithMinPrice extends HotelType {
  minPrice: number; // 최소 가격 필드 추가
}