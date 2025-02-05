import { useQuery } from '@tanstack/react-query';

import fetchBookingData from '@/utils/fetchBookingData';
import { fetchBookingDataType } from '@/types/supabase/booking-type';

const useFetchBookingData = (bookingId: string | null) => {
  return useQuery<fetchBookingDataType | null>({
    queryKey: ['bookings', bookingId],
    queryFn: async () => {
      console.log(bookingId);

      if (!bookingId) throw new Error('Booking ID가 없습니다.');
      return await fetchBookingData(bookingId);
    },
    enabled: Boolean(bookingId),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시 유지
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};

export default useFetchBookingData;
