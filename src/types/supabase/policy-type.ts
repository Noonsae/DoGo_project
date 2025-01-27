import { HotelType } from './hotel-type';
import { Tables } from './supabase-type';

export type PolicyType = Tables<'policies'> & {
  hotelId: HotelType;
};
