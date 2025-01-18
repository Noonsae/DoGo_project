'use client';
import React from 'react';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';

interface DetailsProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { 객실수: number; 성인: number; 어린이: number; 반려동물: number }) => void;
}

export default function Details({ isOpen, onClose, onApply }: DetailsProps) {
  const [filters, setFilters] = React.useState({
    객실수: 1,
    성인: 1,
    어린이: 0,
    반려동물: 0
  });
  // 커밋용 주석1
  // 커밋용 주석2
  const handleChange = (type: keyof typeof filters, increment: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : prev[type] > 0 ? prev[type] - 1 : 0
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 bg-white p-6 rounded-lg shadow-lg w-[432px] h-[364px]"
      onClick={(e) => e.stopPropagation()} // 내부 클릭 방지
    >
      {Object.keys(filters).map((key) => (
        <div key={key} className="mb-[12px]">
          {/* 필터 옵션 */}
          <div className="flex justify-between items-center mb-1 mt-[12px]">
            <span className="text-[16px] font-neutral-800 font-semibold">{key}</span>
            <div className="flex items-center space-x-2">
              <IoIosRemoveCircleOutline
                onClick={() => handleChange(key as keyof typeof filters, false)}
                className="text-[#B3916A] text-[25px] cursor-pointer"
              />
              <span className="text-lg">{filters[key as keyof typeof filters]}</span>
              <IoIosAddCircleOutline
                onClick={() => handleChange(key as keyof typeof filters, true)}
                className="text-[#B3916A] text-[25px] cursor-pointer"
              />
            </div>
          </div>
          {/* 문구 */}
          <p className="text-xs font-normal font-neutral-500">
            {key === '객실수' && '필요한 객실의 수'}
            {key === '성인' && '18세 이상'}
            {key === '어린이' && '17세 이하'}
            {key === '반려동물' && '강아지, 고양이, 소동물 등'}
          </p>
        </div>
      ))}
      {/* 적용 버튼 */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            onApply(filters); // 필터 값 부모 컴포넌트로 전달
            onClose(); // 모달 닫기
          }}
          className="w-[124px] h-[44px] mt-4 bg-[#B3916A] text-white py-2 rounded"
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
