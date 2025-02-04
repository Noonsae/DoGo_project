'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { countryCodes } from '@/constants/constant';

import Sidebar from './_components/Sidebar';

import useAuthStore from '@/store/useAuth';
import useUserQuery from '@/hooks/user/useUserData';
import CheckInInfo from './_components/CheckInInfo';
import GuestInfo from './_components/GuestInfo';
import ContactInfo from './_components/ContactInfo';
import Requests from './_components/Requests';
import AgreementAndPayment from './_components/AgreementAndPayment ';

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
    <div className="flex flex-col lg:flex-row min-h-screen">

      <Sidebar />      
      <div className="flex-1 container mx-auto px-4 py-28 pb-32">
        <div className="max-w-3xl mx-auto space-y-6">
          <CheckInInfo />
          <GuestInfo />
          <ContactInfo userData={safeUserData} selectedCode={selectedCode} setSelectedCode={setSelectedCode} />
          <Requests />
          <AgreementAndPayment roomPrice={roomPrice} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
