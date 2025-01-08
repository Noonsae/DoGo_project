import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

interface BookingsContentProps {
  userId: string;
}

const BookingsContent: React.FC<BookingsContentProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

const supabase = browserSupabase();

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(
          `
        id,
        created_at,
        room_id,
        check_in_date,
        check_out_date,
        status,
        rooms (
          name,
          price
        )
      `
        )
        .eq('user_id', userId);

      if (error) console.error(error);
      setBookings(data || []);
      setLoading(false);
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!bookings.length) return <p>예약이 없습니다.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">예약 목록</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="p-4 border rounded shadow">
            <h3 className="font-bold">{booking.rooms.name}</h3>
            <p>체크인: {booking.check_in_date}</p>
            <p>체크아웃: {booking.check_out_date}</p>
            <p className="text-right font-bold">{booking.rooms.price}원/박</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsContent;
