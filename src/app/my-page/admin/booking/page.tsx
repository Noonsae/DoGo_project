'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import AdminSidebar from '@/app/my-page/_components/AdminSidebar'; 

// 예약 데이터 타입 정의
interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  user_details: {
    nickname: string;
    email: string;
  };
  room_details: {
    room_name: string;
    price: number;
  };
}

const AdminBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 예약 데이터 가져오기
    const fetchBookings = async () => {
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
            users (
              nickname,
              email
            ),
            rooms (
              room_name,
              price
            )
          `);

        if (error) throw error;

        const formattedData: Booking[] =
          data?.map((booking) => ({
            id: booking.id,
            user_id: booking.user_id,
            room_id: booking.room_id,
            check_in_date: booking.check_in_date,
            check_out_date: booking.check_out_date,
            status: booking.status as 'confirmed' | 'pending' | 'cancelled',
            user_details: {
              nickname: booking.users?.nickname || 'Unknown User',
              email: booking.users?.email || 'Unknown Email',
            },
            room_details: {
              room_name: booking.rooms?.room_name || 'Unknown Room',
              price: booking.rooms?.price || 0,
            },
          })) || [];

        setBookings(formattedData);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('예약 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (bookings.length === 0) return <p className="text-center text-gray-500">등록된 예약이 없습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">예약 관리</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">예약 ID</th>
            <th className="border border-gray-200 px-4 py-2">사용자 닉네임</th>
            <th className="border border-gray-200 px-4 py-2">이메일</th>
            <th className="border border-gray-200 px-4 py-2">객실 이름</th>
            <th className="border border-gray-200 px-4 py-2">체크인</th>
            <th className="border border-gray-200 px-4 py-2">체크아웃</th>
            <th className="border border-gray-200 px-4 py-2">상태</th>
            <th className="border border-gray-200 px-4 py-2">가격</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border border-gray-200 px-4 py-2">{booking.id}</td>
              <td className="border border-gray-200 px-4 py-2">{booking.user_details.nickname}</td>
              <td className="border border-gray-200 px-4 py-2">{booking.user_details.email}</td>
              <td className="border border-gray-200 px-4 py-2">{booking.room_details.room_name}</td>
              <td className="border border-gray-200 px-4 py-2">
                {new Date(booking.check_in_date).toLocaleDateString()}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {new Date(booking.check_out_date).toLocaleDateString()}
              </td>
              <td className="border border-gray-200 px-4 py-2">{booking.status}</td>
              <td className="border border-gray-200 px-4 py-2">
                {booking.room_details.price.toLocaleString()}원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingPage;
