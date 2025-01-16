'use client';

import { useRef, useState } from 'react';

import { useClickAway } from 'react-use';

import { HiSearch } from 'react-icons/hi';

const SearchSection = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [isLabelClicked, setIsLabelClicked] = useState(false);
  const [isStayDurationClicked, setIsStayDurationClicked] = useState(false);
  const [isStayDetailsClicked, setIsStayDetailsClicked] = useState(false);
  const clickLabelRef = useRef<HTMLLabelElement>(null);
  const clickDivRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    console.log('Search with:', { location, checkIn, checkOut, guests });
    // 검색 로직 추가 (예: 클라이언트 측 API 호출)
  };

  // 라벨 요소를 클릭하면 테두리 색상을 변경
  const handleLabelClick = () => {
    setIsLabelClicked(true);
  };

  // 외부 클릭 감지
  useClickAway(clickLabelRef, () => {
    setIsLabelClicked(false);
  });

  // 체크인/체크아웃 박스를 클릭하면 테두리 색상을 변경
  const handleStayDurationClick = () => {
    setIsStayDurationClicked(true);
  };

  // 외부 클릭 감지
  useClickAway(clickDivRef, () => {
    setIsStayDurationClicked(false);
  });

  // 객실 및 인원 박스를 클릭하면 테두리 색상을 변경
  const handleStayDetailsClick = () => {
    setIsStayDetailsClicked(true);
  };

  // 외부 클릭 감지
  useClickAway(clickDivRef, () => {
    setIsStayDetailsClicked(false);
  });

  return (
    <div className="w-full max-w-[1300px] h-full mx-auto px-[50px] -mt-[210px]">
      <section className="w-full max-w-[1200px] h-[160px] mx-auto px-[32px] py-[24px] rounded-[8px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
        <p className="text-[20px] font-semibold mb-[16px]">숙소 검색</p>

        <div className="w-full h-[68px] flex flex-row gap-3 rounded-[8px]">
          {/* 여행지 검색 */}
          <label
            onClick={handleLabelClick}
            ref={clickLabelRef}
            className={`block w-[25%] max-w-[288px] h-full px-[16px] py-[12px] border  rounded-[8px] cursor-pointer ${
              isLabelClicked ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
            }`}
          >
            <span className="text-[15px] text-[#636363] font-medium">여행지</span>
            <input
              type="text-[16px] text-[#A0A0A0] font-medium"
              placeholder="여행지 검색"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border-none outline-none"
            />
          </label>

          {/* 체크인과 체크아웃 */}
          <div
            onClick={handleStayDurationClick}
            ref={clickDivRef}
            className={`w-[35%] max-w-[400px] h-full flex flex-row px-[16px] py-[12px] border border-[#BFBFBF] rounded-[8px] cursor-pointer ${
              isStayDurationClicked ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
            }`}
          >
            <div className="w-1/2 h-full border-r border-[#A0A0A0]">
              <p className="text-[15px] text-[#636363] font-medium">체크인</p>
              <span className="text-[16px] text-[#A0A0A0] font-medium">날짜 추가</span>
            </div>
            <div className="w-1/2 h-full px-[16px]">
              <p className="text-[15px] text-[#636363] font-medium">체크아웃</p>
              <span className="text-[16px] text-[#A0A0A0] font-medium">날짜 추가</span>
            </div>
          </div>

          {/* 객실 및 인원 */}
          <div
            onClick={handleStayDetailsClick}
            ref={clickDivRef}
            className={`w-[25%] max-w-[288px] h-full px-[16px] py-[12px] border border-[#BFBFBF] rounded-[8px] ${
              isStayDetailsClicked ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
            }`}
          >
            <p className="text-[15px] text-[#636363] font-medium">객실 및 인원</p>
            <span className="text-[16px] text-[#A0A0A0] font-medium">객실 및 인원 추가</span>
          </div>

          {/* 검색 버튼 */}
          <button
            onClick={handleSearch}
            className="w-[11%] max-w-[124px] h-full flex flex-row justify-center items-center bg-[#B3916A] text-white text-[20px] text-center font-semibold rounded-[8px] outline-none hover:bg-[#8F7455] active:bg-[#6B573F] disabled:bg-[#EFEFEF] disabled:text-[#BFBFBF] transition duration-200"
          >
            <HiSearch className="inline-block w-[24px] h-[24px] -ml-[1px] mr-[4%] fill-white" />
            검색
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchSection;
