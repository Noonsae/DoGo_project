import { HotelType } from '../supabase/hotel-type';
import { RoomType } from '../supabase/room-type';

export type HotelRoomProps = {
  roomsData: RoomType[];
  getValidImageUrl: (roomImgUrls: RoomType['room_img_url']) => string;
  roomOption: React.ReactNode;
  hotelData: HotelType;
};
