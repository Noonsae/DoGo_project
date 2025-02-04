import { HotelType } from '../supabase/hotel-type';
import { RoomType } from '../supabase/room-type';

export type HotelRoomProps = {
  roomsData: RoomType[];
  getValidImageUrl: (roomImgUrls: RoomType['room_img_url']) => string;
  roomOption: React.ReactNode;
  hotelData: HotelType;
};

export interface BookingRoomData {
  room_img_url: string[]; // room_img_url이 문자열 배열임을 명시
  room_name: string;
  price: number;
  hotels: {
    id: string;
    name: string;
    check_in: string;
    check_out: string;
  };
}
