'use client';

import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { HiSearch } from 'react-icons/hi';
import LocationModal from './LocationModal';

const ScrollSearchBox = () => {
  const [isSearchBoxClicked, setIsSearchBoxClicked] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>(''); // 선택된 location 상태
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null); // 모달 영역 참조

  // onSelectLocation 함수 정의
  const handleSelectLocation = (label: string) => {
    setSelectedLocation(label); // 선택된 location 업데이트
    setIsSearchBoxClicked(false); // 모달 닫기
  };

  // SearchBox 클릭 이벤트
  const clickSearchBox = () => {
    console.log('서치박스를 선택한 상태입니다.');
    setIsSearchBoxClicked(true);
  };

  // 외부 클릭 감지하기
  useClickAway(
    searchBoxRef,
    (event) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        // 모달을 클릭한 경우 해제하지 않음
        return;
      }
      console.log('서치박스 선택이 해제되었습니다.');
      setIsSearchBoxClicked(false);
    },
    ['mousedown', 'touchstart'] // 클릭 이벤트 감지
  );

  return (
    <>
      <div
        ref={searchBoxRef}
        onClick={clickSearchBox}
        className={`fixed left-0 top-[76px] w-full flex items-center bg-white border-b border-[#bfbfbf] z-50 ${
          isSearchBoxClicked ? 'h-[116px] py-6' : 'h-[72px] py-3'
        }`}
      >
        <div
          className={`w-full max-w-[1200px] mx-auto px-8 flex flex-row items-center justify-center gap-3 ${
            isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'
          }`}
        >
          <form method="POST">
            <label
              htmlFor="search"
              className={`w-[288px] max-w-[288px] flex flex-col items-start p-3 outline outline-[1px] outline-[#BFBFBF] rounded-[8px] cursor-pointer ${
                isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'
              }`}
            >
              {isSearchBoxClicked && <p className="text-[15px] text-[#777]">여행지</p>}
              <input
                id="search"
                type="text"
                value={selectedLocation} // 선택된 location.label 값
                className="text-base text-[#777] leading-[1.45] bg-none outline-none"
                placeholder={`여행지를 입력해주세요.`}
              />
            </label>
          </form>

          <div
            className={`w-[400px] max-w-[400px] flex flex-row justify-between items-center px-3 border border-[#BFBFBF] rounded-[8px] cursor-pointer ${
              isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'
            }`}
          >
            <div className={`w-1/2 py-2 items-center`}>
              {/* check_in 상태를 text로 나타냄.*/}
              <p className="text-[15px] text-[#777]">체크인</p>
              {isSearchBoxClicked && <p className="text-base text-[#444]">체크인 날짜 선택</p>}
            </div>
            <div className="w-1/2 py-2 items-center">
              {/* check_out 상태를 text로 나타냄.*/}
              <p className="text-[15px] text-[#777]">체크아웃</p>
              {isSearchBoxClicked && <p className="text-base text-[#444]">체크아웃 날짜 선택</p>}
            </div>
          </div>

          <div
            className={`w-[288px] max-w-[288px] flex flex-col justify-center px-3 border border-[#BFBFBF] rounded-[8px] cursor-pointer ${
              isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'
            }`}
          >
            <p className="text-[15px] text-[#777]">세부정보</p>
            {isSearchBoxClicked && <p className="text-base text-[#444]">객실 및 인원 추가</p>}
          </div>

          <button
            type="submit"
            className={`w-[124px] flex flex-row items-center justify-center gap-1 bg-[#B3916A] rounded-[8px] text-white ${
              isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'
            }`}
          >
            <HiSearch className="w-[24px] h-[24px]" />
            <p className="text-[20px] font-semibold">검색</p>
          </button>
        </div>

        {isSearchBoxClicked && <LocationModal onSelectLocation={handleSelectLocation} />}
      </div>
      {isSearchBoxClicked && (
        <div className="fixed left-0 top-[192px] inset-0 w-full h-[calc(100vh-192px)] bg-black bg-opacity-40 z-30"></div>
      )}
    </>
  );
};

export default ScrollSearchBox;
