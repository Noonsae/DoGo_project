import BusinessSidebar from '../_components/BusinessSidebar';

export default function layout({ children }: { children: ReactElement }) {
  return (
    <div className="flex h-screen translate-y-20">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 fixed top-0 left-0 h-screen overflow-auto">
        <BusinessSidebar />
      </aside>
      <main className="flex-1 p-6 overflow-auto ml-64 bg-gray-50">{children}</main>
    </div>
  );
}
