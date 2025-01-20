import React, { useState } from 'react';

// Props 타입 정의
interface SortBtnType {
  sortOrder: string; // 선택된 정렬 순서
  handleSortChange: (value: string) => void; // onChange 핸들러
}

const SortBtn = ({ sortOrder, handleSortChange }: SortBtnType) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const options = [
    { value: '', label: '추천순' },
    { value: 'asc', label: '낮은 가격 순' },
    { value: 'desc', label: '높은 가격 순' }
  ];

  const handleSelect = (value: string) => {
    handleSortChange(value); // 부모 컴포넌트의 핸들러 호출
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="relative w-[160px] px-4 py-3 border text-center rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
      {/* 선택된 값 표시 */}
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === sortOrder)?.label || '추천순'}
      </div>

      {/* 드롭다운 옵션 */}
      {isOpen && (
        <ul className="absolute left-0 top-[56px] w-full border rounded shadow-[0px_4px_12px_rgba(0,0,0,0.1)] bg-white">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`h-[48px] px-4 py-3 cursor-pointer p-2 hover:bg-[#f5f5f5] ${
                option.value === sortOrder ? 'font-bold text-[#B3916A]' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBtn;
