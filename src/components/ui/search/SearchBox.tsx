'use client';

import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { useRouter } from 'next/navigation';

import useSearchStore from '@/store/useSearchStore';

import generateUrl from '@/utils/calculator/urlHelpers';

import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';

import LocationModal from './location/LocationModal';
import DurationModal from './duration/DurationModal';
import DetailsModal from './details/DetailsModal';

import HiSearchIcon from '../icon/HiSearchIcon';
import useSearchHistoryStore from '@/store/useSearchHistoryStore';

const SearchBox = () => {
  const [tab, setTab] = useState<'date' | 'flexible'>('date'); // 탭 상태
  const { location, checkIn, checkOut, details, stay, month, setLocation } = useSearchStore();
  const [isSticky, setIsSticky] = useState(false); // 스크롤 상태 관리
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [activeModal, setActiveModal] = useState<'location' | 'duration' | 'details' | null>(null); // 모달 상태

  const modalRef = useRef<HTMLDivElement>(null);

  const router = useRouter(); // Next.js의 useRouter 훅

  // 모달 열기
  const openModal = (modal: 'location' | 'duration' | 'details') => {
    setActiveModal(modal);
  };

  // 모달 닫기
  const closeModal = () => {
    setActiveModal(null);
  };

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const sticky = !entry.isIntersecting; // 요소가 화면에서 벗어나면 sticky 상태로 변경
        setIsSticky(sticky);
        setActiveModal(null); // Sticky 상태가 활성화되면 모달 닫기
      },
      { threshold: 0.5 } // 요소가 50% 화면에 보일 때 기준
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
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

  const handleSearchClick = async () => {
    // const { location } = useSearchStore.getState();
    if (location) {
      useSearchHistoryStore.getState().addHistory(location);
    }

    const searchUrl = generateUrl({ location, checkIn, checkOut, stay, month, details }); // URL 생성
    await router.push(searchUrl); // 페이지 이동
    closeModal();
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 엔터 키 동작 방지
      handleSearchClick(); // 검색 함수 실행
    }
  };

  return (
    <>
      {/* 감지 기준이 될 타겟 요소 */}

      <div ref={targetRef} style={{ height: '20px', background: 'none' }} className="absolute top-[300px]"></div>

      {isSticky ? (
        <ScrollSearchBox tab={tab} setTab={setTab} />
      ) : (
        <div className="w-full max-w-[1300px] h-full mx-auto px-[50px] -mt-[210px]">
          {/* 🔹 모달이 열리면 딤드(배경 오버레이) 추가 */}
          {activeModal && (
            <div
              className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-40"
              onClick={closeModal} // 딤드 클릭 시 모달 닫기
            />
          )}

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
                  onKeyDown={handleKeyDownEnter}
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
                {tab === 'date' ? (
                  <>
                    <div className="w-1/2 h-full">
                      <p className="text-[15px] text-[#636363] font-medium">체크인</p>
                      <span className="text-[16px] text-[#A0A0A0] font-medium">{checkIn || `기간 선택`}</span>
                    </div>
                    <div className="w-1/2 h-full px-[16px]">
                      <p className="text-[15px] text-[#636363] font-medium">체크아웃</p>
                      <span className="text-[16px] text-[#A0A0A0] font-medium">{checkOut || `기간 선택`}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 h-full">
                      <p className="text-[15px] text-[#636363] font-medium">숙박 기간</p>
                      <span className="text-[16px] text-[#A0A0A0] font-medium">
                        {stay ? `숙박 옵션: ${stay}박` : `기간 선택`}
                      </span>
                    </div>
                    <div className="w-1/2 h-full px-[16px]">
                      <p className="text-[15px] text-[#636363] font-medium">여행 시기</p>
                      <span className="text-[16px] text-[#A0A0A0] font-medium">
                        {month ? `숙박 월 : ${month}월` : `기간 선택`}
                      </span>
                    </div>
                  </>
                )}
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
              <button
                onClick={handleSearchClick}
                className="w-[11%] max-w-[124px] h-full flex flex-row justify-center items-center bg-[#B3916A] text-white text-[20px] text-center font-semibold rounded-[8px] outline-none hover:bg-[#8F7455] active:bg-[#6B573F] disabled:bg-[#EFEFEF] disabled:text-[#BFBFBF] transition duration-200"
              >
                <div>
                  <HiSearchIcon className="inline-block w-6 h-6 -ml-1 mr-1 fill-white" />
                  검색
                </div>
              </button>
            </div>

            {/* 모달 */}
            {activeModal === 'location' && (
              <div ref={modalRef}>
                <LocationModal onClose={() => setActiveModal(null)} />
              </div>
            )}
            {activeModal === 'duration' && (
              <div ref={modalRef}>
                <DurationModal tab={tab} setTab={setTab} onClose={() => setActiveModal(null)} />
              </div>
            )}
            {activeModal === 'details' && (
              <div ref={modalRef}>
                <DetailsModal onClose={() => setActiveModal(null)} />
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default SearchBox;
