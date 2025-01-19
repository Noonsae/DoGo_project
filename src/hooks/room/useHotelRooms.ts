import { useState, useEffect } from 'react';
import { RoomType } from '@/types/supabase/room-type';

const useHotelRooms = (hotelId: string) => {
  const [roomsData, setRoomsData] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomsData = async () => {
      if (!hotelId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/rooms?hotelId=${hotelId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rooms data');
        }

        const data = await response.json();
        const sortedData = data.sort((a: RoomType, b: RoomType) => a.price - b.price);
        setRoomsData(sortedData);
      } catch (err: any) {
        setError(err.message || 'Unknown error occurred');
        console.error('Error fetching rooms data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomsData();
  }, [hotelId]);

  return { roomsData, loading, error };
};

export default useHotelRooms;
