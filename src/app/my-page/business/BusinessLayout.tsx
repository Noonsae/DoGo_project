// layout.tsx

import BusinessSidebar from '../_components/BusinessSidebar';

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  // 필수 props 정의
  const userId = 'example-user-id'; // 실제 userId 값을 여기에 할당
  const currentTab = 'default-tab'; // 기본 선택된 탭 이름

  return (
    <div>
      <aside>
        <BusinessSidebar userId={userId} currentTab={currentTab} setCurrentTab={(tab: string) => console.log(tab)} />
      </aside>
      <main className="flex-1 p-6 overflow-auto ml-64 bg-gray-50">{children}</main>
    </div>
  );
};

export default BusinessLayout;
