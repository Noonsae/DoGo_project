import { HotelWithPriceOnly } from "../supabase/hotel-type";

export interface HistoryStoreType {
  history: HotelWithPriceOnly[];
  addHotel: (hotel: HotelWithPriceOnly) => void;
  setMostFrequentLocation: (location: string) => void;
  mostFrequentLocation: string;
  price?: number;
  removeHotel: (locationId: string) => void; // 삭제 메서드 정의
}

