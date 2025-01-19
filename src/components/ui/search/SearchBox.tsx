'use client';

import { useEffect, useRef, useState } from 'react';

import { useClickAway } from 'react-use';

import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';

import DurationModal from './DurationModal';
import LocationModal from './LocationModal';

import { HiSearch } from 'react-icons/hi';

const SearchBox = () => {
  const [location, setLocation] = useState('');
  const [isLabelSearchBoxClicked, setIsLabelSearchBoxClicked] = useState(false);
  const [isStayDurationSearchBoxClicked, setIsStayDurationSearchBoxClicked] = useState(false);
  const [isStayDetailsSearchBoxClicked, setIsStayDetailsSearchBoxClicked] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // 스크롤 상태 관리
  const [selectedLocation, setSelectedLocation] = useState('');
  const clickLabelRef = useRef<HTMLLabelElement>(null);
  const clickStayDurationRef = useRef<HTMLDivElement>(null);
  const clickStayDetailsRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    console.log('Search with:', { location });
    // 검색 로직 추가 (예: 클라이언트 측 API 호출)
  };

  // 라벨 요소를 클릭하면 테두리 색상을 변경
  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLabelSearchBoxClicked(true);
  };

  const handleLocationSelect = (locationLabel: string) => {
    setSelectedLocation(locationLabel);
  };

  // 체크인/체크아웃 박스를 클릭하면 테두리 색상을 변경
  const handleStayDurationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStayDurationSearchBoxClicked(true);
  };

  // 객실 및 인원 박스를 클릭하면 테두리 색상을 변경
  const handleStayDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStayDetailsSearchBoxClicked(true);
  };

  // 외부 클릭 감지
  useClickAway(clickLabelRef, () => {
    setIsLabelSearchBoxClicked(false);
  });

  // 외부 클릭 감지
  useClickAway(clickStayDurationRef, () => {
    setIsStayDurationSearchBoxClicked(false);
  });

  // 외부 클릭 감지
  useClickAway(clickStayDetailsRef, () => {
    setIsStayDetailsSearchBoxClicked(false);
  });

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isSticky ? (
        <>
          <ScrollSearchBox />
          {/* <DurationModal /> */}
          {/* <LocationModal onSelectLocation={handleLocationSelect} /> */}
          {/* <DetailsModal /> */}
        </>
      ) : (
        <div className="w-full max-w-[1300px] h-full mx-auto px-[50px] -mt-[210px]">
          <section className="w-full max-w-[1200px] h-[160px] mx-auto px-[32px] py-[24px] rounded-[8px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
            <p className="text-[20px] font-semibold mb-[16px]">숙소 검색</p>

            <div className="w-full h-[68px] flex flex-row gap-3 rounded-[8px]">
              {/* 여행지 검색 */}
              <label
                onClick={handleLabelClick}
                ref={clickLabelRef}
                className={`block w-[25%] max-w-[288px] h-full px-[16px] py-[12px] border  rounded-[8px] cursor-pointer ${
                  isLabelSearchBoxClicked ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
                }`}
              >
                <span className="text-[15px] text-[#636363] font-medium">여행지</span>
                <input
                  type="text-[16px] text-[#A0A0A0] font-medium"
                  placeholder="여행지 검색"
                  value={selectedLocation}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-none outline-none"
                />
              </label>

              {/* 체크인과 체크아웃 */}
              <div
                onClick={handleStayDurationClick}
                ref={clickStayDurationRef}
                className={`w-[35%] max-w-[400px] h-full flex flex-row px-[16px] py-[12px] border rounded-[8px] cursor-pointer ${
                  isStayDurationSearchBoxClicked ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
                }`}
              >
                <div className="w-1/2 h-full">
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
                ref={clickStayDetailsRef}
                className={`w-[25%] max-w-[288px] h-full px-[16px] py-[12px] border rounded-[8px] ${
                  isStayDetailsSearchBoxClicked ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
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
      )}
    </>
  );
};

export default SearchBox;
