import { HotelWithPriceOnly } from "../supabase/hotel-type";

export interface HistoryStoreType {
  history: HotelWithPriceOnly[];
  addHotel: (hotel: HotelWithPriceOnly) => void;
  setMostFrequentLocation: (location: string) => void;
  mostFrequentLocation: string;
  price?: number;
}

