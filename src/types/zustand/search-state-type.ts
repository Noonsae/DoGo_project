export interface SearchState {
  location: string;
  checkIn: string;
  checkOut: string;
  details: string;
  setLocation: (location: string) => void;
  setCheckIn: (checkIn: string) => void;
  setCheckOut: (checkOut: string) => void;
  setDetails: (details: string) => void;
}