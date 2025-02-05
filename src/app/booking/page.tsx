'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import useAuthStore from '@/store/useAuth';
import useUserQuery from '@/hooks/user/useUserData';
import useRoomQuery from '@/hooks/room/useRoomsData';

import Sidebar from './_components/Sidebar';
import ContactInfo from './_components/ContactInfo';
import Requests from './_components/Requests';
import AgreementAndPayment from './_components/AgreementAndPayment ';

import { countryCodes } from '@/constants/constant';

import { BookingRoomData } from '@/types/hotel/hotel-room-type';
import { PostBookingDataType } from '@/types/supabase/booking-type';

const Booking = () => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);

  // Input 필드 상태 관리
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const [request, setRequest] = useState([]);

  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const stay = searchParams.get('stay');
  const room_count = searchParams.get('room');

  const total_amount = priceParam ? parseInt(priceParam, 10) * Number(stay) * Number(room_count) : 0;

  const { user } = useAuthStore();
  const userId: string | null = user?.id ?? null;
  const { data: userData } = useUserQuery(userId);
  const safeUserData = userData || { user_name: null, email: null, phone_number: null };

  const roomId = searchParams.get('room_id');
  const { data: roomData } = useRoomQuery(roomId) as { data: BookingRoomData | undefined };

  console.log(roomData);

  // ToDo 숙박기간을 통해 check_In_Date와 check_Out_Date를 계산하는 함수 필요
  const [checkInDate, checkOutDate] = ['2025-02-06', '2025-02-07'];

  // 02.06 + 2박3일 = 02.08

  // 유효성 검사
  useEffect(() => {
    const isValid = firstName.trim() !== '' && lastName.trim() !== '';
    setIsFormValid(isValid);
  }, [firstName, lastName]);

  const bookingData: PostBookingDataType = {
    check_in_date: checkInDate, // 체크인 날짜
    check_out_date: checkOutDate, // 체크아웃 날짜
    created_at: new Date().toISOString(), // 생성 시간 (현재 시간)
    request: request, // 요청 사항
    room_id: roomId || '', // 객실 ID
    hotel_id: roomData?.hotels?.id ?? '',
    status: 'confirmed', // 예약 상태
    total_amount: total_amount, // 총 금액
    user_first_name: firstName || 'Unknown', // 사용자 이름
    user_last_name: lastName || 'Unknown', // 사용자 성
    user_id: userId || 'unknown' // 사용자 ID
  };

  const today = new Date();

  const year = today.getFullYear(); // 연도 (예: 2025)
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 +1, 예: 2)
  const day = today.getDate(); // 일 (예: 5)

  console.log(`${year}-${month}-${day}`); // 2025-2-5

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar roomData={roomData} />

      {/* inner */}
      <div className="max-w-[1000px] space-y-6 flex-1 container mx-auto px-4 py-28 pb-32">
        <section className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
          <p className="text-lg font-semibold">체크인 정보</p>
          <p className="text-neutral-600">예약하시려는 고객님의 정보를 입력해 주세요.</p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
          <p className="text-lg font-semibold">투숙객 정보</p>
          <p className="text-neutral-600 mb-2">자동완성기능을 사용할 경우 정확한 정보 확인이 어렵습니다.</p>
          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-col justify-center">
              <p className="w-[400px]">영문 이름</p>
              <input
                className="border p-3 mt-2 rounded-md"
                placeholder="영문으로 작성해주세요"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="flex flex-col justify-end w-[400px]">영문 성</p>
              <input
                className="border p-3 mt-2 rounded-md"
                placeholder="영문으로 작성해주세요"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </section>

        <ContactInfo userData={safeUserData} selectedCode={selectedCode} setSelectedCode={setSelectedCode} />

        <Requests />

        {/* TossPaymentsButton 활성화 조건 전달 */}
        <AgreementAndPayment isFormValid={isFormValid} bookingData={bookingData} />
      </div>
    </div>
  );
};

export default Booking;
