'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import useSearchStore from '@/store/useSearchStore';

import generateUrl from '@/utils/calculator/urlHelpers';

import DualSlider from './DualSlider';
import FacilityList from './FacilityList';
import ServiceList from './ServiceList';
import BedTypeList from './BedTypeList';

import HiOutlineRefreshIcon from '@/components/ui/icon/HiOutlineRefreshIcon';
import InstanceIcon from '@/components/ui/icon/InstanceIcon';
import FilterModal from '@/components/ui/hotel-mobile/modal';
import DownIcon from '@/components/ui/icon/DownIcon';

import { FacilitiesType } from '@/types/supabase/facilities-type';
import { ServicesType } from '@/types/supabase/services-type';
import { FiltersType } from '@/types/hotel/hotel-filter-type';

// TODO 타입파일 분리
interface AsideFilterProps {
  onFilterChange: (newFilters: FiltersType) => void; // 필터 업데이트를 상위 컴포넌트로 전달
}

const AsideFilter = ({ onFilterChange }: AsideFilterProps) => {
  const router = useRouter();

  const [selectedGrade, setSelectedGrade] = useState<number[]>([]);
  const [minPriceValue, setMinPriceValue] = useState<number>(0);
  const [maxPriceValue, setMaxPriceValue] = useState<number>(2000000);
  const [selectedServices, setSelectedServices] = useState<ServicesType[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<FacilitiesType[]>([]);
  const [selectedBedTypes, setSelectedBedTypes] = useState<string[]>([]);
  const { location, checkIn, checkOut, stay, details, month } = useSearchStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // ✅ 모달 상태 추가

  // 성급 필터
  const handleHotelGradeChange = (grade: number) => {
    setSelectedGrade((prev) => (prev.includes(grade) ? prev.filter((item) => item !== grade) : [...prev, grade]));
  };

  // 시설 필터
  const handleFacilityChange = (facility: FacilitiesType) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((fac) => fac.id !== facility.id) : [...prev, facility]
    );
  };

  // 서비스 필터
  const handleServiceChange = (service: ServicesType) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  // 침대 필터
  const handleBedTypeChange = (bedType: string) => {
    setSelectedBedTypes((prev) => (prev.includes(bedType) ? prev.filter((b) => b !== bedType) : [...prev, bedType]));
  };

  useEffect(() => {
    setMinPriceValue(Number(minPriceValue));
    setMaxPriceValue(Number(maxPriceValue));
  }, [minPriceValue, maxPriceValue]);

  // 필터 조건 적용
  useEffect(() => {
    const updatedStars = selectedGrade.length > 0 ? selectedGrade : []; // undefined를 방지
    const updatedMinPrice = minPriceValue || 0; // undefined 방지, 기본값 0 설정
    const updatedMaxPrice = maxPriceValue || 2000000; // undefined 방지, 기본값 2000000 설정
    const updatedFacilities = selectedFacilities.map((facility) => facility.id);
    const updatedServices = selectedServices.map((service) => service.id);
    const updatedBedTypes = selectedBedTypes;
    const updatedLabel = ''; // label의 기본값을 설정 (필요한 경우 다른 값으로 설정 가능)
    const updatedFacilityIds = updatedFacilities; // 시설 아이디
    const updatedServiceIds = updatedServices; // 서비스 아이디

    onFilterChange({
      label: updatedLabel, // label을 추가
      stars: updatedStars,
      minPrice: updatedMinPrice,
      maxPrice: updatedMaxPrice,
      facilityIds: updatedFacilityIds, // facilityIds 추가
      serviceIds: updatedServiceIds, // serviceIds 추가
      beds: updatedBedTypes
    });
    // URL을 변경하는 로직 (선택적으로 남겨두기)
    const url = generateUrl({
      location,
      checkIn,
      checkOut,
      stay,
      month,
      details,
      stars: updatedStars,
      minPrice: updatedMinPrice,
      maxPrice: updatedMaxPrice,
      facilities: updatedFacilities,
      services: updatedServices,
      beds: updatedBedTypes
    });

    router.push(url);
  }, [selectedGrade, minPriceValue, maxPriceValue, selectedFacilities, selectedServices, selectedBedTypes]);

  // 필터 초기화
  const handleResetFilters = async () => {
    setSelectedGrade([]);
    setMaxPriceValue(2000000);
    setMinPriceValue(0);
    setSelectedFacilities([]);
    setSelectedServices([]);
    setSelectedBedTypes([]);

    const resetUrl = generateUrl({
      location,
      checkIn,
      checkOut,
      stay,
      details,
      stars: [],
      minPrice: 0,
      maxPrice: 2000000,
      facilities: [],
      services: [],
      beds: []
    });
    await router.push(resetUrl); // 페이지 이동
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 958px)');

    // ✅ 초기 실행
    setIsMobile(mediaQuery.matches);

    // ✅ resize 이벤트 핸들러 추가
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  if (isMobile) {
    return (
      <div className="fixed top-[148px] z-20 bg-white left-0 w-full p-4 ">
        <div className="flex overflow-x-scroll gap-3 scrollbar-hide">
          <button
            className="flex bg-white text-[#636363] px-4 py-2 gap-1  border border-gray-300 text-sm font-semibold whitespace-nowrap rounded-[9999px]"
            onClick={handleFilterClick}
          >
            {InstanceIcon()}필터
          </button>
          <button
            className="flex bg-white text-[#636363] px-4 py-2 gap-1  border border-gray-300 text-sm font-semibold whitespace-nowrap rounded-[9999px]"
            onClick={handleFilterClick}
          >
            가격{DownIcon()}
          </button>
          <button
            className="flex bg-white text-[#636363] px-4 py-2 gap-1  border border-gray-300 text-sm font-semibold whitespace-nowrap rounded-[9999px]"
            onClick={handleFilterClick}
          >
            호텔 성급{DownIcon()}
          </button>
          <button
            className="flex bg-white text-[#636363] px-4 py-2 gap-1  border border-gray-300 text-sm font-semibold whitespace-nowrap rounded-[9999px]"
            onClick={handleFilterClick}
          >
            침대 종류{DownIcon()}
          </button>
          <button
            className="flex bg-white text-[#636363] px-4 py-2 gap-1  border border-gray-300 text-sm font-semibold whitespace-nowrap rounded-[9999px]"
            onClick={handleFilterClick}
          >
            공용 시설{DownIcon()}
          </button>
          <button
            className="flex bg-white text-[#636363] px-4 py-2 gap-1  border border-gray-300 text-sm font-semibold whitespace-nowrap rounded-[9999px]"
            onClick={handleFilterClick}
          >
            편의 시설{DownIcon()}
          </button>
        </div>
        <FilterModal isOpen={isFilterModalOpen} setIsOpen={setIsFilterModalOpen} />
      </div>
    );
  }
  return (
    <aside className=" w-[298px] px-4 py-3 max-lg:flex-row">
      {/* 필터 - 적용 및 필터 초기화 */}
      <div className="flex flex-row items-center justify-between mb-[70px]">
        <div className="flex flex-row gap-4">
          <p className="text-[20px] font-bold">필터</p>
        </div>
        <button className="flex flex-row items-center justify-between gap-[1.5px]" onClick={handleResetFilters}>
          <HiOutlineRefreshIcon className="w-[20px] h-[20px] text-[#A0A0A0]" />
          <span className="text-base text-[#777] font-normal leading-[1.45]">필터 초기화</span>
        </button>
      </div>

      {/* 가격 1박 기준 */}
      <div className="w-full h-[156px] py-[28px]  border-[#e2e2e2] flex flex-col justify-start ">
        <p className="text-lg font-semibold mb-2">
          가격 <span className="text-sm text-gray-500">1박 기준</span>
        </p>
        <DualSlider
          minPriceValue={minPriceValue}
          maxPriceValue={maxPriceValue}
          onMinPriceChange={(value) => setMinPriceValue(value)}
          onMaxPriceChange={(value) => setMaxPriceValue(value)}
        />
      </div>

      {/* 성급 필터 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">호텔 성급</h3>
        <ul className="flex gap-2">
          {[4, 5].map((stars) => (
            <li key={stars}>
              <button
                type="button"
                onClick={() => handleHotelGradeChange(stars)}
                className={`px-4 py-2 rounded-md border ${
                  selectedGrade.includes(stars) ? 'bg-[#B3916A] text-white' : 'bg-white text-gray-700'
                }`}
              >
                {stars}성
              </button>
            </li>
          ))}
        </ul>
      </div>

      <BedTypeList selectedBeds={selectedBedTypes} onBedChange={handleBedTypeChange} />
      {/* 시설 필터 */}
      <FacilityList selectedFacilities={selectedFacilities} onFacilityChange={handleFacilityChange} />
      {/* 서비스 필터 */}
      <ServiceList selectedServices={selectedServices} onServiceChange={handleServiceChange} />
    </aside>
  );
};

export default AsideFilter;
