"use client";

import React, { useEffect, useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Booking 데이터 타입 정의
interface Booking {
  id: string; // 예약 ID
  user_id: string; // 예약한 사용자 ID
  hotel_id: string; // 예약된 호텔 ID
  room_id: string; // 예약된 객실 ID
  check_in_date: string; // 체크인 날짜
  check_out_date: string; // 체크아웃 날짜
  total_price: number; // 총 가격
  created_at: string; // 예약 생성 날짜
}

// Props 타입 정의
interface BookingManagementProps {
  userId: string; // 사용자 ID
}

const BookingManagement: React.FC<BookingManagementProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]); // 예약 리스트
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태

  // 예약 데이터 가져오기
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Supabase에서 예약 데이터 가져오기
        const { data, error } = await browserSupabase()
          .from('bookings')
          .select(`
            id,
            user_id,
            hotel_id,
            room_id,
            check_in_date,
            check_out_date,
            total_price,
            created_at
          `)
          .eq('user_id', userId); // 현재 사용자 ID로 필터링

        if (error) throw error; // 오류 발생 시 예외 처리

        setBookings(data || []); // 데이터를 상태에 저장
      } catch (err) {
        console.error('Error fetching bookings:', err); // 콘솔에 오류 출력
        setError('예약 데이터를 불러오는 중 오류가 발생했습니다.'); // 오류 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchBookings(); // 데이터 가져오기 함수 호출
  }, [userId]); // userId 변경 시 다시 호출

  // 로딩 중일 때 표시할 메시지
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 오류 발생 시 표시할 메시지
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 예약 데이터가 없을 때 표시할 메시지
  if (bookings.length === 0)
    return <p className="text-center text-gray-600">등록된 예약이 없습니다.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">예약 관리</h2>
      {/* 예약 데이터 테이블 */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">예약 ID</th>
            <th className="border p-2">사용자 ID</th>
            <th className="border p-2">호텔 ID</th>
            <th className="border p-2">객실 ID</th>
            <th className="border p-2">체크인 날짜</th>
            <th className="border p-2">체크아웃 날짜</th>
            <th className="border p-2">총 가격</th>
            <th className="border p-2">예약일</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.id}</td>
              <td className="border p-2">{booking.user_id}</td>
              <td className="border p-2">{booking.hotel_id}</td>
              <td className="border p-2">{booking.room_id}</td>
              <td className="border p-2">{booking.check_in_date}</td>
              <td className="border p-2">{booking.check_out_date}</td>
              <td className="border p-2">{booking.total_price.toLocaleString()}원</td>
              <td className="border p-2">
                {new Date(booking.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
