// "use client"
// import React, { useState } from 'react';
// import SidebarWrapper from '@/app/my-page/_components/SidebarWrapper';
// import HotelManagement from '@/app/my-page/_components/HotelManagement';
// import PolicyManagement from '@/app/my-page/_components/PolicyManagement';
// import RoomManagement from '@/app/my-page/_components/RoomManagement';
// import BookingManagement from '@/app/my-page/_components/BookingManagement';
// import InquiryManagement from '@/app/my-page/_components/InquiryManagement';
// import ProfileManagement from '@/app/my-page/_components/ProfileManagement';

// const BusinessPage = ({ userId }: { userId: string }) => {
//   const [currentTab, setCurrentTab] = useState('hotel'); // 기본 탭 설정

//   const renderContent = () => {
//     switch (currentTab) {
//       case 'hotel':
//         return <HotelManagement userId={userId} />;
//       case 'policy':
//         return <PolicyManagement userId={userId} />;
//       case 'room':
//         return <RoomManagement userId={userId} />;
//       case 'booking':
//         return <BookingManagement userId={userId} />;
//       case 'inquiry':
//         return <InquiryManagement userId={userId} />;
//       case 'profile':
//         return <ProfileManagement userId={userId} />;
//       default:
//         return <p className="text-center text-gray-600">유효한 메뉴를 선택하세요.</p>;
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar Wrapper */}
//       <SidebarWrapper userId={userId} currentTab={currentTab} setCurrentTab={setCurrentTab} />

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4">사업자 페이지</h1>
//         {renderContent()}
//       </main>
//     </div>
//   );
// };

// export default BusinessPage;
