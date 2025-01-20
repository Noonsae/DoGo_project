import { create } from 'zustand';

import { SearchState } from '@/types/zustand/search-state-type';

const useSearchStore = create<SearchState>((set) => ({
  location: '',
  checkIn: '',
  checkOut: '',
  details: '',
  schedule: '',
  setLocation: (location) => set({ location }),
  setCheckIn: (checkIn) => set({ checkIn }),
  setCheckOut: (checkOut) => set({ checkOut }),
  setDetails: (details) => set({ details }),
  setSchedule: (schedule) => set({ schedule })
}));

export default useSearchStore;