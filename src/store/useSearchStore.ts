import { create } from 'zustand';

import { SearchState } from '@/types/zustand/search-state-type';

const useSearchStore = create<SearchState>((set) => ({
  location: '',
  hotelName: '',
  checkIn: '',
  checkOut: '',
  stay: '',
  month: '',
  details: '',
  stars: '',
  prices: '',
  facilities: '',
  services: '',
  setLocation: (location) => set({ location }),
  setHotelName: (hotelName) => set({ hotelName }),
  setCheckIn: (checkIn) => set({ checkIn }),
  setCheckOut: (checkOut) => set({ checkOut }),
  setStay: (stay) => set({ stay }),
  setMonth: (month) => set({ month }),
  setDetails: (details) => set({ details }),
  setStars: (stars) => set({ stars }),
  setPrices: (prices) => set({ prices }),
  setFacilities: (facilities) => set({ facilities }),
  setServices: (services) => set({ services })
}));

export default useSearchStore;