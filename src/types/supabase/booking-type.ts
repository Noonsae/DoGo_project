import { Tables } from './supabase-type';

export type BookingDataType = Tables<'bookings'>;

export type PostBookingDataType = Omit<BookingDataType, 'id'>;

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
