import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: { grade?: number }) => void;
}

const AsideFilter = ({ onFilterChange }: FilterProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  const handleHotelGradeChange = (grade: number) => {
    setSelectedGrade(grade);
    onFilterChange({ grade });
  };

  return (
    <aside className="w-[266px] p-4 border border-gray-300 rounded-md bg-gray-50">
      <h2 className="text-lg font-bold mb-4">필터</h2>

      {/* 호텔 성급 필터 */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">호텔 성급</h3>
        <ul>
          <li>
            <input
              type="radio"
              id="rating-5"
              name="rating"
              onChange={() => handleHotelGradeChange(5)}
              checked={selectedGrade === 5}
            />
            <label htmlFor="rating-5" className="ml-2">
              5성
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="rating-4"
              name="rating"
              onChange={() => handleHotelGradeChange(4)}
              checked={selectedGrade === 4}
            />
            <label htmlFor="rating-4" className="ml-2">
              4성
            </label>
          </li>
        </ul>
        <h3 className="text-md font-semibold mb-2">룸 등급</h3>
        <ul>
          <li>
            <button>Deluxe</button>
            <button>Suite</button>
            <button>Executive</button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AsideFilter;
