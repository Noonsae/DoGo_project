import KakaoTest from '@/hooks/map/kakaomap';

import { useEffect, useState } from 'react';
import { HotelType } from '@/types/supabase/hotel-type';
import { HotelLocationProps } from '@/types/hotel/hotel-location.type';

import CopyAddressIcon from '@/components/ui/icon/CopyAddressIcon';
import SubwayIcon from '@/components/ui/icon/SubwayIcon';
import RunningIcon from '@/components/ui/icon/RunningIcon';

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
        <p className="flex gap-1 mt-1">{SubwayIcon()}아오역 1번 출구 도보 60분</p>
        <p className="flex gap-1 mt-1">{RunningIcon()}대전아오백화점 도보 4시간</p>
      </section>
    </div>
  );
};

export default HotelLocation;
