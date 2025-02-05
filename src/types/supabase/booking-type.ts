import { Tables } from './supabase-type';

export type BookingDataType = Tables<'bookings'>;

export interface fetchBookingDataType extends Tables<'bookings'> {
  rooms: {
    room_name: string;
    hotel_id: string;
  };
  hotels: {
    name: string;
    address: string;
    check_in: string;
    check_out: string;
  };
}

export interface PostBookingDataType {
  created_at: string;
  user_id: string;
  check_in_date: string;
  check_out_date: string;
  hotel_id: string;
  request: string[] | null;
  room_id: string;
  status: string;
  total_amount: number;
  user_first_name: string;
  user_last_name: string;
}