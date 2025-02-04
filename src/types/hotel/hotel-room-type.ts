import { HotelType } from '../supabase/hotel-type';
import { RoomType } from '../supabase/room-type';

export type HotelRoomProps = {
  roomsData: RoomType[];
  getValidImageUrl: (roomImgUrls: RoomType['room_img_url']) => string;
  roomOption: React.ReactNode;
  hotelData: HotelType;
};

export interface BookingRoomData {
  room_name: string;
  hotels?: {
    name?: string;
    check_in?: string;
    check_out?: string;
  };
  room_img_url?: string[];
  room_count?: number;
  price?: number; // 가격 속성 추가
}