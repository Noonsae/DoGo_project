import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: { grade?: number; view?: string; bedType?: string }) => void;
}

const AsideFilter = ({ onFilterChange }: FilterProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [selectedBedType, setSelectedBedType] = useState<string | null>(null);

  const handleHotelGradeChange = (grade: number) => {
    setSelectedGrade(grade);
    onFilterChange({ grade, view: selectedView, bedType: selectedBedType });
  };

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    onFilterChange({ grade: selectedGrade, view, bedType: selectedBedType });
  };

  const handleBedTypeChange = (bedType: string) => {
    setSelectedBedType(bedType);
    onFilterChange({ grade: selectedGrade, view: selectedView, bedType });
  };

  return (
    <aside className="w-[266px] p-4 border border-gray-300 rounded-md bg-gray-50">
      <h2 className="text-lg font-bold mb-4">필터</h2>

      {/* 호텔 성급 필터 */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-1">호텔 성급</h3>
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
        <h3 className="text-md font-semibold mb-2">View</h3>
        <ul>
          {['시티', '마운틴', '리버', '오션'].map((view) => (
            <li key={view}>
              <button onClick={() => handleViewChange(view)}>{view}</button>
            </li>
          ))}
        </ul>
        <h3 className="text-md font-semibold mb-1 ">침대 종류</h3>
        <ul>
          {['싱글', '더블', '트윈'].map((bedType) => (
            <li key={bedType} className="">
              <button onClick={() => handleBedTypeChange(bedType)}>{bedType}</button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AsideFilter;
