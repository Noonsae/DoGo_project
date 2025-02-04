'use client';

import { useState } from 'react';
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

const Booking = () => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);

  // Input 필드 상태 관리
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const roomPrice = priceParam ? parseInt(priceParam, 10) : 0;

  const { user } = useAuthStore();
  const userId: string | null = user?.id ?? null;
  const { data: userData } = useUserQuery(userId);
  const safeUserData = userData || { email: null, phone_number: null };

  const roomId = searchParams.get('room_id');
  const { data: roomData } = useRoomQuery(roomId) as { data: BookingRoomData | undefined };

  // 유효성 검사
  const validateForm = () => {
    const isValid = firstName.trim() !== '' && lastName.trim() !== '';
    setIsFormValid(isValid);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    validateForm(); // 변경될 때마다 유효성 검사
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    validateForm(); // 변경될 때마다 유효성 검사
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
          <p className="text-lg font-semibold">투숙객 정보</p>
          <p className="text-neutral-600 mb-2">자동완성기능을 사용할 경우 정확한 정보 확인이 어렵습니다.</p>
          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-col justify-center">
              <p className="w-[400px]">영문 이름</p>
              <input
                className="border p-3 mt-2 rounded-md"
                placeholder="영문으로 작성해주세요"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="flex flex-col justify-end w-[400px]">영문 성</p>
              <input
                className="border p-3 mt-2 rounded-md"
                placeholder="영문으로 작성해주세요"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
          </div>
        </section>

        <ContactInfo userData={safeUserData} selectedCode={selectedCode} setSelectedCode={setSelectedCode} />

        <Requests />

        {/* TossPaymentsButton 활성화 조건 전달 */}
        <AgreementAndPayment roomPrice={roomPrice} isFormValid={isFormValid} />
      </div>
    </div>
  );
};

export default Booking;
