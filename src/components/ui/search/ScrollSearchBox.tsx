'use client';

import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { useRouter } from 'next/navigation';

import useSearchStore from '@/store/useSearchStore';

import generateUrl from '@/utils/urlHelpers';

import LocationModal from './LocationModal';
import DurationModal from './DurationModal';
import DetailsModal from './DetailsModal';
import HiSearchIcon from '../icon/HiSearchIcon';

const ScrollSearchBox = () => {
  const [searchUrl, setSearchUrl] = useState<string>('');
  const [isSearchBoxClicked, setIsSearchBoxClicked] = useState(false);
  const [activeModal, setActiveModal] = useState<'location' | 'duration' | 'details' | null>(null); // 모달 상태

  const searchBoxRef = useRef<HTMLDivElement>(null);

  const { location, checkIn, checkOut, details, stay, month, setLocation } = useSearchStore();

  const router = useRouter(); // Next.js의 useRouter 훅

  // 모달 열기
  const openModal = (modal: 'location' | 'duration' | 'details') => {
    setActiveModal(modal);
  };

  // 모달 닫기
  const inactiveSearchBox = () => {
    setActiveModal(null);
    setIsSearchBoxClicked(false); // SearchBox 상태 초기화
  };

  // onSelectLocation 함수 정의
  const handleSelectLocation = (label: string) => {
    setLocation(label); // 선택된 location 업데이트
  };

  // 외부 클릭 감지
  useClickAway(
    searchBoxRef,
    (event) => {
      const clickedElement = event.target as Node;
      if (clickedElement instanceof HTMLElement && clickedElement.closest('.modal-content')) {
        return; // 모달 내부를 클릭한 경우 닫히지 않음
      }
      inactiveSearchBox(); // 모달 닫기
    },
    ['mousedown', 'touchstart']
  );

  const url = generateUrl({ location, checkIn, checkOut, stay, month, details }); // URL 생성

  // 비동기로 전환 후 제대로 작동하는데 이유를 모르겠음;;
  const handleSearchClick = async () => {
    const searchUrl = url;
    await router.push(searchUrl); // 페이지 이동
    inactiveSearchBox();
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 엔터 키 동작 방지
      handleSearchClick(); // 검색 함수 실행
    }
  };

  useEffect(() => {
    setSearchUrl(url); // 의존성 배열에서 searchUrl 제거
  }, [location, stay, month, details]); // 필요한 의존성만 포함

  return (
    <>
      <div
        ref={searchBoxRef}
        onClick={() => setIsSearchBoxClicked(true)}
        className={`fixed left-0 top-[76px] w-full flex items-center bg-white border-b border-[#bfbfbf] z-30 ${
          isSearchBoxClicked ? 'h-[116px] py-6' : 'h-[72px] py-3'
        }`}
      >
        <div
          className={`w-full max-w-[1200px] mx-auto px-8 flex flex-row items-center justify-center gap-3 ${
            isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'
          }`}
        >
          {/* 여행지 */}
          <label
            htmlFor="search"
            onClick={() => openModal('location')}
            className={`w-[288px] max-w-[288px] flex flex-col items-start p-3 outline outline-[1px] outline-[#BFBFBF] rounded-[8px] cursor-pointer ${
              isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'
            } ${activeModal === 'location' ? 'outline-[#B3916A]' : ''}`}
          >
            {isSearchBoxClicked && <p className="text-[15px] text-[#777]">여행지</p>}
            <input
              id="search"
              type="text"
              value={location || ''} // 선택된 location.label 값
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDownEnter}
              className="text-base text-[#777] leading-[1.45] bg-none outline-none"
              placeholder={`여행지를 입력해주세요.`}
            />
          </label>

          {/* 체크인 / 체크아웃 */}
          <div
            onClick={() => openModal('duration')}
            className={`w-[400px] max-w-[400px] flex flex-row justify-between items-center px-3 border border-[#BFBFBF] rounded-[8px] cursor-pointer ${
              activeModal === 'duration' ? 'outline-[#B3916A]' : ''
            } ${isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'}`}
          >
            <div className={`w-1/2 py-2 items-center`}>
              {/* check_in 상태를 text로 나타냄.*/}
              <p className="text-[15px] text-[#777]">체크인</p>
              {isSearchBoxClicked && <p className="text-base text-[#444]">{checkIn || '날짜 추가'}</p>}
            </div>
            <div className="w-1/2 py-2 items-center">
              {/* check_out 상태를 text로 나타냄.*/}
              <p className="text-[15px] text-[#777]">체크아웃</p>
              {isSearchBoxClicked && <p className="text-base text-[#444]">{checkOut || '날짜 추가'}</p>}
            </div>
          </div>

          {/* 세부 정보 */}
          <div
            onClick={() => openModal('details')}
            className={`w-[288px] max-w-[288px] flex flex-col justify-center px-3 border border-[#BFBFBF] rounded-[8px] cursor-pointer ${
              activeModal === 'details' ? 'outline-[#B3916A]' : ''
            } ${isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'}`}
          >
            {isSearchBoxClicked && <p className="text-[15px] text-[#777]">객실 및 인원 추가</p>}
            <p className="text-base text-[#444] truncate">{details || '객실 및 인원 추가'}</p>
          </div>

          <button
            onClick={handleSearchClick}
            className={`w-[124px] flex flex-row items-center justify-center gap-1 bg-[#B3916A] rounded-[8px] text-white ${
              isSearchBoxClicked ? 'h-[68px]' : 'h-[48px]'
            }`}
          >
            <div>
              <HiSearchIcon className="w-6 h-6" />
            </div>
            <p className="text-[20px] font-semibold">검색</p>
          </button>
        </div>
        {activeModal === 'location' && (
          <LocationModal onSelectLocation={handleSelectLocation} left="18.5%" top="180px" />
        )}
        {activeModal === 'duration' && <DurationModal left="36%" top="180px" onClose={() => setActiveModal(null)} />}

        {activeModal === 'details' && <DetailsModal right="20%" top="180px" onClose={() => setActiveModal(null)} />}
      </div>

      {/* Dimmed */}
      {isSearchBoxClicked && (
        <div
          className="fixed left-0 top-[192px] inset-0 w-full h-[calc(100vh-192px)] bg-black bg-opacity-40 z-20"
          onClick={inactiveSearchBox}
        >
          {/* SearchBox가 활성화되면 생성되는 딤드 */}
        </div>
      )}
    </>
  );
};

export default ScrollSearchBox;
