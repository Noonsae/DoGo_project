'use client';

import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { HiSearch } from 'react-icons/hi';

import Link from 'next/link';

import useSearchStore from '@/store/useSearchStore';

import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';

import LocationModal from './LocationModal';
import DurationModal from './DurationModal';
import DetailsModal from './DetailsModal';

const SearchBox = () => {
  const { location, checkIn, checkOut, details, setLocation, setCheckIn, setCheckOut, setDetails } = useSearchStore();

  const [isSticky, setIsSticky] = useState(false); // 스크롤 상태 관리
  const [activeModal, setActiveModal] = useState<'location' | 'duration' | 'details' | null>(null); // 모달 상태

  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 열기
  const openModal = (modal: 'location' | 'duration' | 'details') => {
    setActiveModal(modal);
  };

  // 모달 닫기
  const closeModal = () => {
    setActiveModal(null);
    console.log('Modal closed, activeModal:', activeModal);
  };

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 외부 클릭 감지 핸들러
  useClickAway(
    modalRef,
    (event) => {
      const clickedElement = event.target as HTMLElement;

      // 현재 활성화된 모달만 처리
      if (clickedElement.closest('.modal-content')) {
        if (activeModal === 'location' && clickedElement.closest('.modal-location')) return;
        if (activeModal === 'duration' && clickedElement.closest('.modal-duration')) return;
        if (activeModal === 'details' && clickedElement.closest('.modal-details')) return;
      }

      closeModal();
    },
    ['mousedown', 'touchstart']
  );

  return (
    <>
      {isSticky ? (
        <ScrollSearchBox />
      ) : (
        <div className="w-full max-w-[1300px] h-full mx-auto px-[50px] -mt-[210px]">
          <section className="w-full max-w-[1200px] h-[160px] mx-auto px-[32px] py-[24px] rounded-[8px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
            <p className="text-[20px] font-semibold mb-[16px]">숙소 검색</p>

            <div className="w-full h-[68px] flex flex-row gap-3 rounded-[8px]">
              {/* 여행지 검색 */}
              <label
                onClick={() => openModal('location')}
                className={`block w-[25%] max-w-[288px] h-full px-[16px] py-[12px] border rounded-[8px] cursor-pointer ${
                  activeModal === 'location' ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
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
                onClick={() => openModal('duration')}
                className={`w-[35%] max-w-[400px] h-full flex flex-row px-[16px] py-[12px] border rounded-[8px] cursor-pointer ${
                  activeModal === 'duration' ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
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
                onClick={() => openModal('details')}
                className={`w-[25%] max-w-[288px] h-full px-[16px] py-[12px] border rounded-[8px] ${
                  activeModal === 'details' ? 'border-[#B3916A]' : 'border-[#BFBFBF]'
                }`}
              >
                <p className="max-w-[272px] text-[15px] text-[#636363] font-medium">객실 및 인원</p>
                <p className="max-w-[272px] text-[16px] text-[#A0A0A0] font-medium truncate">
                  {details || '객실 및 인원 추가'}
                </p>
              </div>

              {/* 검색 버튼 */}
              <Link
                href="/hotel-list"
                className="w-[11%] max-w-[124px] h-full flex flex-row justify-center items-center bg-[#B3916A] text-white text-[20px] text-center font-semibold rounded-[8px] outline-none hover:bg-[#8F7455] active:bg-[#6B573F] disabled:bg-[#EFEFEF] disabled:text-[#BFBFBF] transition duration-200"
              >
                <HiSearch className="inline-block w-[24px] h-[24px] -ml-[1px] mr-[4%] fill-white" />
                검색
              </Link>
            </div>

            {/* 모달 */}
            {activeModal === 'location' && (
              <div ref={modalRef}>
                <LocationModal onSelectLocation={setLocation} />
              </div>
            )}
            {activeModal === 'duration' && (
              <div ref={modalRef}>
                <DurationModal />
              </div>
            )}
            {activeModal === 'details' && (
              <div ref={modalRef}>
                <DetailsModal />
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default SearchBox;
