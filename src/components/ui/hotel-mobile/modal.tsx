'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { FiltersType } from '@/types/hotel/hotel-filter-type';

import RefreshIcon from '@/components/ui/icon/RefreshIcon';
import DualSlider from '@/app/hotel-list/_components/DualSlider';
import BedTypeList from '@/app/hotel-list/_components/BedTypeList';
import FacilityList from '@/app/hotel-list/_components/FacilityList';
import ServiceList from '@/app/hotel-list/_components/ServiceList';
import generateUrl from '@/utils/calculator/urlHelpers';

interface FilterModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterModal = ({ isOpen, setIsOpen }: FilterModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ 모달 열릴 때 배경 스크롤 막고, 닫힐 때 복구
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 🔥 배경 스크롤 막기
      document.body.style.paddingRight = '15px'; // 🔥 스크롤바 밀림 방지
    } else {
      document.body.style.overflow = ''; // 🔥 원래대로 복구
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // ✅ URL에서 필터 값 가져오기
  const [filters, setFilters] = useState<FiltersType>({
    label: searchParams.get('label') || '',
    stars: searchParams.get('stars')?.split(',').map(Number).filter(Boolean) || [],
    minPrice: parseInt(searchParams.get('minPrice') || '0', 10),
    maxPrice: parseInt(searchParams.get('maxPrice') || '2000000', 10),
    location: searchParams.get('location') || '',
    facilityIds: searchParams.get('facilities')?.split(',') || [],
    serviceIds: searchParams.get('services')?.split(',') || [],
    beds: searchParams.get('beds')?.split(',') || []
  });

  // ✅ URL 변경될 때 필터 상태 동기화
  useEffect(() => {
    setFilters({
      label: searchParams.get('label') || '',
      stars: searchParams.get('stars')?.split(',').map(Number).filter(Boolean) || [],
      minPrice: parseInt(searchParams.get('minPrice') || '0', 10),
      maxPrice: parseInt(searchParams.get('maxPrice') || '2000000', 10),
      location: searchParams.get('location') || '',
      facilityIds: searchParams.get('facilities')?.split(',') || [],
      serviceIds: searchParams.get('services')?.split(',') || [],
      beds: searchParams.get('beds')?.split(',') || []
    });

    // ✅ 특정 URL이면 모달 자동 열기
    if (searchParams.get('filter') === 'open') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchParams]);

  // ✅ 필터 값 변경 핸들러
  const handleFilterChange = (key: keyof FiltersType, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ 필터 적용 후 URL 변경 (replace 사용 → 뒤로 가기 시 유지됨)
  const applyFilters = () => {
    console.log('🚀 적용되는 필터 상태:', filters); // 필터 값 확인
    const url = generateUrl({
      label: filters.label || '',
      stars: filters.stars || [],
      minPrice: filters.minPrice ?? 0,
      maxPrice: filters.maxPrice ?? 2000000,
      facilities: filters.facilityIds || [], // ✅ 매개변수 이름 변경
      services: filters.serviceIds || [], // ✅ 매개변수 이름 변경
      beds: filters.beds || []
    });

    console.log('🔗 생성된 URL:', url); // 최종 URL 확인
    router.push(url); // ✅ 변경된 URL 즉시 적용
    setIsOpen(false);
  };

  // ✅ 필터 초기화
  const resetFilters = () => {
    setFilters({
      label: '',
      stars: [],
      minPrice: 0,
      maxPrice: 2000000,
      location: '',
      facilityIds: [],
      serviceIds: [],
      beds: []
    });

    router.replace('/hotel-list'); // 초기화 후 기본 경로로 이동
    setIsOpen(false);
  };

  // ✅ 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
    router.back(); // 뒤로 가기 (URL에서 필터 파라미터 제거)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed h-full w-full inset-0 bottom-[100px] bg-opacity-50 flex items-center justify-center z-60">
      <div
        className="bg-white  max-w-[360px] w-full h-full relative "
        style={{
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="w-full h-[56px] bg-[#221A1A] flex justify-center items-center">
          <button onClick={closeModal} className="absolute top-4  left-5 text-xl text-white">
            ✖
          </button>
          <p className="  tex-[20px] text-white">필터</p>
        </div>

        <div className="px-4 mt-[28px]">
          <h3 className="text-lg  mb-2 text-neutral-800">
            가격 <span className="text-[12px] font-normal text-neutral-600">1박 기준</span>
          </h3>
          <DualSlider
            minPriceValue={filters.minPrice}
            maxPriceValue={filters.maxPrice}
            onMinPriceChange={(value) => handleFilterChange('minPrice', value)}
            onMaxPriceChange={(value) => handleFilterChange('maxPrice', value)}
          />

          <p className="border-b border-gray-300 mt-[70px]" />

          {/* 성급 필터 */}
          <h3 className="text-lg font-semibold mt-[28px] mb-2">호텔 성급</h3>
          <div className="flex gap-2">
            {[4, 5].map((stars) => (
              <button
                key={stars}
                onClick={() =>
                  handleFilterChange(
                    'stars',
                    filters.stars.includes(stars) ? filters.stars.filter((s) => s !== stars) : [...filters.stars, stars]
                  )
                }
                className={`px-4 py-2 border rounded-md ${
                  filters.stars.includes(stars) ? 'bg-[#B3916A] text-white' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {stars}성
              </button>
            ))}
          </div>

          <p className="border-b border-gray-300 py-4  " />

          {/* 침대 유형 필터 */}
          <BedTypeList selectedBeds={filters.beds} onBedChange={(beds) => handleFilterChange('beds', beds)} />

          <p className="border-b border-gray-300 py-4 h-[10px] " />

          {/* 공용 시설 필터 */}
          <FacilityList
            selectedFacilities={filters.facilityIds.map((id) => ({
              id,
              name: `시설 ${id}`,
              created_at: new Date().toISOString()
            }))}
            onFacilityChange={(facility) =>
              handleFilterChange(
                'facilityIds',
                filters.facilityIds.includes(facility.id)
                  ? filters.facilityIds.filter((id) => id !== facility.id)
                  : [...filters.facilityIds, facility.id]
              )
            }
          />

          <p className="border-b border-gray-300 py-4  " />

          <ServiceList
            selectedServices={filters.serviceIds.map((id) => ({
              id,
              name: `서비스 ${id}`,
              created_at: new Date().toISOString()
            }))}
            onServiceChange={(service) =>
              handleFilterChange(
                'serviceIds',
                filters.serviceIds.includes(service.id)
                  ? filters.serviceIds.filter((id) => id !== service.id)
                  : [...filters.serviceIds, service.id]
              )
            }
          />
        </div>
        {/* 필터 적용 버튼 */}
        <div className="flex justify-between items-center w-full h-[64px] px-5 mt-5 shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.05)]">
          <button onClick={resetFilters} className="text-lg flex items-center gap-3 ">
            {RefreshIcon()} 초기화
          </button>
          <button
            onClick={applyFilters}
            className="bg-[#B3916A] px-6 py-2 w-[230px] h-[44px] rounded-lg text-white text-lg"
          >
            숙소 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
