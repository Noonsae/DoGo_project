export interface SearchState {
  location: string;
  label: string;
  checkIn: string;
  checkOut: string;
  details: string;
  stay: number | null;
  month: number | null;
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
  setStay: (stay: number | null) => void;
  setMonth: (month: number | null) => void;
  setDetails: (details: string) => void;
  setStars: (stars?: number[]) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setFacilities: (facilities: string[]) => void;
  setServices: (services: string[]) => void;
  setBeds: (beds: string[]) => void;
}
