'use client';
import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Booking 데이터 타입 정의
interface Booking {
  id: string; // 예약 ID
  created_at: string; // 예약 생성일
  room_id: string; // 객실 ID
  check_in_date: string; // 체크인 날짜
  check_out_date: string; // 체크아웃 날짜
  status: string; // 예약 상태
  rooms: {
    room_name: string; // 객실 이름
    price: number; // 객실 가격
    room_img_url: string | null; // 객실 이미지 URL
  };
}

// BookingsContent Props 타입 정의
interface BookingsContentProps {
  userId: string; // 사용자 ID
}

const BookingsContent: React.FC<BookingsContentProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Supabase에서 예약 데이터와 객실 데이터를 조인
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
              price,
              room_img_url
            )
          `)
          .eq('user_id', userId);

        if (error) throw error;

        // 데이터 형식 변환: room_img_url을 string | null로 처리
        const formattedData = data?.map((booking) => ({
          ...booking,
          rooms: {
            ...booking.rooms,
            room_img_url: typeof booking.rooms.room_img_url === 'string'
              ? booking.rooms.room_img_url
              : null,
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
  }, [userId]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!bookings.length) return <p className="text-center text-gray-600">예약이 없습니다.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">예약 목록</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="p-4 border rounded shadow">
            <div className="flex items-center space-x-4">
              {/* 객실 이미지 */}
              {booking.rooms.room_img_url && (
                <img
                  src={booking.rooms.room_img_url}
                  alt={booking.rooms.room_name}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                {/* 객실 이름 */}
                <h3 className="font-bold text-lg">{booking.rooms.room_name}</h3>
                {/* 체크인/체크아웃 날짜 */}
                <p>
                  체크인: {new Date(booking.check_in_date).toLocaleDateString()} <br />
                  체크아웃: {new Date(booking.check_out_date).toLocaleDateString()}
                </p>
                {/* 예약 상태 */}
                <p className={`font-semibold mt-2 ${getStatusClass(booking.status)}`}>
                  상태: {booking.status}
                </p>
              </div>
              {/* 객실 가격 */}
              <p className="text-right font-bold">
                {booking.rooms.price.toLocaleString()}원/박
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 예약 상태에 따른 스타일 클래스 반환 함수
const getStatusClass = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'text-green-500';
    case 'pending':
      return 'text-yellow-500';
    case 'cancelled':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default BookingsContent;
