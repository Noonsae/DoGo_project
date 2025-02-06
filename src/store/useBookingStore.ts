import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BookingStoreType } from '@/types/zustand/booking-state-type';

// Zustand 스토어 생성
export const useBookingStore = create<BookingStoreType>()(
  persist(
    (set) => ({
      temporaryBookingData: {
        checkIn: '', // 기본값 설정
        checkOut: '',
        stay: 0,
        month: 0
      },
      setBookingData: (data) => set({ temporaryBookingData: data }),
      clearBookingData: () =>
        set({
          temporaryBookingData: {
            checkIn: '',
            checkOut: '',
            stay: 0,
            month: 0
          }
        })
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);