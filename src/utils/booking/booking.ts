import { useBookingStore } from '@/store/useBookingStore';
import { TemporaryBookingData } from '@/types/zustand/booking-state-type';

/**
 * 예약 데이터를 저장하는 함수
 * @param data 예약 데이터
 */
export const saveBookingData = (data: TemporaryBookingData) => {
  const setBookingData = useBookingStore.getState().setBookingData;
  setBookingData(data);
};

/**
 * 예약 데이터를 가져오는 함수
 * @returns 저장된 예약 데이터
 */
export const getBookingData = (): TemporaryBookingData | null => {
  const bookingData = useBookingStore.getState().temporaryBookingData;
  return bookingData;
};

/**
 * 예약 데이터를 초기화하는 함수
 */
export const clearBookingData = () => {
  const clearData = useBookingStore.getState().clearBookingData;
  clearData();
};
