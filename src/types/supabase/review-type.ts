import { Tables } from './supabase-type';

export type ReviewType = Tables<'reviews'> & {
  users?: {
    nickname: string;
    profile_img: string;
  };
  rooms?: {
    room_type: string;
  };
};
