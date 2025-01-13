// 'use client';

// import React, { useState, useEffect } from 'react';
// import { browserSupabase } from '@/supabase/supabase-client';

// // 객실 데이터를 나타내는 인터페이스 정의
// interface Room {
//   id: string; // 객실 ID
//   room_type: string; // 객실 유형
//   bed_type: string; // 침대 유형
//   price: number; // 1박 가격
//   room_img_url: string | null; // 객실 이미지 URL (null 가능)
//   hotel_id: string; // 관련된 호텔 ID
//   room_name: string; // 객실 이름
//   view: string; // 뷰 정보
// }

// // Props 타입 정의
// interface RoomManagementProps {
//   userId: string; // 사용자 ID
// }

// const RoomManagement: React.FC<RoomManagementProps> = ({ userId }) => {
//   // 상태 정의
//   const [rooms, setRooms] = useState<Room[]>([]); // 객실 리스트
//   const [newRoom, setNewRoom] = useState({
//     room_type: '', // 객실 유형
//     bed_type: '', // 침대 유형
//     price: 0, // 가격 (숫자)
//     room_img_url: '', // 객실 이미지 URL
//     hotel_id: '', // 호텔 ID
//     room_name: '', // 객실 이름
//     view: '' // 뷰 정보
//   });
//   const [loading, setLoading] = useState(true); // 로딩 상태
//   const [error, setError] = useState<string | null>(null); // 오류 메시지
//   const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지

//   // 데이터 가져오기
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         // Supabase에서 데이터 가져오기
//         const { data, error } = await browserSupabase()
//           .from('rooms')
//           .select('id, room_type, bed_type, price, room_img_url, hotel_id, room_name, view')
//           .eq('user_id', userId); // userId로 필터링

//         if (error) throw error;

//         setRooms(data || []);
//       } catch (err) {
//         console.error('Error fetching rooms:', err);
//         setError('객실 데이터를 불러오는 중 오류가 발생했습니다.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, [userId]);

//   // 새로운 객실 추가 함수
//   const handleAddRoom = async () => {
//     try {
//       setError(null);
//       setSuccessMessage(null);

//       // 필드 검증
//       if (
//         !newRoom.room_type ||
//         !newRoom.bed_type ||
//         !newRoom.hotel_id ||
//         !newRoom.room_name ||
//         newRoom.price <= 0
//       ) {
//         setError('모든 필드를 올바르게 입력해주세요.');
//         return;
//       }

//       // Supabase에 새로운 객실 추가
//       const { error } = await browserSupabase()
//         .from('rooms')
//         .insert([
//           {
//             room_type: newRoom.room_type,
//             bed_type: newRoom.bed_type,
//             price: newRoom.price,
//             room_img_url: newRoom.room_img_url || null,
//             hotel_id: newRoom.hotel_id,
//             room_name: newRoom.room_name,
//             view: newRoom.view,
//             user_id: userId // userId 추가
//           }
//         ]);

//       if (error) throw error;

//       setSuccessMessage('객실이 성공적으로 추가되었습니다.');
//       setNewRoom({
//         room_type: '',
//         bed_type: '',
//         price: 0,
//         room_img_url: '',
//         hotel_id: '',
//         room_name: '',
//         view: ''
//       });

//       // 데이터 다시 가져오기
//       const { data } = await browserSupabase()
//         .from('rooms')
//         .select('id, room_type, bed_type, price, room_img_url, hotel_id, room_name, view')
//         .eq('user_id', userId); // userId로 필터링
//       setRooms(data || []);
//     } catch (err) {
//       console.error('Error adding room:', err);
//       setError('객실 추가 중 오류가 발생했습니다.');
//     }
//   };

//   // 로딩 중 표시
//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;

//   // 오류 메시지 표시
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">객실 관리</h2>
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">새 객실 추가</h3>
//         <div className="space-y-4">
//           {/* 필드들 */}
//           {/* 필드 코드 생략 */}
//           <button
//             onClick={handleAddRoom}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             객실 추가
//           </button>
//           {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </div>
//       </div>
//       <h3 className="text-lg font-semibold mb-2">객실 목록</h3>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border p-2">객실 유형</th>
//             <th className="border p-2">침대 유형</th>
//             <th className="border p-2">가격</th>
//             <th className="border p-2">이미지</th>
//             <th className="border p-2">호텔 ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room) => (
//             <tr key={room.id}>
//               <td className="border p-2">{room.room_type}</td>
//               <td className="border p-2">{room.bed_type}</td>
//               <td className="border p-2">{room.price.toLocaleString()}원</td>
//               <td className="border p-2">
//                 {room.room_img_url ? (
//                   <img src={room.room_img_url} alt="Room" className="w-16 h-16 object-cover rounded" />
//                 ) : (
//                   '이미지 없음'
//                 )}
//               </td>
//               <td className="border p-2">{room.hotel_id}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RoomManagement;
