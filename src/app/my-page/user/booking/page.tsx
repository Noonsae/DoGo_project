'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client';

// TODO 타입 파일 분리 
interface Booking {
  id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  room_details: {
    room_name: string;
    price: number;
    room_img_url: string | null;
  };
  hotel_details: {
    name: string;
    address: string;
  };
}

const UserBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const {
          data: { user },
          error: authError
        } = await browserSupabase().auth.getUser();

        if (authError || !user) {
          throw new Error('로그인 정보가 없습니다.');
        }

        // Supabase에서 예약 데이터와 객실 및 호텔 정보를 조인하여 가져옴
        const { data, error } = await browserSupabase()
          .from('bookings')
          .select(
            `
            id,
            room_id,
            check_in_date,
            check_out_date,
            status,
            rooms (
              room_name,
              price,
              room_img_url,
              hotel_id
            ),
            hotels (
              name,
              address
            )
          `
          )
          .eq('user_id', user.id);

        if (error) throw error;

        // 데이터 변환
        const formattedData: Booking[] =
          data?.map((booking: any) => ({
            id: booking.id,
            room_id: booking.room_id,
            check_in_date: booking.check_in_date,
            check_out_date: booking.check_out_date,
            status: booking.status as 'confirmed' | 'pending' | 'cancelled',
            room_details: {
              room_name: booking.rooms?.room_name || 'N/A',
              price: booking.rooms?.price || 0,
              room_img_url: typeof booking.rooms?.room_img_url === 'string' ? booking.rooms.room_img_url : null
            },
            hotel_details: {
              name: booking.hotels?.name || 'N/A',
              address: booking.hotels?.address || '주소 없음'
            }
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

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">내 예약</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">예약이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/booking/${booking.id}`)}
            >
              <div className="flex items-center space-x-4">
                {/* 객실 이미지 */}
                {booking.room_details.room_img_url && (
                  <img
                    src={booking.room_details.room_img_url}
                    alt={booking.room_details.room_name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{booking.room_details.room_name}</h3>
                  <p className="text-sm text-gray-600">{booking.hotel_details.name}</p>
                  <p className="text-sm text-gray-500">{booking.hotel_details.address}</p>
                  <p className="text-sm">
                    체크인: {new Date(booking.check_in_date).toLocaleDateString()} <br />
                    체크아웃: {new Date(booking.check_out_date).toLocaleDateString()}
                  </p>
                  <p className={`mt-2 font-semibold ${getStatusClass(booking.status)}`}>
                    상태: {getStatusLabel(booking.status)}
                  </p>
                </div>
                <p className="font-bold">{booking.room_details.price.toLocaleString()}원/박</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 예약 상태에 따른 스타일 적용
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

// 상태 라벨 변환
const getStatusLabel = (status: string) => {
  return status === 'confirmed' ? '예약 확정' : status === 'pending' ? '대기 중' : '취소됨';
};

export default UserBookingPage;
