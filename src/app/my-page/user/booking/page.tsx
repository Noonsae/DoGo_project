// import Link from 'next/link';

// const page = () => {
//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center">
//       <span className="text-[28px] font-normal mb-4">Booking Page</span>
//       <p className="text-[32px] font-medium">죄송합니다. 아직 준비 중인 페이지입니다.</p>
//       <Link
//         href="/"
//         className="mt-8 p-4 bg-[#B3916A] rounded-[12px] text-white text-[20px] font-medium hover:bg-[#8F7455] active:bg-[#6B573F]"
//       >
//         홈페이지로 돌아가기
//       </Link>
//     </div>
//   );
// };

// export default page;
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Next.js의 Link 컴포넌트
import { browserSupabase } from '@/supabase/supabase-client';

// 예약 데이터 타입 정의
interface Booking {
  id: string; // 예약 ID
  room_id: string; // 객실 ID
  check_in_date: string; // 체크인 날짜
  check_out_date: string; // 체크아웃 날짜
  status: 'confirmed' | 'pending' | 'cancelled'; // 예약 상태
  room_details: {
    room_name: string; // 객실 이름
    price: number; // 객실 가격
    room_img_url: string | null; // 객실 이미지 URL
  };
}

const UserBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // 예약 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    // 예약 데이터 가져오기
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

        // Supabase에서 예약 데이터와 객실 데이터를 조인하여 가져옴
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
              room_img_url
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
  if (bookings.length === 0)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">내 예약</h1>
          <p className="text-[50px] font-medium text-gray-500">예약이 되어 있지 않습니다.</p>
          <Link
            href="/"
            className="mt-8 inline-block p-4 bg-[#B3916A] rounded-[12px] text-white text-[20px] font-medium hover:bg-[#8F7455] active:bg-[#6B573F]"
          >
            홈페이지로 돌아가기
          </Link>
        </div>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">내 예약</h1>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="p-4 border rounded shadow">
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
                <p>
                  체크인: {new Date(booking.check_in_date).toLocaleDateString()} <br />
                  체크아웃: {new Date(booking.check_out_date).toLocaleDateString()}
                </p>
                <p className={`mt-2 font-semibold ${getStatusClass(booking.status)}`}>상태: {booking.status}</p>
              </div>
              <p className="font-bold">{booking.room_details.price.toLocaleString()}원/박</p>
            </div>
          </li>
        ))}
      </ul>
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

export default UserBookingPage;
