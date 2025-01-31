import { supabase } from '@/supabase/supabase';
import { browserSupabase } from '@/supabase/supabase-client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HotelType {
  name: string;
  check_in: string;
  check_out: string;
}
interface RoomType {
  room_name: string;
  price: number;
  room_img_url: string | null;
}
const Sidebar = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('hotel_id');
  const roomId = searchParams.get('room_id');
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [room, setRoom] = useState<RoomType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const supabase = browserSupabase();
      console.log('🔍 hotel_id:', hotelId);
      console.log('🔍 room_id:', roomId);
      if (!hotelId || !roomId) return;

      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('name, check_in, check_out')
        .eq('id', hotelId)
        .single();
      if (hotelError) {
        console.log('hotelData', hotelData); //null
        console.error('호텔정보를 불러오는 중 오류 발생!', hotelError.message);
      } else {
        setHotel(hotelData);
      }

      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('room_name, price, room_img_url')
        .eq('id', roomId)
        .single();

      if (roomError) {
        console.error('객실정보를 불러오는 중 오류 발생', roomError.message);
      } else {
        console.log('✅ 불러온 객실 정보:', roomData);
        console.log('📷 이미지 URL:', roomData.room_img_url);
        setRoom(roomData);
      }
    };
    fetchData();
  }, [hotelId, roomId]);
  return (
    //   커밋용 주석
    <aside className="ml-auto w-[278px] h-[682px] bg-white p-10 shadow-md rounded-lg mt-[50px] border border-gray-300 ">
      <p className="text-lg font-bold mb-4 border-b">호텔 이름: {hotel ? hotel.name : 'Loading...'}</p>
      <p>체크인 : {hotel?.check_in || '정보 없음'} </p>
      <p>체크아웃 : {hotel?.check_out || '정보없음'}</p>
      <div className="flex flex-row items-center ">
        <div className="w-[100px] h-[70px] bg-gray-300 mt-[20px] rounded-md mb-4"></div>
        {room?.room_img_url ? (
          <img
            src={room.room_img_url[0]}
            width={100}
            height={70}
            alt="Room Image"
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <span className="text-gray-500 text-sm">사진 없음</span>
        )}
      </div>
      <p className="text-sm font-semibold p-5">{room ? room.room_name : 'Loading...'}</p>

      <div className="mt-6 p-4 border-t">
        <p className="text-gray-700">가격 상세정보</p>
        <p className="font-semibold text-lg">객실 1개 x 1박</p>
        <p className="text-gray-700 mt-2"> 총 결제 금액</p>
        <p className="font-semibold text-lg">{room ? `${room.price.toLocaleString()}원` : 'Loading...'}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
