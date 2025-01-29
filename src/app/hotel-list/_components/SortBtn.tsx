import React, { useState, useCallback } from 'react';
import { sortOrder } from '@/types/hotel/hotel-filter-type';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface SortBtnType {
  sortOrder: sortOrder; // 선택된 정렬 순서
}

const SortBtn = ({ sortOrder }: SortBtnType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const [isOpen, setIsOpen] = useState(false);

  const options: { value: sortOrder; label: string }[] = [
    { value: '', label: '추천순' },
    { value: 'asc', label: '낮은 가격 순' },
    { value: 'desc', label: '높은 가격 순' }
  ];

  const handleSelect = (value: sortOrder) => {
    router.push(pathname + '?' + createQueryString('sort', value));
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="relative w-[160px] px-4 py-3 border text-center rounded-[8px]  bg-white">
      {/* 선택된 값 표시 */}
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === sortOrder)?.label || '추천순'}
      </div>

      {/* 드롭다운 옵션 */}
      {isOpen && (
        <ul className="absolute left-0 top-full mt-2 w-full border rounded shadow-[0px_4px_12px_rgba(0,0,0,0.1)] bg-white z-20">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`h-[48px] px-4 py-3 cursor-pointer  ${
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
