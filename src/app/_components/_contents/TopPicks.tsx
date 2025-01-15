'use client';

import { useHotels } from '@/hooks/useHotels';
import Image from 'next/image';

const TopPicks = () => {
  // React Query 훅 사용
  const { data: hotels, isLoading, isError, error } = useHotels();

  // 로딩 중 상태 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 오류 발생 시 처리
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // 데이터 렌더링
  return (
    <section className="w-full max-w-[1200px] mx-auto h-[828px] py-[80px] pb-[120px]">
      <h2 className="text-[24px] font-semibold">이런 상품은 어떠세요? /title</h2>
      <p className="text-[18px] font-normal">최근 본 호텔과 비슷한 분위기의 호텔을 추천해 드릴게요. /subtittle</p>

      {/* 버튼 wrap */}
      <div className="flex flex-row gap-2">
        <button
          type="button"
          className="w-[80px] h-[44px] mr-[12px] mt-[28px] bg-[#7c7c7c] border border-[#CDCDCD] rounded-[8px] text-white text-[18px] font-semibold"
        >
          전체
        </button>
        <button
          type="button"
          className="w-[80px] h-[44px] mr-[12px] mt-[28px] border border-[#CDCDCD] rounded-[8px] text-[18px] font-normal"
        >
          서울
        </button>
        <button
          type="button"
          className="w-[80px] h-[44px] mr-[12px] mt-[28px] border border-[#CDCDCD] rounded-[8px] text-[18px] font-normal-regular"
        >
          부산
        </button>
        <button
          type="button"
          className="w-[80px] h-[44px] mr-[12px] mt-[28px] border border-[#CDCDCD] rounded-[8px] text-[18px] font-normal"
        >
          제주도
        </button>
      </div>

      <div className="w-full h-[472px] overflow-hidden flex flex-row flex-wrap justify-between items-center gap-8 mt-8">
        {hotels?.map((hotel) => (
          <div
            key={hotel.id}
            className="w-[348px] h-[470px] p-[16px] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]"
          >
            <Image
              src={hotel.main_img_url || ''}
              width={348}
              height={282}
              alt={'호텔 메인 이미지'}
              className="w-full h-[282px] rounded-[12px]"
            />
            <h3 className="mt-[12px]">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.address}</p>

            <p className="mt-[11px] text-[#D9D9D9]">
              ⭐ {hotel.stars}
              <span className="text-[#9E9E9E]"> (3,222) </span>
            </p>
            <p className="w-full mt-[24px] text-right text-[24px]-black font-semibold">
              <span className="text-base text-[#5b5b5b] font-medium mr-1">Sale%</span>
              
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopPicks;
