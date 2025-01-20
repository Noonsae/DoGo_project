import { create } from 'zustand';

import { SearchState } from '@/types/zustand/search-state-type';

const useSearchStore = create<SearchState>((set) => ({
  location: '',
  checkIn: '',
  checkOut: '',
  schedule: '',
  details: '',
  setLocation: (location) => set({ location }),
  setCheckIn: (checkIn) => set({ checkIn }),
  setCheckOut: (checkOut) => set({ checkOut }),
  setSchedule: (schedule) => set({ schedule }),
  setDetails: (details) => set({ details }),
}));

export default useSearchStore;