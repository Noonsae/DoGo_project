// import React, { useEffect, useState } from 'react';
// import { browserSupabase } from '@/supabase/supabase-client';

// const PolicyManagement: React.FC = () => {
//   const [policies, setPolicies] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPolicies = async () => {
//       const { data, error } = await browserSupabase.from('policies').select('*');
//       if (error) console.error(error);
//       setPolicies(data || []);
//       setLoading(false);
//     };

//     fetchPolicies();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">정책 관리</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {policies.map((policy) => (
//             <li key={policy.id} className="p-4 border rounded">
//               <p>{policy.name}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PolicyManagement;
