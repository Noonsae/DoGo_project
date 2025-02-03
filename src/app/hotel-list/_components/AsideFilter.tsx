'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useSearchStore from '@/store/useSearchStore';

import generateUrl from '@/utils/urlHelpers';

import { FacilitiesType } from '@/types/supabase/facilities-type';
import { ServicesType } from '@/types/supabase/services-type';

import HiOutlineRefreshIcon from '@/components/ui/icon/HiOutlineRefreshIcon';
import DualSlider from './DualSlider';
import FacilityList from './FacilityList';
import ServiceList from './ServiceList';
import BedTypeList from './BedTypeList';

const AsideFilter = () => {
  const router = useRouter();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair

  const [selectedGrade, setSelectedGrade] = useState<number[]>([]);
  const [minPriceValue, setMinPriceValue] = useState<number>(0);
  const [maxPriceValue, setMaxPriceValue] = useState<number>(2000000);
  const [selectedServices, setSelectedServices] = useState<ServicesType[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<FacilitiesType[]>([]);
  const [selectedBedTypes, setSelectedBedTypes] = useState<string[]>([]);

  const { location, checkIn, checkOut, stay, details } = useSearchStore();

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

  const handleBedTypeChange = (bedType: string) => {
    setSelectedBedTypes((prev) => (prev.includes(bedType) ? prev.filter((b) => b !== bedType) : [...prev, bedType]));
  };

  useEffect(() => {
    setMinPriceValue(Number(minPriceValue));
    setMaxPriceValue(Number(maxPriceValue));
  }, [minPriceValue, maxPriceValue]);

  // 필터 조건 적용
  useEffect(() => {
    const updatedStars = selectedGrade.includes(4) && selectedGrade.includes(5) ? undefined : selectedGrade;
    const updatedMinPrice = minPriceValue || undefined;
    const updatedMaxPrice = maxPriceValue || undefined;
    const updatedFacilities = selectedFacilities.map((facility) => facility.id);
    const updatedServices = selectedServices.map((service) => service.id);
    const updatedBedTypes = selectedBedTypes;

    const url = generateUrl({
      location,
      checkIn,
      checkOut,
      stay,
      details,
      stars: updatedStars,
      minPrice: updatedMinPrice,
      maxPrice: updatedMaxPrice,
      facilities: updatedFacilities,
      services: updatedServices,
      beds: updatedBedTypes
    });

    router.push(url); // 필터가 바뀔 때마다 자동으로 URL을 변경하여 필터 적용
  }, [selectedGrade, minPriceValue, maxPriceValue, selectedFacilities, selectedServices, selectedBedTypes]);

  // 필터 조건 초기화
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

  return (
    <aside className="w-[298px] h-[1350px] px-4 py-3">
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
      <div className="w-full h-[156px] py-[28px] border-y-2 border-[#e2e2e2] flex flex-col justify-start ">
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
