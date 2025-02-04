import { useSearchParams } from 'next/navigation';
import useRoomQuery from '@/hooks/room/useRoomsData';
import { BookingRoomData } from '@/types/hotel/hotel-room-type';

const Sidebar = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room_id');
  const stay = searchParams.get('stay');
  const room_count = searchParams.get('room')

  const { data: roomData } = useRoomQuery(roomId) as { data: BookingRoomData | undefined };

  return (
    <aside className="ml-auto w-[278px] h-[682px] bg-white p-10 shadow-md rounded-lg mt-[50px] border border-gray-300">
      <p className="text-lg font-bold mb-4 border-b">호텔 이름: {roomData?.hotels?.name || 'Loading...'}</p>
      <p>체크인 : {roomData?.hotels?.check_in || '정보 없음'}</p>
      <p>체크아웃 : {roomData?.hotels?.check_out || '정보 없음'}</p>

      <div className="flex flex-row items-center">
        {roomData && Array.isArray(roomData.room_img_url) && roomData.room_img_url.length > 0 ? (
          <img
            src={roomData.room_img_url[0]}
            width={100}
            height={70}
            alt="Room Image"
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <span className="text-gray-500 text-sm">사진 없음</span>
        )}
      </div>
      <p className="text-sm font-semibold p-5">{roomData?.room_name || 'Loading...'}</p>

      <div className="mt-6 p-4 border-t">
        <p className="text-gray-700">가격 상세정보</p>
        <p className="font-semibold text-lg">객실 {room_count}개 x {stay}박</p>
        <p className="text-gray-700 mt-2"> 총 결제 금액</p>
        <p className="font-semibold text-lg">{roomData ? `${roomData.price.toLocaleString()}원` : 'Loading...'}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
