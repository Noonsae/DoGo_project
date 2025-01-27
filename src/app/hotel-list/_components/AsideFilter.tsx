'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import HiOutlineRefreshIcon from '@/components/ui/icon/HiOutlineRefreshIcon';
import DualSlider from './DualSlider';
import generateUrl from '@/utils/urlHelpers';

interface FilterObject {
  grade: number[];
  minPrice: number;
  maxPrice: number;
  facilities: string[];
  services: string[];
}

interface FilterProps {
  onFilterChange: (filters: FilterObject) => void;
}

const AsideFilter = ({ onFilterChange: onChangeFilter }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [selectedGrade, setSelectedGrade] = useState<number[]>([]);
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(5000000); // 초기값 500만원
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [generatedUrl, setGeneratedUrl] = useState<string>(''); // URL 저장 상태

  useEffect(() => {
    // 변경 사항이 있을 때만 onFilterChange 호출
    onChangeFilter({
      grade: selectedGrade,
      minPrice: filterMinPrice,
      maxPrice: filterMaxPrice,
      facilities: selectedFacilities,
      services: selectedServices
    });
  }, [selectedGrade, filterMinPrice, filterMaxPrice, selectedFacilities, selectedServices]);

  // 필터 상태가 변경될 때 URL 생성
  const updateUrl = useCallback(() => {
    const newUrl = generateUrl({
      stars: selectedGrade.join(','),
      prices: `${filterMinPrice}-${filterMaxPrice}`,
      facilities: selectedFacilities.join(','),
      services: selectedServices.join(',')
    });

    setGeneratedUrl(newUrl); // 상태에 URL 저장
  }, [selectedGrade, filterMinPrice, filterMaxPrice, selectedFacilities, selectedServices]);

  // 필터 상태가 변경될 때 URL 업데이트
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  // 성급 필터
  const handleHotelGradeChange = (grade: number) => {
    setSelectedGrade((prev) => (prev.includes(grade) ? prev.filter((item) => item !== grade) : [...prev, grade]));
  };

  // 시설 필터
  const handleFacilityChange = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((item) => item !== facility) : [...prev, facility]
    );
  };

  // 서비스 필터
  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilterMinPrice(min);
    setFilterMaxPrice(max);
  };

  useEffect(() => {
    setFilterMinPrice(Number(filterMinPrice));
    setFilterMaxPrice(Number(filterMaxPrice));
  }, [filterMinPrice, filterMaxPrice]);

  return (
    <aside className="w-[298px] h-[1350px] px-4 py-3">
      {/* 필터 - ㅇ필터 초기화 */}
      <div className="flex flex-row items-center justify-between mb-[70px]">
        <p className="text-[20px] font-bold">필터</p>
        <button className="flex flex-row items-center justify-between gap-[1.5px]">
          <HiOutlineRefreshIcon className="w-[20px] h-[20px] text-[#A0A0A0]" />
          <span className="text-base text-[#777] font-normal leading-[1.45]">필터 초기화</span>
        </button>
      </div>

      {/* 가격 1박 기준 */}
      <div className="w-full h-[156px] py-[28px] border-y-2 border-[#e2e2e2] flex flex-col justify-start ">
        <p className="text-lg font-semibold mb-2">
          가격 <span className="text-sm text-gray-500">1박 기준</span>
        </p>

        <DualSlider />
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

      {/* 시설 필터 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">편의 시설</h3>
        <ul className="flex flex-wrap gap-2">
          {['사우나', '수영장', '스키장', '골프장', '바베큐', '레스토랑', '피트니스', '주방/식당', 'BAR', '주차장'].map(
            (facility) => (
              <li key={facility}>
                <button
                  type="button"
                  onClick={() => handleFacilityChange(facility)}
                  className={`px-3 py-1 rounded-full border ${
                    selectedFacilities.includes(facility) ? 'bg-[#B3916A] text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  {facility}
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      {/* 서비스 필터 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">서비스</h3>
        <ul className="flex flex-wrap gap-2">
          {['조식제공', '무료주차', '발렛', '반려견동반', '장애인편의', '유모차', '애기침대'].map((service) => (
            <li key={service}>
              <button
                type="button"
                onClick={() => handleServiceChange(service)}
                className={`px-3 py-1 rounded-full border ${
                  selectedServices.includes(service) ? 'bg-[#B3916A] text-white' : 'bg-white text-gray-700'
                }`}
              >
                {service}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AsideFilter;
