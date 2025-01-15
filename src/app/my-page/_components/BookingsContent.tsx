'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Booking 데이터 타입 정의
interface Booking {
  id: string;
  created_at: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  room_name: string; // 객실 이름
  price: number; // 객실 가격
}

// BookingsContentProps 인터페이스 정의
interface BookingsContentProps {
  userId: string;
}

const BookingsContent: React.FC<BookingsContentProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Supabase에서 예약 데이터와 객실 정보를 가져옴
        const { data, error } = await browserSupabase()
          .from('bookings')
          .select(`
            id,
            created_at,
            room_id,
            check_in_date,
            check_out_date,
            status,
            rooms (
              room_name,
              price
            )
          `)
          .eq('user_id', userId);

        if (error) throw error;

        // 데이터 형식 변환
        const formattedBookings = data?.map((booking) => ({
          id: booking.id,
          created_at: booking.created_at,
          room_id: booking.room_id,
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
          status: booking.status,
          room_name: booking.rooms?.room_name || 'N/A',
          price: booking.rooms?.price || 0,
        })) || [];

        setBookings(formattedBookings);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('예약 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  // 로딩 상태
  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;

  // 오류 상태
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 예약 데이터가 없는 경우
  if (!bookings.length)
    return <p className="text-center text-gray-600">등록된 예약이 없습니다.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">예약 목록</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="p-4 border rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{booking.room_name}</h3>
              <p className="text-sm text-gray-500">
                예약 상태: <span className="font-medium">{booking.status}</span>
              </p>
            </div>
            <p>체크인: {new Date(booking.check_in_date).toLocaleDateString()}</p>
            <p>체크아웃: {new Date(booking.check_out_date).toLocaleDateString()}</p>
            <p className="text-right font-bold text-brown-600">
              {booking.price.toLocaleString()}원/박
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsContent;
