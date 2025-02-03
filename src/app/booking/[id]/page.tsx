'use client';

import FileIcon from '@/components/ui/icon/FileIcon';
import { browserSupabase } from '@/supabase/supabase-client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
interface BookingType {
  id: string;
  check_in_date: string;
  check_out_date: string;
  user_id: string;
  room_id: string;
  status: string;
}

interface RoomType {
  id: string;
  room_name: string;
  hotel_id: string;
}

interface HotelType {
  id: string;
  name: string;
  address: string;
}

interface UserType {
  user_name: string;
  email: string;
  phone_number: string;
}
//예약확정페이지
const BookingConfirmPage = () => {
  const [booking, setBooking] = useState<BookingType | null>(null);
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [room, setRoom] = useState<RoomType | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 호텔객실상세 페이지에서 예약하기 버튼 클릭-> 결제페이지 이동
  // 결제페이지에서 선택된 객실정보+가격 -> 결제진행
  // 결제 성공 시 bookings테이블에 예약정보를 저장
  // 예액확정 페이지는 결제 페이지에서 받은 데이터를 기반으로 예약정보를 표시
  // 따라서 supabase에서 불러오는 게 아님
  
  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (paymentKey && orderId && amount) {
      console.log('결제 성공 정보:', { paymentKey, orderId, amount });

      // (선택) 백엔드 검증 요청 로직 추가
      // 예: fetch('/api/verify-payment', { method: 'POST', body: JSON.stringify({ paymentKey, orderId, amount }) });
    }
  }, [searchParams]);
  
  useEffect(() => {
    if (!id) {
      console.error('예약 ID가 없습니다.');
      return;
    }
    const fetchBookingData = async () => {
      const supabase = browserSupabase();
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('id, check_in_date, check_out_date, user_id, room_id, status')
        .eq('id', String(id)) // ✅ id를 항상 문자열로 변환
        .single();

      if (bookingError) {
        console.error('예약 정보를 불러오는 중 오류 발생:', bookingError.message);
        return;
      }
      setBooking(bookingData);

      // 🔹 객실 정보 가져오기 (rooms 테이블)
      const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('id, room_name, hotel_id')
        .eq('id', bookingData.room_id)
        .single();

      if (roomError) {
        console.error('객실 정보를 불러오는 중 오류 발생:', roomError.message);
        return;
      }
      setRoom(roomData);

      // 🔹 호텔 정보 가져오기 (hotels 테이블)
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .select('id, name, address')
        .eq('id', roomData.hotel_id)
        .single();

      if (hotelError) {
        console.error('호텔 정보를 불러오는 중 오류 발생:', hotelError.message);
        return;
      }
      setHotel(hotelData);

      // 🔹 예약한 유저 정보 가져오기 (users 테이블)
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_name, email, phone_number')
        .eq('id', bookingData.user_id)
        .single();

      if (userError) {
        console.error('유저 정보를 불러오는 중 오류 발생:', userError.message);
        return;
      }
      setUser(userData as UserType);
    };

    if (id) {
      fetchBookingData();
    }
  }, [id]);

  const handleHome = () => {
    router.push('/');
  };
  return (
    <div className="container mx-auto py-32 px-4 md:px-10 lg:px-32 max-w-4xl flex flex-col space-y-6">
      {/* 예약 확정 메시지 */}
      <div>
        <p className="text-[#B3916A] text-xl font-bold">예약이 확정되었습니다.</p>
        <p className="text-gray-600 mt-2">
          고객님의 이메일 주소({user?.email ?? 'E-mail address'})로 예약 확정 이메일이 전송되었습니다.
        </p>
        <p className="text-gray-500 text-sm mt-1">체크인 전까지 자유롭게 예약을 변경하거나 취소할 수 있습니다.</p>
      </div>

      {/* 예약 번호 */}
      <div className="  rounded-lg p-6 border border-gray-200">
        <p className="text-lg font-semibold text-gray-700">나의 예약 번호</p>
        <p className="text-gray-800 mt-2"> {booking?.id?.split('-')[0] ?? '예약 정보 없음'}</p>
        <div className="flex flex-row items-center">
          <FileIcon />
          <button
            onClick={() => navigator.clipboard.writeText(booking?.id ?? '')}
            className="mt-2 ml-[10px] text-[#B3916A] text-sm underline "
          >
            복사하기
          </button>
        </div>
      </div>

      {/* 호텔 정보 */}
      <div className="  rounded-lg p-6 border border-gray-200">
        <p className="text-lg font-semibold text-gray-700">호텔 정보 확인하기</p>
        <p className="text-gray-500 text-sm mt-1">예약하신 호텔의 정보를 확인해 주세요.</p>
        <hr className="border-t border-gray-300 my-6" />
        <div className="mt-4 space-y-2">
          <p className="font-semibold">{hotel?.name ?? 'Hotel Name'}</p>
          <p className="text-gray-600">{room?.room_name ?? 'Room Name'}</p>
          <p className="text-gray-500">성인 O명 • 어린이 O명 • 반려동물 O마리</p>
          <p className="text-gray-500">{hotel?.address ?? 'Address'}</p>
        </div>

        {/* 체크인 & 체크아웃 정보 */}
        <div className="flex mt-4 mr-[24px]">
          <div className="ml-[30px]">
            <p className="font-semibold">체크인</p>
            <p className="text-gray-600">{booking?.check_in_date ?? '날짜 없음'}</p>
          </div>
          <div className="w-[1px] ml-36 bg-gray-300 h-10"></div>

          <div className="ml-[24px]">
            <p className="font-semibold ">체크아웃</p>
            <p className="text-gray-600">{booking?.check_out_date ?? '날짜 없음'}</p>
          </div>
        </div>
      </div>

      {/* 투숙객 정보 */}
      <div className="  rounded-lg p-6 border border-gray-200">
        <p className="text-lg font-semibold text-gray-700">투숙객 정보</p>
        <p className="text-gray-500 text-sm mt-1">투숙하실 고객의 정보를 확인해 주세요.</p>
        <hr className="border-t border-gray-300 my-6" />

        <div className="mt-4 space-y-2">
          <p className="font-semibold">{hotel?.name ?? 'Hotel Name'}</p>
          <p className="text-gray-600">{user?.user_name ?? 'Name'}</p>
          <p className="text-gray-500">{user?.email ?? 'E-mail address'}</p>
          <p className="text-gray-500">{user?.phone_number ?? '000-0000-0000'}</p>
        </div>
      </div>

      {/* 홈으로 돌아가기 버튼 */}
      <div className="w-full flex flex-row justify-end">
        <button
          className="bg-[#B3916A] text-white rounded-md py-3 px-6 w-full md:w-[174px] hover:bg-opacity-80"
          onClick={handleHome}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmPage;
