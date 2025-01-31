import BusinessSidebar from '../_components/BusinessSidebar';

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen translate-y-20">
      <aside>
        <BusinessSidebar />
      </aside>
      <main className="flex-1 p-6 overflow-auto ml-64 bg-gray-50">{children}</main>
    </div>
  );
};

export default BusinessLayout;
