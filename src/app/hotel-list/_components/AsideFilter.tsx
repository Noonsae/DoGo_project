'use client';
import React, { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: {
    grade?: number[];
    facilities?: string[];
    services?: string[];
  }) => void;
}

const AsideFilter = ({ onFilterChange }: FilterProps) => {
  const [selectedGrade, setSelectedGrade] = useState<number[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleArrayItem = <T,>(array: T[], value: T): T[] => {
    return array.includes(value) ? array.filter((item) => item !== value) : [...array, value];
  };

  const updateFilters = () => {
    onFilterChange({
      grade: selectedGrade,
      facilities: selectedFacilities,
      services: selectedServices,
    });
  };

  const handleHotelGradeChange = (grade: number) => {
    const updatedGrades = toggleArrayItem(selectedGrade, grade);
    setSelectedGrade(updatedGrades);
    updateFilters();
  };

  const handleFacilityChange = (facility: string) => {
    const updatedFacilities = toggleArrayItem(selectedFacilities, facility);
    setSelectedFacilities(updatedFacilities);
    updateFilters();
  };

  const handleServiceChange = (service: string) => {
    const updatedServices = toggleArrayItem(selectedServices, service);
    setSelectedServices(updatedServices);
    updateFilters();
  };

  return (
    <aside className="w-[266px] p-4 border border-gray-300 rounded-md bg-gray-50">
      <h2 className="text-lg font-bold mb-4">필터</h2>

      <h3 className="text-md font-semibold mb-1">호텔 성급</h3>
      <ul>
        {[5, 4].map((grade) => (
          <li key={grade}>
            <input
              type="checkbox"
              id={`rating-${grade}`}
              onChange={() => handleHotelGradeChange(grade)}
              checked={selectedGrade.includes(grade)}
            />
            <label htmlFor={`rating-${grade}`} className="ml-2">
              {grade}성
            </label>
          </li>
        ))}
      </ul>

      <h3 className="text-md font-semibold mb-1">호텔 시설</h3>
      <ul>
        {['사우나', '수영장', '골프장', '바베큐', '피트니스'].map((facility) => (
          <li key={facility}>
            <button
              type="button"
              onClick={() => handleFacilityChange(facility)}
              className={`px-4 py-2 rounded-md border ${
                selectedFacilities.includes(facility) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {facility}
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-md font-semibold mb-1">서비스</h3>
      <ul>
        {['조식제공', '무료주차', '발렛'].map((service) => (
          <li key={service}>
            <button
              type="button"
              onClick={() => handleServiceChange(service)}
              className={`px-4 py-2 rounded-md border ${
                selectedServices.includes(service) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {service}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideFilter;
