import { useState } from 'react';
import UserSidebar from '../_components/UserSidebar';

const UserLayout = ({ children }: { children: React.ReactElement }) => {
  // 필요한 상태 정의
  const [currentTab, setCurrentTab] = useState('default-tab'); // 현재 탭 관리
  const userId = 'example-user-id'; // 실제 유저 ID를 여기에 할당 (동적이라면 API나 상태 관리에서 가져오기)

  return (
    <div className="flex h-screen translate-y-20">
      {/* 사이드바 */}
      <aside className="w-64 bg-gray-100 fixed top-0 left-0 h-screen overflow-auto shadow-md">
        {/* UserSidebar에 필요한 props 전달 */}
        <UserSidebar userId={userId} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-64 p-6 overflow-auto">{children}</main>
    </div>
  );
}

export default UserLayout