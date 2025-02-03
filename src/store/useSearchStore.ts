import { create } from 'zustand';

import { SearchState } from '@/types/zustand/search-state-type';

const useSearchStore = create<SearchState>((set) => ({
  location: '',
  label: '',
  checkIn: '',
  checkOut: '',
  stay: '',
  month: '',
  details: '',
  stars: [],
  minPrice: 0,
  maxPrice: 2000000,
  facilities: [],
  services: [],
  beds: [],
  setLocation: (location) => set({ location }),
  setLabel: (label) => set({ label }),
  setCheckIn: (checkIn) => set({ checkIn }),
  setCheckOut: (checkOut) => set({ checkOut }),
  setStay: (stay) => set({ stay }),
  setMonth: (month) => set({ month }),
  setDetails: (details) => set({ details }),
  setStars: (stars) => set({ stars }),
  setMinPrice: (minPrice: number) => set({ minPrice }),
  setMaxPrice: (maxPrice: number) => set({ maxPrice }),
  setFacilities: (facilities: string[]) => set({ facilities }),
  setServices: (services: string[]) => set({ services }),
  setBeds: (beds: string[]) => set({beds})
}));

export default useSearchStore;
