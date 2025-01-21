export interface SearchState {
  location: string;
  checkIn: string;
  checkOut: string;
  details: string;
  stay: string;
  month: string;
  stars: string;
  prices: string;
  facilities: string;
  services: string;
  setLocation: (location: string) => void;
  setCheckIn: (checkIn: string) => void;
  setCheckOut: (checkOut: string) => void;
  setStay: (stay: string) => void;
  setMonth: (month: string) => void;
  setDetails: (details: string) => void;
  setStars: (stars: string) => void;
  setPrices: (prices: string) => void;
  setFacilities: (facilities: string) => void;
  setServices: (services: string) => void;
}