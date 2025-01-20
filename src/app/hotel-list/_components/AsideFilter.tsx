'use client';
import React, { useState, useEffect } from 'react';

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

const AsideFilter = ({ onFilterChange }: FilterProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000); // 초기값 50만 원
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // 필터 상태를 변경할 때마다 API 호출
  useEffect(() => {
    // 변경 사항이 있을 때만 onFilterChange 호출
    onFilterChange({
      grade: selectedGrade,
      minPrice,
      maxPrice,
      facilities: selectedFacilities,
      services: selectedServices
    });
  }, [selectedGrade, minPrice, maxPrice, selectedFacilities, selectedServices]);

  const handleHotelGradeChange = (grade: number) => {
    setSelectedGrade((prev) => (prev.includes(grade) ? prev.filter((item) => item !== grade) : [...prev, grade]));
  };

  const handleFacilityChange = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((item) => item !== facility) : [...prev, facility]
    );
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min' && value <= maxPrice) {
      setMinPrice(value);
    } else if (type === 'max' && value >= minPrice) {
      setMaxPrice(value);
    }
  };

  return (
    <aside className="w-[266px]">
      <h2 className="text-lg font-bold">필터</h2>

      {/* 금액 필터 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          가격 <span className="text-sm text-gray-500">1박 기준</span>
        </h3>
        <div className="relative w-full h-1 bg-gray-200 rounded my-4">
          <div
            className="absolute h-1 bg-[#B3916A] rounded"
            style={{
              left: `${(minPrice / 500000) * 100}%`,
              right: `${100 - (maxPrice / 500000) * 100}%`
            }}
          />
          <input
            type="range"
            min={0}
            max={500000}
            value={minPrice}
            className="absolute w-full h-1 opacity-0 cursor-pointer"
            onChange={(e) => handlePriceChange('min', Number(e.target.value))}
          />
          <input
            type="range"
            min={0}
            max={500000}
            value={maxPrice}
            className="absolute w-full h-1 opacity-0 cursor-pointer"
            onChange={(e) => handlePriceChange('max', Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span>{minPrice.toLocaleString()}원</span>
          <span>{maxPrice.toLocaleString()}원</span>
        </div>
      </div>

      {/* 성급 필터 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">호텔 성급</h3>
        <ul className="flex gap-2">
          {[4, 5].map((grade) => (
            <li key={grade}>
              <button
                type="button"
                onClick={() => handleHotelGradeChange(grade)}
                className={`px-4 py-2 rounded-md border ${
                  selectedGrade.includes(grade) ? 'bg-[#B3916A] text-white' : 'bg-white text-gray-700'
                }`}
              >
                {grade}성
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
