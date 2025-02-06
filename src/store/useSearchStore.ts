import { create } from 'zustand';

import { SearchState } from '@/types/zustand/search-state-type';
import { addDays, today_date } from '@/utils/calculator/dateCalculator';

const today = new Date();
const nextDayDate = addDays(today_date, 1); // 다음 날을 Date 객체로 계산
const nowMonth = today.getMonth() + 1; // 월 (0부터 시작하므로 +1, 예: 2)

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
  setCheckIn: (checkIn) => set({ checkIn }), // 값이 없을 때 todayDate를 기본값으로 설정
  setCheckOut: (checkOut) => set({ checkOut }), // 값이 없을 때 nextDayDate를 기본값으로 설정
  setStay: (stay) => set({ stay }),
  setMonth: (month) => set({ month }),
  setDetails: (details) => set({ details }),
  setStars: (stars) => set({ stars }),
  setMinPrice: (minPrice: number) => set({ minPrice }),
  setMaxPrice: (maxPrice: number) => set({ maxPrice }),
  setFacilities: (facilities: string[]) => set({ facilities }),
  setServices: (services: string[]) => set({ services }),
  setBeds: (beds: string[]) => set({ beds })
}));

export default useSearchStore;
