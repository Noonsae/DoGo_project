import { create } from 'zustand';

import { SearchState } from '@/types/zustand/search-state-type';
import { addDays, getDateDifference, getMonthFromDate } from '@/utils/calculator/dateCalculator';
import { currentYear, getRandomDateAfterToday } from '@/utils/calculator/randomStayDatesCalculator';

const useSearchStore = create<SearchState>((set) => ({
  location: '',
  label: '',
  checkIn: '',
  checkOut: '',
  stay: null,
  month: null,
  details: '',
  stars: [],
  minPrice: 0,
  maxPrice: 2000000,
  facilities: [],
  services: [],
  beds: [],
  setLocation: (location) => set({ location }),
  setLabel: (label) => set({ label }),

  setCheckIn: (checkIn: string) =>
    set((state) => {
      const checkOut = state.checkOut;

      // stay와 month 계산
      let stay = null;
      let month = null;
      if (checkOut) {
        stay = getDateDifference(checkIn, checkOut); // 숙박 기간 계산
        month = getMonthFromDate(checkIn); // 월 계산
      }

      return {
        checkIn,
        stay,
        month
      };
    }),

  setCheckOut: (checkOut: string) =>
    set((state) => {
      const checkIn = state.checkIn;

      // stay와 month 계산
      let stay = null;
      if (checkIn) {
        stay = getDateDifference(checkIn, checkOut); // 숙박 기간 계산
      }

      return {
        checkOut,
        stay
      };
    }),

  setStay: (stay) => {
    set((state) => {
      // stay와 month가 모두 설정되었을 때 랜덤 날짜 생성
      if (stay && state.month) {
        const randomCheckInDate = getRandomDateAfterToday(currentYear, state.month); // 랜덤 체크인
        const randomCheckOutDate = addDays(randomCheckInDate, stay); // 랜덤 체크아웃
        return {
          stay,
          checkIn: randomCheckInDate,
          checkOut: randomCheckOutDate
        };
      }
      return { stay }; // 랜덤 날짜 생성 조건이 충족되지 않으면 stay만 업데이트
    });
  },

  setMonth: (month) => {
    set((state) => {
      // stay와 month가 모두 설정되었을 때 랜덤 날짜 생성
      if (month && state.stay) {
        const randomCheckInDate = getRandomDateAfterToday(currentYear, month); // 랜덤 체크인
        const randomCheckOutDate = addDays(randomCheckInDate, state.stay); // 랜덤 체크아웃
        return {
          month,
          checkIn: randomCheckInDate,
          checkOut: randomCheckOutDate
        };
      }
      return { month }; // 랜덤 날짜 생성 조건이 충족되지 않으면 month만 업데이트
    });
  },

  setDetails: (details) => set({ details }),
  setStars: (stars) => set({ stars }),
  setMinPrice: (minPrice: number) => set({ minPrice }),
  setMaxPrice: (maxPrice: number) => set({ maxPrice }),
  setFacilities: (facilities: string[]) => set({ facilities }),
  setServices: (services: string[]) => set({ services }),
  setBeds: (beds: string[]) => set({ beds })
}));

export default useSearchStore;
