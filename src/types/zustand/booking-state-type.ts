export type TemporaryBookingData = {
  checkIn: string; // 체크인정보
  checkOut: string; // 체크아웃
  stay: number | null; // 투숙 기간
  month: number | null; // 예약 월
}

export type BookingStoreType = {
  temporaryBookingData: TemporaryBookingData | null;
  setBookingData: (data: TemporaryBookingData) => void;
  clearBookingData: () => void;
}