// import React, { useState, useEffect } from 'react';
// import { browserSupabase } from '@/supabase/supabase-client';

// // 객실 데이터를 나타내는 인터페이스 정의
// interface Room {
//   id: string; // 객실 ID
//   room_type: string; // 객실 유형
//   bed_type: string; // 침대 유형
//   price: number; // 1박 가격
//   room_img_url: string | null; // 객실 이미지 URL (없을 수 있음)
//   hotel_id: string; // 관련된 호텔 ID
// }

// const RoomManagement: React.FC = () => {
//   // 상태 정의
//   const [rooms, setRooms] = useState<Room[]>([]); // 객실 리스트
//   const [newRoom, setNewRoom] = useState({
//     room_type: '', // 새 객실의 유형
//     bed_type: '', // 새 객실의 침대 유형
//     price: '', // 새 객실의 가격 (문자열로 입력)
//     room_img_url: '', // 새 객실 이미지 URL
//     hotel_id: '', // 새 객실이 속한 호텔 ID
//   });
//   const [loading, setLoading] = useState(true); // 로딩 상태
//   const [error, setError] = useState<string | null>(null); // 오류 메시지 상태
//   const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지 상태

//   // 데이터 가져오기
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         // Supabase에서 `rooms` 테이블 데이터 가져오기
//         const { data, error } = await browserSupabase()
//           .from('rooms')
//           .select('id, room_type, bed_type, price, room_img_url, hotel_id'); // `created_at` 제거

//         if (error) throw error; // 오류 발생 시 예외 처리

//         setRooms(data || []); // 가져온 데이터를 상태에 저장
//       } catch (err) {
//         console.error('Error fetching rooms:', err); // 콘솔에 오류 출력
//         setError('객실 데이터를 불러오는 중 오류가 발생했습니다.'); // 오류 메시지 상태에 저장
//       } finally {
//         setLoading(false); // 로딩 상태 해제
//       }
//     };

//     fetchRooms(); // 데이터 가져오기 함수 실행
//   }, []);

//   // 새로운 객실 추가 함수
//   const handleAddRoom = async () => {
//     try {
//       setError(null); // 이전 오류 메시지 초기화
//       setSuccessMessage(null); // 이전 성공 메시지 초기화

//       // Supabase에 새 객실 추가 요청
//       const { error } = await browserSupabase()
//         .from('rooms')
//         .insert([
//           {
//             room_type: newRoom.room_type, // 객실 유형
//             bed_type: newRoom.bed_type, // 침대 유형
//             price: parseInt(newRoom.price, 10), // 문자열 가격을 정수로 변환
//             room_img_url: newRoom.room_img_url || null, // 이미지 URL이 없을 경우 null
//             hotel_id: newRoom.hotel_id, // 호텔 ID
//           },
//         ]);

//       if (error) throw error; // 오류 발생 시 예외 처리

//       // 성공 시 상태 초기화 및 성공 메시지 설정
//       setSuccessMessage('객실이 성공적으로 추가되었습니다.');
//       setNewRoom({
//         room_type: '',
//         bed_type: '',
//         price: '',
//         room_img_url: '',
//         hotel_id: '',
//       });

//       // 새 데이터 다시 가져오기
//       const { data } = await browserSupabase()
//         .from('rooms')
//         .select('id, room_type, bed_type, price, room_img_url, hotel_id');
//       setRooms(data || []);
//     } catch (err) {
//       console.error('Error adding room:', err); // 콘솔에 오류 출력
//       setError('객실 추가 중 오류가 발생했습니다.'); // 오류 메시지 설정
//     }
//   };

//   // 로딩 중일 때 표시
//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;

//   // 오류 발생 시 표시
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">객실 관리</h2>
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">새 객실 추가</h3>
//         <div className="space-y-4">
//           {/* 객실 유형 입력 */}
//           <div>
//             <label className="block text-sm font-medium">객실 유형</label>
//             <input
//               type="text"
//               value={newRoom.room_type}
//               onChange={(e) => setNewRoom({ ...newRoom, room_type: e.target.value })}
//               placeholder="객실 유형을 입력하세요"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           {/* 침대 유형 입력 */}
//           <div>
//             <label className="block text-sm font-medium">침대 유형</label>
//             <input
//               type="text"
//               value={newRoom.bed_type}
//               onChange={(e) => setNewRoom({ ...newRoom, bed_type: e.target.value })}
//               placeholder="침대 유형을 입력하세요"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           {/* 가격 입력 */}
//           <div>
//             <label className="block text-sm font-medium">가격 (1박)</label>
//             <input
//               type="number"
//               value={newRoom.price}
//               onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
//               placeholder="가격을 입력하세요"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           {/* 이미지 URL 입력 */}
//           <div>
//             <label className="block text-sm font-medium">객실 이미지 URL</label>
//             <input
//               type="text"
//               value={newRoom.room_img_url}
//               onChange={(e) => setNewRoom({ ...newRoom, room_img_url: e.target.value })}
//               placeholder="이미지 URL을 입력하세요"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           {/* 호텔 ID 입력 */}
//           <div>
//             <label className="block text-sm font-medium">호텔 ID</label>
//             <input
//               type="text"
//               value={newRoom.hotel_id}
//               onChange={(e) => setNewRoom({ ...newRoom, hotel_id: e.target.value })}
//               placeholder="호텔 ID를 입력하세요"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <button
//             onClick={handleAddRoom}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             객실 추가
//           </button>
//           {/* 성공/오류 메시지 출력 */}
//           {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </div>
//       </div>
//       {/* 객실 목록 표시 */}
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
//                   <img
//                     src={room.room_img_url}
//                     alt="Room"
//                     className="w-16 h-16 object-cover rounded"
//                   />
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
