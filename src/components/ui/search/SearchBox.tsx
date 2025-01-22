'use client';

import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { useRouter } from 'next/navigation';

import useSearchStore from '@/store/useSearchStore';

import generateUrl from '@/utils/urlHelpers';

import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';

import LocationModal from './LocationModal';
import DurationModal from './DurationModal';
import DetailsModal from './DetailsModal';

import HiSearchIcon from '../icon/HiSearchIcon';

const SearchBox = () => {
  const [searchUrl, setSearchUrl] = useState<string>('');
  const { location, checkIn, checkOut, details, stay, month, setLocation } = useSearchStore();

  const [isSticky, setIsSticky] = useState(false); // 스크롤 상태 관리
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

  const url = generateUrl({ location, checkIn, checkOut, stay, month, details }); // URL 생성

  // 비동기로 전환 후 제대로 작동하는데 이유를 모르겠음;;
  const handleSearchClick = async () => {
    const searchUrl = url;
    router.push(searchUrl); // 페이지 이동
    closeModal();
  };

  useEffect(() => {
    setSearchUrl(url); // 의존성 배열에서 searchUrl 제거
  }, [location, stay, month, details]); // 필요한 의존성만 포함

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
                  <span className="text-[16px] text-[#A0A0A0] font-medium">{checkIn || `날짜 추가`}</span>
                </div>
                <div className="w-1/2 h-full px-[16px]">
                  <p className="text-[15px] text-[#636363] font-medium">체크아웃</p>
                  <span className="text-[16px] text-[#A0A0A0] font-medium">{checkOut || `날짜 추가`}</span>
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
                <LocationModal onSelectLocation={setLocation} />
              </div>
            )}
            {activeModal === 'duration' && (
              <div ref={modalRef}>
                <DurationModal onClose={() => setActiveModal(null)} />
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
