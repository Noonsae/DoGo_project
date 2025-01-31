import { useState } from 'react';
import UserSidebar from '../_components/UserSidebar';

const UserLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="flex h-screen translate-y-20">
      {/* 사이드바 */}
      <aside className="w-64 bg-gray-100 fixed top-0 left-0 h-screen overflow-auto shadow-md">
        <UserSidebar />
      </aside>
      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-64 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default UserLayout;
