import { HotelType } from '../supabase/hotel-type';

export interface UserType {
  id: string;
  stars: HotelType;
}
