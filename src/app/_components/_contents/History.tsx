'use client';

import { useHotels } from "@/hooks/useHotels";
  
import RecommendSkeletonUI from "./_skeletonUI/RecommedSkeletonUI";

const History = () => {
  // React Query 훅 사용
  const { data: hotels, isLoading, isError, error } = useHotels();

  // 로딩 중 상태 처리
  if (isLoading) {
    return <RecommendSkeletonUI />;
  }

  // 오류 발생 시 처리
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <section className="w-full max-w-[1300px] px-[50px] pt-[80px] pb-[120px] mx-auto h-[748px]">
      <h3 className="text-[24px] font-semibold">최근 본 호텔 상품</h3>

      {/* 슬라이드로 구현될 예정 */}

      <div className="w-full max-w-[1200px] mx-auto h-[484px] flex flex-row justify-center items-center gap-8 mt-8 border-2 border-[#221A1A]">
        <p className="text-center text-[20px] text-[#636363] leading-[1.5]">
          뭘 보여달라는건가요? <br />
          고객님께서는 최근에 본 상품 기록이 없으신데요?
        </p>
      </div>
    </section>
  );
};

export default History;
