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

import Swal from 'sweetalert2';

import { getDayOfWeek } from '@/utils/calculator/dateCalculator';
import { getBookingData } from '@/utils/booking/booking';

const Booking = () => {
  // 국가코드
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);

  // 영문이름 필드 상태 관리
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // 추가 요청 사항 상태 관리
  const [request, setRequest] = useState<string[]>([]);

  // url에 저장된 데이터 사용
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room_id'); // 해당 페이지에 객실 ID
  const priceParam = searchParams.get('price'); // 객실의 1박 기준 가격 정보
  const room_count = searchParams.get('room'); // 객실 예약 예정 개수

  const storedBookingData = getBookingData();

  const checkIn = storedBookingData!.checkIn;
  const checkOut = storedBookingData!.checkOut;
  const stay = storedBookingData!.stay;

  const total_amount = priceParam ? parseInt(priceParam, 10) * Number(stay) * Number(room_count) : 0;

  // 유저에 대한 정보를 요청
  const { user } = useAuthStore();
  const userId: string | null = user?.id ?? null;
  const { data: userData } = useUserQuery(userId);
  const safeUserData = userData || { user_name: null, email: null, phone_number: null };

  // roomId와 일치하는 정보를 요청
  const { data: roomData } = useRoomQuery(roomId) as { data: BookingRoomData | undefined };

  // 날짜에 맞는 요일 계산
  const checkInDayOfWeek = getDayOfWeek(checkIn);
  const checkOutDayOfWeek = getDayOfWeek(checkOut);

  const bookingData: PostBookingDataType = {
    check_in_date: `${checkIn} ${checkInDayOfWeek}`, // 체크인 날짜 + 해당 요일
    check_out_date: `${checkOut} ${checkOutDayOfWeek}`, // 체크아웃 날짜 + 해당 요일
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

  // 유효성 검사
  useEffect(() => {
    const isValid = firstName.trim() !== '' && lastName.trim() !== '';
    setIsFormValid(isValid);
  }, [firstName, lastName]);

  // 영문이름 작성란 onChange 함수
  const handleEnglishInput = (value: string, setValue: (newValue: string) => void) => {
    // 1. 영어로만 구성되어 있는지 확인
    if (/^[a-zA-Z]*$/.test(value)) {
      // 첫 문자만 대문자로 변환
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      setValue(formattedValue);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '영문으로만 입력해주세요.',
        confirmButtonColor: '#B3916A',
        confirmButtonText: '확인'
      });
    }
  };

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
          <p className="text-lg font-semibold">{`투숙객 정보 (필수)`}</p>
          <p className="text-neutral-600 mb-2">자동완성기능을 사용할 경우 정확한 정보 확인이 어렵습니다.</p>
          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-col justify-center">
              <p className="w-[400px]">영문 이름</p>
              <input
                className="border p-3 mt-2 rounded-md"
                placeholder="영문으로 작성해주세요"
                value={firstName}
                onChange={(e) => handleEnglishInput(e.target.value, setFirstName)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="flex flex-col justify-end w-[400px]">영문 성</p>
              <input
                className="border p-3 mt-2 rounded-md"
                placeholder="영문으로 작성해주세요"
                value={lastName}
                onChange={(e) => handleEnglishInput(e.target.value, setLastName)}
              />
            </div>
          </div>
        </section>

        <ContactInfo userData={safeUserData} selectedCode={selectedCode} setSelectedCode={setSelectedCode} />

        <Requests request={request} setRequest={setRequest} />

        {/* TossPaymentsButton 활성화 조건 전달 */}
        <AgreementAndPayment isFormValid={isFormValid} bookingData={bookingData} />
      </div>
    </div>
  );
};

export default Booking;
