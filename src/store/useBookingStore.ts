import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BookingStoreType, TemporaryBookingData } from '@/types/zustand/booking-state-type';

// Zustand 스토어 생성
export const useBookingStore = create<BookingStoreType>()(
  persist(
    (set) => ({
      temporaryBookingData: null, // 초기 예약 데이터는 null
      setBookingData: (data: TemporaryBookingData) => set({ temporaryBookingData: data }), // 데이터 저장 함수
      clearBookingData: () => set({ temporaryBookingData: null }) // 데이터 초기화 함수
    }),
    {
      name: 'booking-storage', // 로컬스토리지 키 이름
      storage: createJSONStorage(() => localStorage) // 로컬스토리지 사용
    }
  )
);