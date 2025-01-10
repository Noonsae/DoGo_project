//사업자용 마이페이지
// import React, { useState } from 'react';
// import SidebarWrapper from '@/app/my-page/_components/SidebarWrapper' ;

// const BusinessPage = ({ userId }: { userId: string }) => {
//   const [currentTab, setCurrentTab] = useState('hotel'); // 기본 탭 설정

//   return (
//     <div className="flex">
//       {/* Sidebar Wrapper */}
//       <SidebarWrapper userId={userId} currentTab={currentTab} setCurrentTab={setCurrentTab} />

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {currentTab === 'hotel' && <div>호텔 관리 콘텐츠</div>}
//         {currentTab === 'policy' && <div>정책 관리 콘텐츠</div>}
//         {currentTab === 'room' && <div>객실 관리 콘텐츠</div>}
//         {currentTab === 'booking' && <div>예약 관리 콘텐츠</div>}
//         {currentTab === 'inquiry' && <div>문의 관리 콘텐츠</div>}
//         {currentTab === 'profile' && <div>프로필 관리 콘텐츠</div>}
//       </div>
//     </div>
//   );
// };

// export default BusinessPage;
