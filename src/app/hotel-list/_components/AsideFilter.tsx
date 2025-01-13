import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: { grade: number[] }) => void; // 객체 형태로 전달
}



const AsideFilter = ({ onFilterChange }: FilterProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState(0); // 최소값 상태
  const [maxPrice, setMaxPrice] = useState(10000000); // 최대값 상태
  const priceStep = 10000; // 슬라이더 단계


  const toggleArrayItem = <T,>(array: T[], value: T): T[] => {
    return array.includes(value) ? array.filter((item) => item !== value) : [...array, value];
  };

  const handleHotelGradeChange = (grade: number) => {
    const updatedGrades = toggleArrayItem(selectedGrade, grade); // 선택 상태 업데이트
    setSelectedGrade(updatedGrades);
    onFilterChange({ grade: updatedGrades }); // 객체로 부모에 전달
  };

  return (
    <aside className="w-[266px] h-[1350px] p-4 border border-gray-300 rounded-md bg-gray-50">
      <h2 className="text-lg font-bold mb-4">필터</h2>

      <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold">가격</h3>
        <span className="text-sm text-gray-500">1박 기준</span>
      </div>

      <div className="relative mt-4">
          {/* 슬라이더 영역 */}
          <input
            type="range"
            min="0"
            max="10000000" // 최대값 설정
            step={priceStep}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              zIndex: minPrice > maxPrice ? 3 : 1, // 슬라이더 중첩 문제 방지
            }}
          />
          <input
            type="range"
            min="0"
            max="10000000" // 최대값 설정
            step={priceStep}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div
            className="absolute h-2 bg-amber-500 rounded-lg"
            style={{
              left: `${(minPrice / 10000000) * 100}%`,
              right: `${100 - (maxPrice / 10000000) * 100}%`,
            }}
          ></div>
        </div>

      {/* 가격 표시 */}
      <div className="flex justify-between text-sm text-amber-600 font-medium mb-6 pb-6">
        <span>{minPrice.toLocaleString()}원</span>
        <span>{maxPrice.toLocaleString()}원</span>
      </div>


      <h3 className="text-md font-semibold mb-1">호텔 성급</h3>
      <ul>
        {[5, 4].map((grade) => (
          <li key={grade} className="mb-2">
            <button
              type="button"
              onClick={() => handleHotelGradeChange(grade)}
              className={`px-4 py-2 rounded-md border ${
                selectedGrade.includes(grade)
                  ? 'bg-[#B3916A] text-white' // 선택된 상태 스타일
                  : 'bg-gray-200 text-gray-800' // 기본 상태 스타일
              }`}
            >
              {grade}성
            </button>
          </li>
        ))}
      </ul>

      <h3>침대 종류</h3>
      <ul>
        {['침대', '더블', '트윈'].map((bedType) => (
          <li key={bedType} className='mb-2'>
            <input type="checkbox" id={`rating-${bedType}`}/>
            <label htmlFor={`rating-${bedType}`}>{bedType}</label>
          </li>
        ))}
      </ul>

      <h3>객실 뷰</h3>
      <ul className="flex flex-wrap gap-4">
      {['시티뷰', '마운틴뷰', '리버뷰', '오션뷰'].map((view) => (
        <li key={view}>
          <button
            type="button"
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-500 text-sm hover:bg-gray-100"
          >
            {view}
          </button>
        </li>
      ))}
    </ul>

    
  <h3 className="text-md font-semibold mb-4">편의 시설</h3>
  <ul className="flex flex-wrap gap-2">
    {['사우나', '수영장', '스키장', '골프장', '바베큐', '레스토랑', '피트니스', '주방/식당', 'BAR', '주차장'].map(
      (facility) => (
        <li key={facility}>
          <button
            type="button"
            className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 text-sm hover:bg-gray-100"
          >
            {facility}
          </button>
        </li>
      )
    )}
  </ul>

  <h3 className="text-md font-semibold mt-6 mb-4">서비스</h3>
  <ul className="flex flex-wrap gap-2">
    {['조식제공', '무료주차', '발렛', '반려견동반', '장애인편의', '유모차', '애기침대'].map((service) => (
      <li key={service}>
        <button
          type="button"
          className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 text-sm hover:bg-gray-100"
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
