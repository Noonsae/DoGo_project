'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import useAuthStore from '@/store/useAuth';

// TODO 타입 파일 분리 
interface Room {
  id: string;
  room_name: string;
  room_type: string;
  price: number;
  bed_type: string;
  is_breakfast_included: string | null;
  view: string;
  created_at: string | null;
}

const RoomPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hotelId, setHotelId] = useState<string | null>(null); // 🔹 호텔 ID 상태 추가
  const [newRoom, setNewRoom] = useState({
    room_name: '',
    room_type: '',
    price: 0,
    bed_type: '',
    is_breakfast_included: 'false',
    view: ''
  });

  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  // 🔹 로그인한 사용자의 호텔 ID 가져오기
  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchHotelId = async () => {
      try {
        if (!userId) return;

        const { data, error } = await browserSupabase().from('hotels').select('id').eq('user_id', userId).maybeSingle();

        if (error) throw error;
        if (data) {
          setHotelId(data.id); // 호텔 ID 상태 업데이트
        }
      } catch (err) {
        console.error('Error fetching hotel ID:', err);
        setError('호텔 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchHotelId();
  }, [userId]);

  // 🔹 호텔 ID가 있을 때만 방 목록 가져오기
  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!hotelId) return;

        const { data, error } = await browserSupabase()
          .from('rooms')
          .select('id, room_name, room_type, price, bed_type, is_breakfast_included, view, created_at')
          .eq('hotel_id', hotelId);

        if (error) throw error;
        setRooms(data || []);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('객실 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  // 🔹 방 추가하기
  const handleAddRoom = async () => {
    try {
      if (!hotelId) {
        alert('호텔 정보를 찾을 수 없습니다.');
        return;
      }

      const { data, error } = await browserSupabase()
        .from('rooms')
        .insert([
          {
            ...newRoom,
            hotel_id: hotelId // 🔹 수정된 hotelId 적용
          }
        ]);

      if (error) throw error;

      if (data) {
        setRooms((prev) => [...prev, data[0]]);
      }

      setNewRoom({
        room_name: '',
        room_type: '',
        price: 0,
        bed_type: '',
        is_breakfast_included: 'false',
        view: ''
      });
    } catch (err) {
      console.error('Error adding room:', err);
      setError('객실 추가 중 오류가 발생했습니다.');
    }
  };

  // 🔹 방 삭제하기
  const handleDeleteRoom = async (roomId: string) => {
    try {
      const { error } = await browserSupabase().from('rooms').delete().eq('id', roomId);

      if (error) throw error;

      setRooms((prev) => prev.filter((room) => room.id !== roomId));
    } catch (err) {
      console.error('Error deleting room:', err);
      setError('객실 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">객실 관리</h2>

      {/* 새 객실 추가 */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">새 객실 추가</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="객실 이름"
            value={newRoom.room_name}
            onChange={(e) => setNewRoom({ ...newRoom, room_name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="객실 타입"
            value={newRoom.room_type}
            onChange={(e) => setNewRoom({ ...newRoom, room_type: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="가격"
            value={newRoom.price}
            onChange={(e) => setNewRoom({ ...newRoom, price: parseFloat(e.target.value) })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="침대 타입"
            value={newRoom.bed_type}
            onChange={(e) => setNewRoom({ ...newRoom, bed_type: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="뷰"
            value={newRoom.view}
            onChange={(e) => setNewRoom({ ...newRoom, view: e.target.value })}
            className="border p-2 rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newRoom.is_breakfast_included === 'true'}
              onChange={(e) => setNewRoom({ ...newRoom, is_breakfast_included: e.target.checked ? 'true' : 'false' })}
            />
            조식 포함 여부
          </label>
          <button onClick={handleAddRoom} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            객실 추가
          </button>
        </div>
      </div>

      {/* 객실 목록 */}
      <h3 className="font-semibold mb-2">객실 목록</h3>
      {rooms.length === 0 ? (
        <p className="text-center text-gray-600">등록된 객실이 없습니다.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">객실 이름</th>
              <th className="border p-2">객실 타입</th>
              <th className="border p-2">가격</th>
              <th className="border p-2">침대 타입</th>
              <th className="border p-2">조식 포함</th>
              <th className="border p-2">뷰</th>
              <th className="border p-2">작업</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="border p-2">{room.room_name}</td>
                <td className="border p-2">{room.room_type}</td>
                <td className="border p-2">{room.price.toLocaleString()}원</td>
                <td className="border p-2">{room.bed_type}</td>
                <td className="border p-2">{room.is_breakfast_included === 'true' ? '포함' : '미포함'}</td>
                <td className="border p-2">{room.view}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoomPage;
