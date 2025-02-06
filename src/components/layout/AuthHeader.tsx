'use client';
import { useRouter } from 'next/navigation';
import { GoBackIcon } from '../ui/icon/GoBackIcon';
// ⭐설명: auth에 쓰인 헤더ui
export default function AuthHeader() {
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
