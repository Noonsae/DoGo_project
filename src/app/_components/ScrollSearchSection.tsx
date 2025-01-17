import { HiSearch } from 'react-icons/hi';

const ScrollSearchSection = () => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 flex flex-row items-center justify-center top-[0px] h-[78px] z-10">
      <div className="flex flex-row items-center w-[708px] h-[44px] p-3 rounded-[8px] bg-[#F4F4F4]">
        <div className="flex flex-row w-[240px] h-full gap-2 border-r border-[#A0A0A0]">
          <HiSearch className="w-6 h-6 text-[#A0A0A0]" />
          <p className="text-base text-[#444] leading-[1.45]">여행지 검색</p>
        </div>

        <div className="w-[204px] h-full px-3 border-r border-[#A0A0A0]">
          <p className="text-base text-[#444]">
            <span className="mr-2">체크인</span>~<span className="ml-2">체크아웃</span>
          </p>
        </div>

        <div className="w-[264px] h-full px-3">
          <p className="text-[#444]">객실 및 인원 추가</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollSearchSection;
