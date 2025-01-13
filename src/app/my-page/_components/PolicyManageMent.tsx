// 'use client';

// import React, { useState, useEffect } from 'react';
// import { browserSupabase } from '@/supabase/supabase-client';

// // 정책 데이터를 나타내는 인터페이스 정의
// interface Policy {
//   id: string; // 정책 ID
//   policy_name: string; // 정책 이름
//   description?: string; // 정책 설명 (nullable)
//   hotel_id?: string; // 관련된 호텔 ID (nullable)
//   created_at: string; // 정책 생성 날짜
// }

// // 새로운 정책 데이터를 나타내는 타입
// interface NewPolicy {
//   policy_name: string;
//   description?: string;
//   hotel_id?: string;
// }

// // Props 타입 정의
// interface PolicyManagementProps {
//   userId: string; // 사용자 ID
// }

// // PolicyManagement 컴포넌트
// const PolicyManagement: React.FC<PolicyManagementProps> = ({ userId }) => {
//   // 상태 정의
//   const [policies, setPolicies] = useState<Policy[]>([]); // 정책 리스트
//   const [newPolicy, setNewPolicy] = useState<NewPolicy>({
//     policy_name: '',
//     description: undefined,
//     hotel_id: undefined,
//   });
//   const [loading, setLoading] = useState(true); // 로딩 상태
//   const [error, setError] = useState<string | null>(null); // 에러 메시지 상태
//   const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지 상태

//   // 정책 데이터를 가져오는 함수
//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         const { data, error } = await browserSupabase()
//           .from('policies')
//           .select('id, policy_name, description, hotel_id, created_at')
//           .eq('user_id', userId); // 사용자 ID에 맞는 데이터 필터링

//         if (error) throw error;

//         setPolicies(data || []);
//       } catch (err) {
//         console.error('Error fetching policies:', err);
//         setError('정책 데이터를 불러오는 중 오류가 발생했습니다.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPolicies();
//   }, [userId]); // 사용자 ID 변경 시 다시 호출

//   // 새로운 정책 추가 함수
//   const handleAddPolicy = async () => {
//     try {
//       setSuccessMessage(null);
//       setError(null);

//       const { error } = await browserSupabase().from('policies').insert([
//         {
//           policy_name: newPolicy.policy_name,
//           description: newPolicy.description,
//           hotel_id: newPolicy.hotel_id,
//           user_id: userId, // 사용자 ID 추가
//         },
//       ]);

//       if (error) throw error;

//       setSuccessMessage('정책이 성공적으로 추가되었습니다.');
//       setNewPolicy({ policy_name: '', description: undefined, hotel_id: undefined });

//       // 새 데이터를 다시 가져오기
//       const { data } = await browserSupabase()
//         .from('policies')
//         .select('id, policy_name, description, hotel_id, created_at')
//         .eq('user_id', userId);

//       setPolicies(data || []);
//     } catch (err) {
//       console.error('Error adding policy:', err);
//       setError('정책 추가 중 오류가 발생했습니다.');
//     }
//   };

//   // 로딩 중일 때 표시
//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;

//   // 에러 발생 시 표시
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">정책 관리 페이지 - 사용자 ID: {userId}</h2>
//       <div className="mb-6">
//         <h3 className="text-lg font-semibold mb-2">새 정책 추가</h3>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">정책 이름</label>
//             <input
//               type="text"
//               value={newPolicy.policy_name}
//               onChange={(e) => setNewPolicy({ ...newPolicy, policy_name: e.target.value })}
//               placeholder="정책 이름을 입력하세요"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">정책 설명</label>
//             <textarea
//               value={newPolicy.description || ''}
//               onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value || undefined })}
//               placeholder="정책 설명을 입력하세요"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             ></textarea>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">호텔 ID</label>
//             <input
//               type="text"
//               value={newPolicy.hotel_id || ''}
//               onChange={(e) => setNewPolicy({ ...newPolicy, hotel_id: e.target.value || undefined })}
//               placeholder="관련 호텔 ID를 입력하세요"
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <button
//             onClick={handleAddPolicy}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             정책 추가
//           </button>
//           {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </div>
//       </div>
//       <h3 className="text-lg font-semibold mb-2">정책 목록</h3>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border p-2">정책 이름</th>
//             <th className="border p-2">설명</th>
//             <th className="border p-2">호텔 ID</th>
//             <th className="border p-2">등록일</th>
//           </tr>
//         </thead>
//         <tbody>
//           {policies.map((policy) => (
//             <tr key={policy.id}>
//               <td className="border p-2">{policy.policy_name}</td>
//               <td className="border p-2">{policy.description || 'N/A'}</td>
//               <td className="border p-2">{policy.hotel_id || 'N/A'}</td>
//               <td className="border p-2">{new Date(policy.created_at).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PolicyManagement;
