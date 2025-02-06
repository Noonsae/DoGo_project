'use client';
import { GoBackIcon } from '@/components/ui/icon/GoBackIcon';
import { useRouter } from 'next/navigation';
// ⭐설명: hotel-list에서 쓰일 헤더ui
export default function HotelListHeader() {
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };
  return (
    <div className="bg-white p-4">
      <button onClick={handleBack}>
        <GoBackIcon />
      </button>
    </div>
  );
}
