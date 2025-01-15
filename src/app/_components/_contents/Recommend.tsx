'use client';

import { useHotels } from '@/hooks/useHotels';

import RecommendSkeletonUI from '../../../components/ui/skeleton/RecommedSkeletonUI';

// import Image from 'next/image';

const Recommend = () => {
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

  // 데이터 렌더링
  return (
    <section className="w-full max-w-[1300px] px-[50px] mx-auto h-[748px] py-[80px] pb-[120px]">
      <h2 className="text-[24px] font-semibold">이런 호텔은 어떠신가요?</h2>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45] mb-[32px]">
        회원님의 리스트를 바탕으로 비슷한 호텔을 추천해 드릴게요.
      </p>

      {/* 슬라이드로 구현될 예정 */}

      <div className="w-full max-w-[1200px] mx-auto h-[484px] flex flex-row justify-center items-center gap-8 mt-8 border-2 border-[#221A1A]">
        <p className="text-center text-[20px] text-[#636363] leading-[1.5]">
          최근에 본 상품이 없으시다니까요? <br /> 제발 뭐라도 좀 보고오시죠?
        </p>
      </div>
    </section>
  );
};

export default Recommend;
