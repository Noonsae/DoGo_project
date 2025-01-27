import { HotelType } from '../supabase/hotel-type';

export interface HotelOverviewProps {
  hotelData: HotelType;
  toggleFavorite: (hotelId: string) => void;
  hotelId: string;
  favoriteStatus: Record<string, boolean>;
}
