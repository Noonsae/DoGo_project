import { browserSupabase } from '@/supabase/supabase-client';
  
import { fetchBookingDataType } from '@/types/supabase/booking-type';

const fetchBookingData = async (bookingId: string): Promise<fetchBookingDataType | null> => {
  const supabase = browserSupabase();

  const { data, error } = await supabase
    .from('bookings')
    .select(
      `
      *,
      rooms (
        hotel_id,
        id,
        room_name
      ),
      hotels (
        id,
        name,
        address,
        check_in,
        check_out
      )
    `
    )
    .eq('id', bookingId)
    .single();

  if (error) {
    console.error('Error fetching booking data:', error.message);
    return null;
  }

  return data;
};

export default fetchBookingData;
