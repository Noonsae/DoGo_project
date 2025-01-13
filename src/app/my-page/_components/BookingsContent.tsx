'use client';
import React, { useState, useEffect } from 'react'; // React와 필요한 훅을 import
import { browserSupabase } from '@/supabase/supabase-client'; // Supabase 클라이언트 import

// Booking 인터페이스 정의: 예약 데이터를 나타냄
interface Booking {
  id: string; // 예약 ID
  created_at: string; // 예약 생성일
  room_id: string; // 객실 ID
  check_in_date: string; // 체크인 날짜
  check_out_date: string; // 체크아웃 날짜
  status: string; // 예약 상태 ('confirmed', 'pending', 'cancelled' 등)
  room_details: {
    room_name: string; // 객실 이름
    price: number; // 객실 가격
  };
}

// BookingsContentProps 인터페이스 정의: 컴포넌트가 받을 props의 타입 지정
interface BookingsContentProps {
  userId: string; // 사용자 ID, 예약 데이터를 필터링하기 위해 사용
}

const BookingsContent: React.FC<BookingsContentProps> = ({ userId }) => {
  // 예약 데이터를 저장하는 상태
  const [bookings, setBookings] = useState<Booking[]>([]);
  // 데이터를 불러오는 동안의 로딩 상태
  const [loading, setLoading] = useState(true);
  // 에러 메시지를 저장하는 상태
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    // Supabase에서 예약 데이터를 가져오는 비동기 함수
    const fetchBookings = async () => {
      try {
        // Supabase에서 'bookings' 테이블 데이터를 가져옴
        const { data, error } = await browserSupabase()
          .from('bookings') // 'bookings' 테이블
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
          `) // 'rooms' 테이블과 조인하여 객실 이름과 가격 포함
          .eq('user_id', userId); // 특정 사용자 ID와 일치하는 데이터만 가져옴

        // 에러가 발생하면 예외 처리
        if (error) throw error;

        // Supabase 데이터 형식에 맞게 'rooms' 데이터를 'room_details'로 매핑
        const formattedData = data?.map((booking) => ({
          ...booking, // 기존 예약 데이터 유지
          room_details: booking.rooms, // 'rooms' 데이터를 'room_details'로 매핑
        })) || [];

        // 상태에 예약 데이터 저장
        setBookings(formattedData);
      } catch (err) {
        // 에러 발생 시 콘솔에 출력하고 에러 메시지 상태에 저장
        console.error('Error fetching bookings:', err);
        setError('예약 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        // 데이터를 모두 불러온 후 로딩 상태를 false로 설정
        setLoading(false);
      }
    };

    // 예약 데이터를 가져오는 함수 호출
    fetchBookings();
  }, [userId]); // userId가 변경될 때마다 이 효과 실행

  // 로딩 중일 때 표시할 메시지
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 에러 발생 시 표시할 메시지
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 예약 데이터가 없을 때 표시할 메시지
  if (!bookings.length) return <p className="text-center text-gray-600">예약이 없습니다.</p>;

  // 예약 데이터를 표시하는 컴포넌트 렌더링
  return (
    <div className="p-4 bg-white rounded shadow">
      {/* 제목 */}
      <h2 className="text-xl font-bold mb-4">예약 목록</h2>
      {/* 예약 목록 */}
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="p-4 border rounded shadow">
            {/* 객실 이름 */}
            <h3 className="font-bold">{booking.room_details.room_name}</h3>
            {/* 체크인 날짜 */}
            <p>체크인: {new Date(booking.check_in_date).toLocaleDateString()}</p>
            {/* 체크아웃 날짜 */}
            <p>체크아웃: {new Date(booking.check_out_date).toLocaleDateString()}</p>
            {/* 가격 표시 */}
            <p className="text-right font-bold">{booking.room_details.price.toLocaleString()}원/박</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsContent;
