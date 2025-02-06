import { useSearchParams } from 'next/navigation';

import { BookingRoomData } from '@/types/hotel/hotel-room-type';
import { useBookingStore } from '@/store/useBookingStore';
import HiBuildingOffice from '@/components/ui/icon/HiBuildingOffice';
import { getDayOfWeek } from '@/utils/calculator/dateCalculator';

interface SidebarProps {
  roomData?: BookingRoomData;
}

const Sidebar: React.FC<SidebarProps> = ({ roomData }) => {
  const searchParams = useSearchParams();
  const room_count = searchParams.get('room');

  const storedBookingData = useBookingStore((state) => state.temporaryBookingData);

  const stay = storedBookingData!.stay;
  const checkIn = storedBookingData!.checkIn;
  const checkOut = storedBookingData!.checkOut;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const formatter = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric' });
  const formattedCheckIn = formatter.format(checkInDate);
  const formattedCheckOut = formatter.format(checkOutDate);

  const checkInWeek = getDayOfWeek(checkIn);
  const checkOutWeek = getDayOfWeek(checkOut);

  console.log(formattedCheckIn);
  console.log(formattedCheckOut);
  console.log(checkInWeek);
  console.log(checkOutWeek);

  return (
    <aside className="w-[278px] h-[422px] bg-white px-4 rounded-[12px] mt-[60px] border border-[#e2e2e2]">
      {/* 호텔 정보 */}
      <div className="w-full py-5 flex flex-row items-center justify-start gap-2 border-b border-[#E2E2E2]">
        <HiBuildingOffice />
        <p className="text-[16px] text-[#444] font-semibold">{roomData?.hotels?.name || 'Loading...'}</p>
      </div>

      {/* 체크인 & 체크아웃 */}
      <div className="w-full py-5 flex flex-row items-center justify-between border-b border-[#E2E2E2]">
        <div className="text-center text-[#A0A0A0] text-sm leading-[1.45] mb-1">
          <p>체크인</p>
          <p>{`(${roomData?.hotels?.check_in || '정보 없음'} ~)`}</p>
          <p className="text-[#2C2C2C] text-[15px] font-medium">
            {formattedCheckIn}, {checkInWeek}
          </p>
        </div>
        <div>
          <p className="text-[#7C7C7C] text-base leading-[1.45] font-normal">{stay}박</p>
        </div>
        <div className="text-center text-[#A0A0A0] text-sm leading-[1.45] mb-1">
          <p>체크아웃</p>
          <p>{`(~ ${roomData?.hotels?.check_out || '정보 없음'})`}</p>
          <p className="text-[#2C2C2C] text-[15px] font-medium">
            {formattedCheckOut}, {checkOutWeek}
          </p>
        </div>
      </div>

      {/* 객실 정보 */}
      <div className="py-4 flex flex-row items-center justify-start gap-2 border-b border-[#E2E2E2]">
        {roomData && Array.isArray(roomData.room_img_url) && roomData.room_img_url.length > 0 ? (
          <img
            src={roomData.room_img_url[0]}
            width={100}
            height={70}
            alt="Room Image"
            className="object-cover w-[100px] h-[70px] rounded-lg"
          />
        ) : (
          <span className="text-gray-500 text-sm">사진 없음</span>
        )}
        <p className="text-[#232527] text-[18px] font-semibold">{roomData?.room_name || 'Loading...'}</p>
      </div>

      <div className="w-full py-5">
        <p className="mb-[21px] text-[#232527] text-[20px] font-semibold">가격 상세 정보</p>

        <div className="flex flex-row items-center justify-between">
          <p className="font-semibold text-[16px] text-[#A0A0A0]">
            객실 {room_count}개 x {stay}박
          </p>
          <p className="font-semibold text-lg">
            {roomData?.price !== undefined
              ? `${(roomData.price * Number(stay) * Number(room_count)).toLocaleString()}원`
              : '가격 정보 없음'}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between mt-[9px]">
          <p className="text-[#444] text-[16px] font-semibold"> 총 결제 금액</p>
          <p className="font-semibold text-[18px] text-[#B3916A]">
            {roomData?.price !== undefined
              ? `${(roomData.price * Number(stay) * Number(room_count)).toLocaleString()}원`
              : '가격 정보 없음'}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
