'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Booking 데이터 타입 정의
interface Booking {
  id: string; // 예약 고유 ID
  user_id: string; // 예약자 사용자 ID
  room_id: string; // 객실 ID
  check_in_date: string; // 체크인 날짜
  check_out_date: string; // 체크아웃 날짜
  status: 'confirmed' | 'pending' | 'cancelled'; // 예약 상태
  created_at: string; // 생성 날짜
  room_details: {
    room_name: string; // 객실 이름
    price: number; // 객실 가격
  };
}

const PAGE_SIZE = 5; // 페이지네이션용 한 번에 가져올 데이터 크기

const BookingManager: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // 예약 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

  const fetchBookings = async (page: number) => {
    try {
      setLoading(true);

      const { data, error } = await browserSupabase()
        .from('bookings')
        .select(`
          id,
          user_id,
          room_id,
          check_in_date,
          check_out_date,
          status,
          created_at,
          rooms (
            room_name,
            price
          )
        `)
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data.length < PAGE_SIZE) setHasMore(false);

      const formattedData: Booking[] = data.map((booking) => ({
        id: booking.id,
        user_id: booking.user_id,
        room_id: booking.room_id,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        status: booking.status as 'confirmed' | 'pending' | 'cancelled',
        created_at: booking.created_at,
        room_details: {
          room_name: booking.rooms?.room_name ?? 'N/A',
          price: booking.rooms?.price ?? 0,
        },
      }));

      setBookings((prev) => [...prev, ...formattedData]);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('예약 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(1);
  }, []);

  if (loading && bookings.length === 0)
    return <p className="text-center text-gray-600">로딩 중...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (bookings.length === 0)
    return <p className="text-center text-gray-600">등록된 예약이 없습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">예약 관리</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">사용자</th>
            <th className="border p-2">객실명</th>
            <th className="border p-2">가격</th>
            <th className="border p-2">체크인</th>
            <th className="border p-2">체크아웃</th>
            <th className="border p-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.id}</td>
              <td className="border p-2">{booking.user_id}</td>
              <td className="border p-2">{booking.room_details.room_name}</td>
              <td className="border p-2">
                {booking.room_details.price.toLocaleString()}원
              </td>
              <td className="border p-2">
                {new Date(booking.check_in_date).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(booking.check_out_date).toLocaleDateString()}
              </td>
              <td className="border p-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManager;
