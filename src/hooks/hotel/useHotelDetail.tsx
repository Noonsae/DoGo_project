import { useEffect, useState } from 'react';

import { HotelType } from '@/types/supabase/hotel-type';

const useHotelDetail = (hotelId: string) => {
  const [hotelData, setHotelData] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/hotel/${hotelId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch hotel data. Status: ${response.status}`);
        }
        const data = await response.json();
        setHotelData({
          ...data,
          hotel_img_urls: Array.isArray(data.hotel_img_urls) ? data.hotel_img_urls : [],
          rooms: data.rooms || []
        });
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setHotelData(null);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchHotelData();
    }
  }, [hotelId]);
  return { hotelData, loading };
};

export default useHotelDetail;
