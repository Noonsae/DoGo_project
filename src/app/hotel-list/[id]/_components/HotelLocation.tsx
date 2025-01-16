import React, { useEffect, useState } from 'react';
import { HotelType } from '@/types/supabase/hotel-type';
import KakaoTest from '@/hooks/map/kakaomap';

interface HotelLocationProps {
  id: string;
}

const HotelLocation = ({ id: hotelId }: HotelLocationProps) => {
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`/api/hotel/${hotelId}`);
        const data = await response.json();
        console.log('Hotel data:', data);
        setHotel(data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
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
      </section>
    </div>
  );
};

export default HotelLocation;
