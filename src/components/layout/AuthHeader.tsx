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
    <div className="bg-white px-[20px] py-[12px] sm:px-[20px] sm:py-[12px]">
      <button onClick={handleBack}>
        <GoBackIcon />
      </button>
    </div>
  );
}
