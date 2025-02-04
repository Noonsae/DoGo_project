'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import useAuthStore from '@/store/useAuth';
import useUserQuery from '@/hooks/user/useUserData';

import Sidebar from './_components/Sidebar';
import GuestInfo from './_components/GuestInfo';
import ContactInfo from './_components/ContactInfo';
import Requests from './_components/Requests';
import AgreementAndPayment from './_components/AgreementAndPayment ';

import { countryCodes } from '@/constants/constant';

const Booking = () => {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0].code);

  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const roomPrice = priceParam ? parseInt(priceParam, 10) : 0;

  const { user } = useAuthStore();
  const userId: string | null = user?.id ?? null;
  const { data: userData } = useUserQuery(userId);

  const safeUserData = userData || { email: null, phone_number: null };

  return (
    // wrap
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />

      {/* inner */}
      <div className="max-w-[1000px] space-y-6 flex-1 container mx-auto px-4 py-28 pb-32">
        <section className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
          <p className="text-lg font-semibold">체크인 정보</p>
          <p className="text-neutral-600">예약하시려는 고객님의 정보를 입력해 주세요.</p>
        </section>

        <GuestInfo />

        <ContactInfo userData={safeUserData} selectedCode={selectedCode} setSelectedCode={setSelectedCode} />

        <Requests />

        <AgreementAndPayment roomPrice={roomPrice} />
      </div>
    </div>
  );
};

export default Booking;
