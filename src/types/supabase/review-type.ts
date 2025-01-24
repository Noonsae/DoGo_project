import { Tables } from './supabase-type';

export type ReviewType = Tables<'reviews'> & {
  rating: 1 | 2 | 3 | 4 | 5;
  users?: {
    nickname: string;
    profile_img: string;
  };
  rooms?: {
    room_type: string;
  };
};
