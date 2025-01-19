import React, { useState } from 'react';

interface FilterObject {
  grade: number[];
  minPrice: number;
  maxPrice: number;
  bedType?: string[];
  view?: string[];
  facility?: string[];
  service?: string[];
}

// onFilterChange에 넘길 필터 타입 정의
interface FilterProps {
  onFilterChange: (filters: FilterObject) => void;
}

const AsideFilter = ({ onFilterChange }: FilterProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000); // 초기값 50만 원

  /** 최소값 슬라이더 핸들러 */
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  /** 최대값 슬라이더 핸들러 */
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  /** 배열 토글 함수: 이미 있으면 제거, 없으면 추가 */
  const toggleArrayItem = <T,>(array: T[], value: T): T[] => {
    return array.includes(value) ? array.filter((item) => item !== value) : [...array, value];
  };

  /** 변경된 필터를 합쳐서 부모 콜백(onFilterChange)에 전달 */
  const applyFilters = (updated: Partial<FilterObject>) => {
    const filters = {
      grade: selectedGrade,
      minPrice,
      maxPrice,
      ...updated
    };
    console.log('Applied Filters:', filters);
    onFilterChange(filters);
  };

  /** 호텔 성급 필터 클릭 시 상태 업데이트 */
  const handleHotelGradeChange = (grade: number) => {
    const updatedGrades = toggleArrayItem(selectedGrade, grade);
    setSelectedGrade(updatedGrades);
    console.log('Selected Grades:', updatedGrades);
    applyFilters({ grade: updatedGrades });
  };

  return (
    <aside className="w-[266px] h-[1350px]">
      <h2 className="text-lg font-bold mb-4">필터</h2>

      <div className="space-y-4">
        {/* 가격 필터 */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            가격 <span className="text-sm font-normal text-gray-500">1박 기준</span>
          </h2>

          {/* 슬라이더 영역 */}
          <div className="relative mb-4">
            {/* 뒤쪽 기본 트랙 (회색 선) */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-200" />

            {/* 선택 범위 (하이라이트) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#B3916A]"
              style={{
                left: `${(minPrice / 10000000) * 100}%`,
                right: `${100 - (maxPrice / 10000000) * 100}%`
              }}
            />

            {/* 최소값 Range */}
            <input
              type="range"
              min="0"
              max="10000000"
              value={minPrice}
              onChange={handleMinChange}
              className="range-input absolute w-full appearance-none pointer-events-none"
            />

            {/* 최대값 Range */}
            <input
              type="range"
              min="0"
              max="10000000"
              value={maxPrice}
              onChange={handleMaxChange}
              className="range-input absolute w-full appearance-none pointer-events-none"
            />
          </div>

          {/* 선택된 금액 표시 */}
          <div className="flex justify-between text-sm text-[#B3916A] font-medium">
            <span>{minPrice.toLocaleString()}원</span>
            <span>{maxPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <div className="border border-[#E2E2E2] my-7" />

      {/* 성급 필터 */}
      <div>
        <h3 className="text-md font-semibold mb-1">호텔 성급</h3>
        <ul className="flex gap-2">
          {[4, 5].map((grade) => (
            <li key={grade}>
              <button
                type="button"
                onClick={() => handleHotelGradeChange(grade)}
                className={`px-4 py-2 rounded-md border flex items-center gap-2 transition-colors ${
                  selectedGrade.includes(grade) ? 'bg-[#B3916A] text-white' : 'bg-white text-gray-700'
                }`}
              >
                <span>{grade}성</span>
                {/* 별 아이콘 (별색 #E2E2E2 고정) */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="#E2E2E2">
                  <path d="M12 .587l3.668 7.455 8.232 1.196-5.95 5.798 1.405 8.195L12 18.896l-7.355 3.835 1.405-8.195-5.95-5.798 8.232-1.196L12 .587z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-[#E2E2E2] my-7" />

      {/* 침대 종류 */}
      <div>
        <h3 className="text-md font-semibold mb-4">침대 종류</h3>
        <ul>
          {['침대', '더블', '트윈'].map((bedType) => (
            <li key={bedType} className="mb-2">
              <button
                type="button"
                className="px-3 py-1 rounded-full border border-[#E2E2E2] text-[#777] text-sm hover:bg-gray-100"
              >
                {bedType}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-[#E2E2E2] my-7" />

      {/* 객실 뷰 */}
      <div>
        <h3 className="text-md font-semibold mb-4">객실 뷰</h3>
        <ul className="flex flex-wrap gap-4">
          {['시티뷰', '마운틴뷰', '리버뷰', '오션뷰'].map((view) => (
            <li key={view}>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-[#E2E2E2] text-[#777] text-sm hover:bg-gray-100"
              >
                {view}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-[#E2E2E2] my-7" />

      {/* 편의 시설 */}
      <div>
        <h3 className="text-md font-semibold mb-4">편의 시설</h3>
        <ul className="flex flex-wrap gap-2">
          {['사우나', '수영장', '스키장', '골프장', '바베큐', '레스토랑', '피트니스', '주방/식당', 'BAR', '주차장'].map(
            (facility) => (
              <li key={facility}>
                <button
                  type="button"
                  className="px-3 py-1 rounded-full border border-[#E2E2E2] text-[#777] text-sm hover:bg-gray-100"
                >
                  {facility}
                </button>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="border border-[#E2E2E2] my-7" />

      {/* 서비스 */}
      <div>
        <h3 className="text-md font-semibold mb-4">서비스</h3>
        <ul className="flex flex-wrap gap-2">
          {['조식제공', '무료주차', '발렛', '반려견동반', '장애인편의', '유모차', '애기침대'].map((service) => (
            <li key={service}>
              <button
                type="button"
                className="px-3 py-1 rounded-full border border-[#E2E2E2] text-[#777] text-sm hover:bg-gray-100"
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
