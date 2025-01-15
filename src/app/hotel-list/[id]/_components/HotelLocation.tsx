import React, { useEffect, useState } from 'react';
import KakaoMap from '@/hooks/map/kakaomap';
import { HotelType } from '@/types/supabase/hotel-type';

interface HotelLocationProps {
  id: string; // URL에서 전달받은 hotelId
}

const HotelLocation = ({ id: hotelId }: HotelLocationProps) => {
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!hotelId) {
        // console.error('No hotelId provided');
        return;
      }

      // console.log(`Fetching hotel data for ID: ${hotelId}`);

      try {
        const response = await fetch(`/api/hotel/${hotelId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch hotel. Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log('Fetched hotel data:', data); // 응답 데이터 확인
        setHotel(data); // 단일 호텔 데이터 저장
      } catch (error) {
        console.error('Error fetching hotel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    // console.log('Hotel data is loading...');
    return <div>Loading...</div>;
  }

  if (!hotel) {
    // console.log('No hotel data found.');
    return <div>No hotel found</div>;
  }

  // console.log('Hotel data loaded successfully:', hotel);

  return (
    <div>
      <section id="location" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">위치</h2>
        <KakaoMap address={hotel.address} name={hotel.name} description={hotel.description} />
      </section>
    </div>
  );
};

export default HotelLocation;
