import Header from '@/components/layout/Header';
import HotelListHeader from '@/components/layout/HotelListHeader';

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ✅ 모바일에서는 흰색 AuthHeader.tsx, 데스크탑에서는 기존 Header.tsx 유지 */}
      <div className="md:hidden">
        <HotelListHeader />
      </div>
      <div className="hidden md:block">
        <Header />
      </div>
      <main>{children}</main>
    </>
  );
}
