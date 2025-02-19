'use client';

import { useEffect, useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Booking 데이터 타입 정의
// TODO 데이터 타입 분리
interface Booking {
  id: string; // 예약 ID
  user_id: string; // 예약한 사용자 ID
  room_id: string; // 예약된 객실 ID
  check_in_date: string; // 체크인 날짜
  check_out_date: string; // 체크아웃 날짜
  created_at: string; // 예약 생성 날짜
  room_price: number; // 객실 가격
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
  // TODO 데이터 요청 함수 분리
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
            created_at,
            rooms(price)
          `)
          .eq('user_id', userId); // userId로 필터링

        if (error) throw error;

        // 데이터 변환: room_price를 포함하는 형식으로 매핑
        const formattedData = (data || []).map((booking: any) => ({
          ...booking,
          room_price: booking.rooms?.price || 0, // rooms 테이블의 price를 room_price로 설정
        }));

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

  // 총 가격 계산 함수
  const calculateTotalPrice = (checkInDate: string, checkOutDate: string, price: number) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const differenceInTime = checkOut.getTime() - checkIn.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // 하루 단위로 변환
    return Math.max(differenceInDays * price, 0); // 0일 이하가 되지 않도록 설정
  };

  // 로딩 중일 때 표시
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 오류 발생 시 표시
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 예약 데이터가 없을 때 표시
  if (bookings.length === 0)
    return <p className="text-center text-gray-600">등록된 예약이 없습니다.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">예약 관리</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">예약 ID</th>
            <th className="border p-2">사용자 ID</th>
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
              <td className="border p-2">{booking.room_id}</td>
              <td className="border p-2">{booking.check_in_date}</td>
              <td className="border p-2">{booking.check_out_date}</td>
              <td className="border p-2">
                {calculateTotalPrice(
                  booking.check_in_date,
                  booking.check_out_date,
                  booking.room_price
                ).toLocaleString()}
                원
              </td>
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
