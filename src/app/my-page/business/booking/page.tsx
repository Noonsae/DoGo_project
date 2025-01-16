'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  created_at: string;
}

const BookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션용
  const [hasMore, setHasMore] = useState(true); // 무한 스크롤용
  const PAGE_SIZE = 10; // 한 번에 가져올 데이터 크기

  // 권한 확인 (관리자 또는 특정 사용자만 접근 가능)
  const checkPermissions = async () => {
    const { data, error } = await browserSupabase().auth.getUser();
    if (error || !data?.user) {
      setError('권한이 없습니다.');
      throw new Error('Unauthorized');
    }

    // 권한 체크 예: 관리자만 접근 가능하도록 설정
    if (data.user.role !== 'admin') {
      setError('접근 권한이 없습니다.');
      throw new Error('Unauthorized');
    }
  };

  // 예약 데이터 가져오기
  const fetchBookings = async (page: number) => {
    try {
      await checkPermissions(); // 권한 확인
      const { data, error } = await browserSupabase()
        .from('bookings')
        .select('id, user_id, room_id, check_in_date, check_out_date, status, created_at')
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
        .order('created_at', { ascending: false }); // 최신순 정렬
      if (error) throw error;

      if (data.length < PAGE_SIZE) setHasMore(false);
      setBookings((prev) => [...prev, ...data]);
    } catch (err: any) {
      console.error(err);
      setError('예약 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 첫 번째 페이지 예약 데이터 가져오기
  useEffect(() => {
    fetchBookings(1);
  }, []);

  // 페이지네이션 핸들링
  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    setCurrentPage((prev) => prev + 1);
    fetchBookings(currentPage + 1);
  };

  // 예약 삭제
  const handleDeleteBooking = async (id: string) => {
    try {
      await checkPermissions(); // 권한 확인
      const { error } = await browserSupabase().from('bookings').delete().eq('id', id);
      if (error) throw error;

      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (err) {
      console.error(err);
      setError('예약 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading && bookings.length === 0) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">예약 관리</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">사용자</th>
            <th className="border p-2">객실</th>
            <th className="border p-2">체크인</th>
            <th className="border p-2">체크아웃</th>
            <th className="border p-2">상태</th>
            <th className="border p-2">작업</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.id}</td>
              <td className="border p-2">{booking.user_id}</td>
              <td className="border p-2">{booking.room_id}</td>
              <td className="border p-2">{new Date(booking.check_in_date).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(booking.check_out_date).toLocaleDateString()}</td>
              <td className="border p-2">{booking.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
