// import React, { useState, useEffect } from 'react';
// import { browserSupabase } from '@/supabase/supabase-client';
// import UserSidebar from './UserSidebar';
// import BusinessSidebar from './BusinessSidebar';

// interface SidebarWrapperProps {
//   userId: string;
//   currentTab: string;
//   setCurrentTab: (tab: string) => void;
// }

// const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ userId, currentTab, setCurrentTab }) => {
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const { data, error } = await browserSupabase
//         .from('users')
//         .select('role')
//         .eq('id', userId)
//         .single();

//       if (error) {
//         console.error('Error fetching user role:', error);
//       } else {
//         setRole(data?.role || null);
//       }
//       setLoading(false);
//     };

//     fetchUserRole();
//   }, [userId]);

//   if (loading) return <p>Loading...</p>;

//   if (role === 'customer') {
//     return <UserSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />;
//   }

//   if (role === 'business') {
//     return <BusinessSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />;
//   }

//   return <p>유효하지 않은 사용자 역할입니다.</p>;
// };

// export default SidebarWrapper;
