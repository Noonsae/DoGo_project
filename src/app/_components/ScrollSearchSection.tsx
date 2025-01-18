'use client';

import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { HiSearch } from 'react-icons/hi';

const ScrollSearchSection = () => {
  const [isClicked, setIsClicked] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // SearchBox 클릭이벤트
  const clickSearchBox = () => {
    console.log("서치박스를 선택한 상태입니다.")
    setIsClicked(true)
  };

  // 외부 클릭 감지하기
  useClickAway(searchBoxRef, () => {
    console.log('서치박스 선택이 해제되었습니다.');
    setIsClicked(false);
  });

  return (
    <div
      ref={searchBoxRef}
      onClick={clickSearchBox}
      className={`fixed left-0 top-[76px] w-full flex items-center bg-white border-b border-[#bfbfbf] z-10 ${
        isClicked ? 'h-[116px] py-6' : 'h-[72px] py-3'
      }`}
    >
      <div
        className={`w-full max-w-[1200px] mx-auto px-8 flex flex-row items-center justify-center gap-3 ${
          isClicked ? 'h-[68px]' : 'h-[48px]'
        }`}
      >
        <form method="POST">
          <label
            htmlFor="search"
            className={`w-[288px] max-w-[288px] flex flex-col items-start p-3 outline outline-[1px] outline-[#BFBFBF] rounded-[8px] cursor-pointer ${
              isClicked ? 'h-[68px]' : 'h-[48px]'
            }`}
          >
            {isClicked && <p className="text-[15px] text-[#777]">여행지</p>}
            <input
              id="search"
              type="text"
              className="text-base text-[#777] leading-[1.45] bg-none outline-none"
              placeholder={`여행지를 입력해주세요.`}
            />
          </label>
        </form>

        <div
          className={`w-[400px] max-w-[400px] flex flex-row justify-between items-center px-3 border border-[#BFBFBF] rounded-[8px] cursor-pointer ${
            isClicked ? 'h-[68px]' : 'h-[48px]'
          }`}
        >
          <div className={`w-1/2 py-2 items-center`}>
            {/* check_in 상태를 text로 나타냄.*/}
            <p className="text-[15px] text-[#777]">체크인</p>
            {isClicked && <p className="text-base text-[#444]">체크인 날짜 선택</p>}
          </div>
          <div className="w-1/2 py-2 items-center">
            {/* check_out 상태를 text로 나타냄.*/}
            <p className="text-[15px] text-[#777]">체크아웃</p>
            {isClicked && <p className="text-base text-[#444]">체크아웃 날짜 선택</p>}
          </div>
        </div>

        <div
          className={`w-[288px] max-w-[288px] flex flex-col justify-center px-3 border border-[#BFBFBF] rounded-[8px] cursor-pointer ${
            isClicked ? 'h-[68px]' : 'h-[48px]'
          }`}
        >
          <p className="text-[15px] text-[#777]">세부정보</p>
          {isClicked && <p className="text-base text-[#444]">객실 및 인원 추가</p>}
        </div>

        <button
          type="submit"
          className={`w-[124px] flex flex-row items-center justify-center gap-1 bg-[#B3916A] rounded-[8px] text-white ${
            isClicked ? 'h-[68px]' : 'h-[48px]'
          }`}
        >
          <HiSearch className="w-[24px] h-[24px]" />
          <p className='text-[20px] font-semibold'>검색</p>
        </button>
      </div>
    </div>
  );
};

export default ScrollSearchSection;
