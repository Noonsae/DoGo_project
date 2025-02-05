export interface SearchState {
  location: string;
  label: string;
  checkIn: string;
  checkOut: string;
  details: string;
  stay: string;
  month: string;
  stars?: number[];
  minPrice: number;
  maxPrice: number;
  facilities: string[];
  services: string[];
  beds?: string[];
  setLocation: (location: string) => void;
  setLabel: (label: string) => void;
  setCheckIn: (checkIn: string) => void;
  setCheckOut: (checkOut: string) => void;
  setStay: (stay: string) => void;
  setMonth: (month: string) => void;
  setDetails: (details: string) => void;
  setStars: (stars?: number[]) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setFacilities: (facilities: string[]) => void;
  setServices: (services: string[]) => void;
  setBeds: (beds: string[]) => void;
}
