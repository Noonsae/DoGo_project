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

import { useBookingStore } from '@/store/useBookingStore';

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

  const storedBookingData = useBookingStore((state) => state.temporaryBookingData);

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

  const bookingData: PostBookingDataType = {
    check_in_date: checkIn, // 체크인 날짜 + 해당 요일
    check_out_date: checkOut, // 체크아웃 날짜 + 해당 요일
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

  console.log('storedBookingData:', storedBookingData);
  console.log('bookingData:', bookingData);

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
    <div className="w-full max-w-[1300px] px-[50px] mx-auto py-[60px] flex flex-row gap-[30px]">
      <Sidebar roomData={roomData} />

      {/* inner */}
      <div className="w-full flex flex-col mt-[60px] items-center justify-center">
        {/* 체크인 정보 */}
        <section className="w-full px-9 py-4 mb-8 bg-white rounded-[12px] border border-[#E2E2E2]">
          <div className="py-4 border-b border-[#E2E2E2]">
            <p className="text-[20px] text-[#232527] font-semibold mb-2">체크인 정보</p>
            <p className="text-[16px] leading-[1.45] font-normal text-neutral-600">
              예약하시려는 고객님의 정보를 입력해 주세요.
            </p>
          </div>

          <div className="w-full py-4">
            <p className="text-[20px] text-[#232527] font-semibold mb-1">{`투숙객 정보 (필수)`}</p>
            <p className="text-neutral-600 mb-4">{`(자동완성기능을 사용할 경우 정확한 정보 확인이 어렵습니다.)`}</p>
            <div className="flex flex-row items-center justify-between gap-5">
              <div className="w-full">
                <p className="mb-2 text-[16px] text-[#444]">
                  영문 이름
                  <span className="ml-1 text-[#FF5B45] text-[14px] leading-[1.45]">*</span>
                </p>
                <input
                  className="w-full px-4 py-3 border border-[#BFBFBF] rounded-[8px]"
                  placeholder="영문으로 작성해주세요"
                  value={firstName}
                  onChange={(e) => handleEnglishInput(e.target.value, setFirstName)}
                />
              </div>

              <div className="w-full">
                <p className="mb-2 text-[16px] text-[#444]">
                  영문 성<span className="ml-1 text-[#FF5B45] text-[14px] leading-[1.45]">*</span>
                </p>
                <input
                  className="w-full px-4 py-3 border border-[#BFBFBF] rounded-[8px]"
                  placeholder="영문으로 작성해주세요"
                  value={lastName}
                  onChange={(e) => handleEnglishInput(e.target.value, setLastName)}
                />
              </div>
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
