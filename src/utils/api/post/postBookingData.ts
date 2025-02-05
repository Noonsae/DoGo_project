import { browserSupabase } from '@/supabase/supabase-client';
import { BookingDataType, PostBookingDataType } from '@/types/supabase/booking-type';

/**
 * `bookings` 테이블에 데이터 삽입
 * @param bookingData 삽입할 데이터 객체
 * @returns 삽입 결과 또는 에러
 */
export const postBookingData = async (bookingData: PostBookingDataType): Promise<BookingDataType[] | null> => {
  const supabase = browserSupabase();
  console.log({ bookingData });
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData]) // 배열 형태로 전달
      .select(); // 삽입 후 데이터 반환

    console.log({ data, error });

    if (error) {
      console.error('Error inserting booking:', error.message);
      return null;
    }
    return data; // 삽입된 데이터 반환
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
};
