'use client';

import React, { useEffect, useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Booking 데이터 타입 정의
interface Booking {
  id: string; // 예약 고유 ID
  user_id: string; // 예약자 사용자 ID
  room_id: string; // 객실 ID
  check_in_date: string; // 체크인 날짜
  check_out_date: string; // 체크아웃 날짜
  status: 'confirmed' | 'pending' | 'cancelled'; // 예약 상태
  room_details?: {
    room_name: string; // 객실 이름
    price: number; // 객실 가격
  };
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // 예약 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('bookings')
          .select(`
            id,
            user_id,
            room_id,
            check_in_date,
            check_out_date,
            status,
            rooms (
              room_name,
              price
            )
          `);

        if (error) throw error;

        // 데이터를 Booking 타입으로 매핑
        const formattedData: Booking[] =
          data?.map((booking) => ({
            id: booking.id,
            user_id: booking.user_id,
            room_id: booking.room_id,
            check_in_date: booking.check_in_date,
            check_out_date: booking.check_out_date,
            status: booking.status as 'confirmed' | 'pending' | 'cancelled',
            room_details: booking.rooms
              ? {
                  room_name: booking.rooms.room_name,
                  price: booking.rooms.price,
                }
              : undefined,
          })) || [];

        setBookings(formattedData); // 상태 업데이트
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('예약 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 로딩 중 표시
  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;

  // 에러 발생 시 표시
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 예약 데이터가 없을 경우 표시
  if (bookings.length === 0)
    return <p className="text-center text-gray-600">등록된 예약이 없습니다.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">예약 리스트</h2>
      <table className="w-full border-collapse border border-gray-300">
        {/* 테이블 헤더 */}
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">예약자 ID</th>
            <th className="border p-2">객실명</th>
            <th className="border p-2">가격</th>
            <th className="border p-2">체크인 날짜</th>
            <th className="border p-2">체크아웃 날짜</th>
            <th className="border p-2">상태</th>
          </tr>
        </thead>
        {/* 테이블 바디 */}
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.user_id}</td>
              <td className="border p-2">
                {booking.room_details?.room_name || 'N/A'}
              </td>
              <td className="border p-2">
                {booking.room_details?.price?.toLocaleString() || 'N/A'}원
              </td>
              <td className="border p-2">
                {new Date(booking.check_in_date).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(booking.check_out_date).toLocaleDateString()}
              </td>
              <td className="border p-2 capitalize">
                <span
                  className={`px-2 py-1 rounded ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
