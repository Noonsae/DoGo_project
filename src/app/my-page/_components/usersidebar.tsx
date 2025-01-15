'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client';

interface UserSidebarProps {
  userId: string; // 사용자 ID
  currentTab: string; // 현재 활성화된 탭 이름
  setCurrentTab: (tab: string) => void; // 탭 변경 함수
}

// const UserSidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, userId }) => {
//   // 상태 선언
//   const [userName, setUserName] = useState<string | null>(null); // 사용자 이름
//   const [createdAt, setCreatedAt] = useState<string | null>(null); // 사용자 가입일
//   const [loading, setLoading] = useState(true); // 로딩 상태

//   // 사용자 데이터를 가져오는 함수
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Supabase 쿼리를 사용해 `users` 테이블에서 사용자 데이터를 가져옵니다.
//         const { data, error } = await browserSupabase()
//           .from('users') // `users` 테이블을 대상으로
//           .select('user_name, created_at') // `user_name`과 `created_at` 필드만 가져옵니다.
//           .eq('id', userId) // 조건: `id`가 `userId`와 동일
//           .single(); // 단일 결과만 반환

//         if (error) throw error; // 에러 발생 시 예외 처리

//         // 상태 업데이트
//         setUserName(data?.user_name || 'Unknown'); // 이름 설정, 기본값은 'Unknown'
//         setCreatedAt(data?.created_at || null); // 가입일 설정
//       } catch (err) {
//         console.error('Error fetching user data:', err); // 콘솔에 에러 메시지 출력
//       } finally {
//         setLoading(false); // 로딩 완료
//       }
//     };

//     fetchUserData(); // 함수 호출
//   }, [userId]); // `userId`가 변경될 때마다 실행

//   // 로딩 중인 경우 로딩 메시지 출력
//   if (loading) {
//     return <p className="text-center text-gray-600">Loading...</p>;
//   }

//   return (
//     <aside className="w-64 bg-gray-100 p-4">
//       {/* 사용자 정보 표시 */}
//       <div className="mb-4">
//         <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
//         <p className="text-center mt-2 font-bold">{userName}</p>
//         <p className="text-center text-sm text-gray-600">
//           가입일: {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
//         </p>
//       </div>

//       {/* 메뉴 목록 */}
//       <ul>
//         {/* 프로필 관리 메뉴 */}
//         <li
//           className={`p-2 cursor-pointer ${
//             currentTab === 'profile' ? 'bg-gray-200' : ''
//           }`}
//           onClick={() => setCurrentTab('profile')} // 탭 변경
//         >
//           프로필 관리
//         </li>

//         {/* 예약 목록 메뉴 */}
//         <li
//           className={`p-2 cursor-pointer ${
//             currentTab === 'bookings' ? 'bg-gray-200' : ''
//           }`}
//           onClick={() => setCurrentTab('bookings')} // 탭 변경
//         >
//           예약 목록
//         </li>

//         {/* 찜 목록 메뉴 */}
//         <li
//           className={`p-2 cursor-pointer ${
//             currentTab === 'favorites' ? 'bg-gray-200' : ''
//           }`}
//           onClick={() => setCurrentTab('favorites')} // 탭 변경
//         >
//           찜 목록
//         </li>

//         {/* 작성한 후기 메뉴 */}
//         <li
//           className={`p-2 cursor-pointer ${
//             currentTab === 'reviews' ? 'bg-gray-200' : ''
//           }`}
//           onClick={() => setCurrentTab('reviews')} // 탭 변경
//         >
//           작성한 후기
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default UserSidebar;
