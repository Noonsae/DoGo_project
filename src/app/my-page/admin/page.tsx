// "use client"
// import React, { useState } from 'react';
// import AdminSidebar from '@/my-page/_components/AdminSidebar';
// import CompanyList from '@/my-page/_components/CompanyList';
// import CooperationRequests from '@/my-page/_components/CooperationRequests';
// import BookingList from '@/my-page/_components/BookingList';

// const AdminPage: React.FC = () => {
//   const [currentTab, setCurrentTab] = useState('company');

//   const renderContent = () => {
//     switch (currentTab) {
//       case 'company':
//         return <CompanyList />;
//       case 'requests':
//         return <CooperationRequests />;
//       case 'bookings':
//         return <BookingList />;
//       default:
//         return <p className="text-center text-gray-600">유효한 메뉴를 선택하세요.</p>;
//     }
//   };

//   return (
//     <div className="flex">
//       {/* 사이드바 */}
//       <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

//       {/* 메인 콘텐츠 */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4">관리자 페이지</h1>
//         {renderContent()}
//       </main>
//     </div>
//   );
// };

// export default AdminPage;
