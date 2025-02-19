'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 객실 데이터를 나타내는 인터페이스 정의
// TODO 타입 파일 분리 
interface Room {
  id: string; // 객실 ID
  room_type: string; // 객실 유형
  bed_type: string; // 침대 유형
  price: number; // 1박 가격
  room_img_url: string | null; // 객실 이미지 URL
  hotel_id: string; // 호텔 ID
  room_name: string; // 객실 이름
  view: string; // 뷰 정보
  is_breakfast_included: string; // 조식 포함 여부
}

// Props 타입 정의
interface RoomManagementProps {
  userId: string; // 사용자 ID
}

const RoomManagement: React.FC<RoomManagementProps> = ({ userId }) => {
  const [rooms, setRooms] = useState<Room[]>([]); // 객실 리스트
  const [hotelId, setHotelId] = useState<string | null>(null); // 호텔 ID
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 메시지
  const [newRoom, setNewRoom] = useState({
    room_type: '',
    bed_type: '',
    price: 0,
    room_img_url: '',
    room_name: '',
    view: '',
    is_breakfast_included: 'no' // 기본값 설정
  });

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    // 호텔 ID 가져오기
    const fetchHotelId = async () => {
      try {
        const { data, error } = await browserSupabase().from('hotels').select('id').eq('user_id', userId).single();

        if (error) throw error;
        setHotelId(data.id);
      } catch (err) {
        console.error('Error fetching hotel ID:', err);
        setError('호텔 데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchHotelId();
  }, [userId]);

  useEffect(() => {
    if (!hotelId) return;

    const fetchRooms = async () => {
      try {
        const { data, error } = await browserSupabase().from('rooms').select('*').eq('hotel_id', hotelId);

        if (error) throw error;

        // 데이터 변환 (room_img_url 처리)
        const formattedData = (data || []).map((room: any) => ({
          ...room,
          room_img_url: room.room_img_url ? String(room.room_img_url) : null
        })) as Room[];

        setRooms(formattedData);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('객실 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId]);

  const handleAddRoom = async () => {
    if (!hotelId) {
      setError('호텔 ID를 찾을 수 없습니다.');
      return;
    }

    try {
      setError(null);

      // 객실 추가
      const { error } = await browserSupabase()
        .from('rooms')
        .insert([{ ...newRoom, hotel_id: hotelId, price: Number(newRoom.price) }]);

      if (error) throw error;

      setNewRoom({
        room_type: '',
        bed_type: '',
        price: 0,
        room_img_url: '',
        room_name: '',
        view: '',
        is_breakfast_included: 'no' // 기본값 초기화
      });

      // 데이터 새로고침
      const { data } = await browserSupabase().from('rooms').select('*').eq('hotel_id', hotelId);

      const formattedData = (data || []).map((room: any) => ({
        ...room,
        room_img_url: room.room_img_url ? String(room.room_img_url) : null
      })) as Room[];

      setRooms(formattedData);
    } catch (err) {
      console.error('Error adding room:', err);
      setError('객실 추가 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    try {
      const { error } = await browserSupabase().from('rooms').delete().eq('id', roomId);

      if (error) throw error;

      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    } catch (err) {
      console.error('Error deleting room:', err);
      setError('객실 삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">객실 관리</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">새 객실 추가</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="객실 유형"
            value={newRoom.room_type}
            onChange={(e) => setNewRoom({ ...newRoom, room_type: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="침대 유형"
            value={newRoom.bed_type}
            onChange={(e) => setNewRoom({ ...newRoom, bed_type: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="가격"
            value={newRoom.price}
            onChange={(e) => setNewRoom({ ...newRoom, price: parseFloat(e.target.value) })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="객실 이름"
            value={newRoom.room_name}
            onChange={(e) => setNewRoom({ ...newRoom, room_name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="뷰 정보"
            value={newRoom.view}
            onChange={(e) => setNewRoom({ ...newRoom, view: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={newRoom.is_breakfast_included}
            onChange={(e) => setNewRoom({ ...newRoom, is_breakfast_included: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="yes">조식 포함</option>
            <option value="no">조식 미포함</option>
          </select>
          <button
            onClick={handleAddRoom}
            className="col-span-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            객실 추가
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">객실 목록</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">객실 이름</th>
            <th className="p-2 border">객실 유형</th>
            <th className="p-2 border">가격</th>
            <th className="p-2 border">조식 포함</th>
            <th className="p-2 border">삭제</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="p-2 border">{room.room_name}</td>
              <td className="p-2 border">{room.room_type}</td>
              <td className="p-2 border">{room.price.toLocaleString()}원</td>
              <td className="p-2 border">{room.is_breakfast_included === 'yes' ? '포함' : '미포함'}</td>
              <td className="p-2 border">
                <button onClick={() => handleDeleteRoom(room.id)} className="text-red-500 hover:underline">
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomManagement;
