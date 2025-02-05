'use client';

import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { useRouter } from 'next/navigation';

import useSearchStore from '@/store/useSearchStore';

import generateUrl from '@/utils/urlHelpers';

import LocationModal from './location/LocationModal';
import DurationModal from './duration/DurationModal';
import DetailsModal from './details/DetailsModal';
import HiSearchIcon from '../icon/HiSearchIcon';
import useSearchHistoryStore from '@/store/useSearchHistoryStore';

const ScrollSearchBox = () => {
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

  const handleSearchClick = async () => {
    const { location } = useSearchStore.getState();
    if (location) {
      useSearchHistoryStore.getState().addHistory(location);
    }
    setLocation('');
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
              {isSearchBoxClicked && <p className="text-[15px] text-[#777]">숙박 기간</p>}
              <p className="text-base text-[#444]">{checkIn ? checkIn : stay || '기간 선택'}</p>
            </div>
            <div className="w-1/2 py-2 items-center">
              {/* check_out 상태를 text로 나타냄.*/}
              {isSearchBoxClicked && <p className="text-[15px] text-[#777]">여행 시기</p>}

              <p className="text-base text-[#444]">{checkOut ? checkOut : month || '기간 선택'}</p>
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
        {activeModal === 'location' && <LocationModal onClose={() => setActiveModal(null)} />}

        {activeModal === 'duration' && <DurationModal onClose={() => setActiveModal(null)} />}

        {activeModal === 'details' && <DetailsModal onClose={() => setActiveModal(null)} />}
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
