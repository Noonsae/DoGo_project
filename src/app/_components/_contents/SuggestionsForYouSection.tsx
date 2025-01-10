import React from 'react';

const SuggestionsForYouSection = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto h-[828px] py-[80px] pb-[120px]">
      <h3 className="text-[24px] font-semibold">이런 상품은 어떠세요? /title</h3>
      <p className="text-[18px] font-normal">최근 본 호텔과 비슷한 분위기의 호텔을 추천해 드릴게요. /subtittle</p>

      {/* 슬라이드로 구현될 예정 */}
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
          className="w-[80px] h-[44px] mr-[12px] mt-[28px] border border-[#CDCDCD] rounded-[8px] text-[18px] font-normal"
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

      <div className="flex flex-row justify-between items-center gap-8 mt-8">
        <div className="p-[16px] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
          <div className="w-[348px] h-[282px] py-[130px] bg-[#F4F4F4] rounded-[12px] text-center">(이미지영역)</div>
          <h4 className="mt-[12px]">Title</h4>
          <p>광주광역시 서구 유촌동</p>
          <p className="mt-[11px]">
            <span className="text-[#D9D9D9]">★</span>
            4.8
            <span className="text-[#9E9E9E]"> (3,222) </span>
          </p>
          <p className="w-full mt-[24px] text-right text-[24px]-black font-semibold">
            <span className="text-base text-[#5b5b5b] font-medium mr-1">Sale%</span>
            192,000원
          </p>
        </div>

        <div className="p-[16px] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
          <div className="w-[348px] h-[282px] py-[130px] bg-[#F4F4F4] rounded-[12px] text-center">(이미지영역)</div>
          <h4 className="mt-[12px]">Title</h4>
          <p>광주광역시 서구 유촌동</p>
          <p className="mt-[11px]">
            <span className="text-[#D9D9D9]">★</span>
            4.8
            <span className="text-[#9E9E9E]"> (3,222) </span>
          </p>
          <p className="w-full mt-[24px] text-right text-[24px]-black font-semibold">
            <span className="text-base text-[#5b5b5b] font-medium mr-1">Sale%</span>
            192,000원
          </p>
        </div>

        <div className="p-[16px] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
          <div className="w-[348px] h-[282px] py-[130px] bg-[#F4F4F4] rounded-[12px] text-center">(이미지영역)</div>
          <h4 className="mt-[12px]">Title</h4>
          <p>광주광역시 서구 유촌동</p>
          <p className="mt-[11px]">
            <span className="text-[#D9D9D9]">★</span>
            4.8
            <span className="text-[#9E9E9E]"> (3,222) </span>
          </p>
          <p className="w-full mt-[24px] text-right text-[24px]-black font-semibold">
            <span className="text-base text-[#5b5b5b] font-medium mr-1">Sale%</span>
            192,000원
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuggestionsForYouSection;
