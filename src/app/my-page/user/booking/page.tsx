import Link from 'next/link';

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <span className="text-[28px] font-normal mb-4">Booking Page</span>
      <p className="text-[32px] font-medium">죄송합니다. 아직 준비 중인 페이지입니다.</p>
      <Link
        href="/"
        className="mt-8 p-4 bg-[#B3916A] rounded-[12px] text-white text-[20px] font-medium hover:bg-[#8F7455] active:bg-[#6B573F]"
      >
        홈페이지로 돌아가기
      </Link>
    </div>
  );
};

export default page;
