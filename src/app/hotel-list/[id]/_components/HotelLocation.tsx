import KakaoTest from '@/hooks/map/kakaomap';

import { useEffect, useState } from 'react';
import { HotelType } from '@/types/supabase/hotel-type';
import { HotelLocationProps } from '@/types/hotel/hotel-location.type';

const CopyAddressIcon = () => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.5008 5.89082H20.7195C20.8742 5.89082 21.0008 5.76426 21.0008 5.60957C21.0008 5.2252 20.8273 4.85957 20.532 4.61113L16.918 1.60176C16.6883 1.40957 16.2523 1.25488 15.9523 1.25488C15.7602 1.25488 15.6055 1.40957 15.6055 1.60176V5.0002C15.6102 5.49238 16.0086 5.89082 16.5008 5.89082Z"
        fill="#B3916A"
      />
      <path
        d="M14.3906 5V1.25H8.25C7.425 1.25 6.75 1.925 6.75 2.75V18.5C6.75 19.325 7.425 20 8.25 20H19.5C20.325 20 21 19.325 21 18.5V7.10938H16.5C15.3375 7.10938 14.3906 6.1625 14.3906 5Z"
        fill="#B3916A"
      />
      <path
        d="M5.4375 19.8125V4.25H4.5C3.675 4.25 3 4.925 3 5.75V22.25C3 23.075 3.675 23.75 4.5 23.75H16.5C17.325 23.75 18 23.075 18 22.25V21.3125H6.9375C6.1125 21.3125 5.4375 20.6375 5.4375 19.8125Z"
        fill="#B3916A"
      />
    </svg>
  );
};

const subwayIcon = () => {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0.25C4.60013 0.25 0.75 0.750062 0.75 4.25003V14.25C0.75 16.2002 2.29978 17.7499 4.25002 17.7499L3 19V19.75H15V19L13.75 17.7499C15.7002 17.7499 17.25 16.2002 17.25 14.25V4.25003C17.25 0.750062 13.3999 0.25 9 0.25ZM4.5 16C3.64987 16 3 15.3501 3 14.5C3 13.6498 3.64987 13 4.5 13C5.35012 13 6 13.6498 6 14.5C6 15.3501 5.35012 16 4.5 16ZM8.25 9.25H3V4.75H8.25V9.25ZM13.5 16C12.6499 16 12 15.3501 12 14.5C12 13.6498 12.6499 13 13.5 13C14.3501 13 15 13.6498 15 14.5C15 15.3501 14.3501 16 13.5 16ZM15 9.25H9.75V4.75H15V9.25Z"
        fill="#A0A0A0"
      />
    </svg>
  );
};

const runningIcon = () => {
  return (
    <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4901 4.48047C12.5901 4.48047 13.4901 3.58047 13.4901 2.48047C13.4901 1.38047 12.5901 0.480469 11.4901 0.480469C10.3901 0.480469 9.49014 1.38047 9.49014 2.48047C9.49014 3.58047 10.3901 4.48047 11.4901 4.48047ZM7.89014 18.3805L8.89014 13.9805L10.9901 15.9805V21.9805H12.9901V14.4805L10.8901 12.4805L11.4901 9.48047C12.7901 10.9805 14.7901 11.9805 16.9901 11.9805V9.98047C15.0901 9.98047 13.4901 8.98047 12.6901 7.58047L11.6901 5.98047C11.2901 5.38047 10.6901 4.98047 9.99014 4.98047C9.69014 4.98047 9.49014 5.08047 9.19014 5.08047L3.99014 7.28047V11.9805H5.99014V8.58047L7.79014 7.88047L6.19014 15.9805L1.29014 14.9805L0.890137 16.9805L7.89014 18.3805Z"
        fill="#A0A0A0"
      />
    </svg>
  );
};

const HotelLocation = ({ id: hotelId }: HotelLocationProps) => {
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`/api/hotel/${hotelId}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) return <div>Loading...</div>;
  if (!hotel || !hotel.address) return <div>호텔 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <section id="location" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">위치</h2>
        <KakaoTest address={hotel.address} />
        <p className="flex  gap-1 mt-1">
          {hotel.address}
          {CopyAddressIcon()}
          주소복사
        </p>
        <p className="flex gap-1 mt-1">{subwayIcon()}아오역 1번 출구 도보 60분</p>
        <p className="flex gap-1 mt-1">{runningIcon()}대전아오백화점 도보 4시간</p>
      </section>
    </div>
  );
};

export default HotelLocation;
