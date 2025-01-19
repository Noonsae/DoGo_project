'use client';
import React from 'react';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import useSearchStore from '@/store/useSearchStore'; // zustand store import

interface DetailsProps {
  right?: string;
  top: string;
}

const DetailsModal = ({ right = '360px', top }: DetailsProps) => {
  const { setDetails } = useSearchStore(); // zustand의 setDetails 사용
  const [filters, setFilters] = React.useState({
    객실수: 1,
    성인: 1,
    어린이: 0,
    반려동물: 0
  });

  const handleChange = (type: keyof typeof filters, increment: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : prev[type] > 0 ? prev[type] - 1 : 0
    }));
  };

  const applyChanges = () => {
    const formattedDetails = `객실수: ${filters.객실수}, 성인: ${filters.성인}, 어린이: ${filters.어린이}, 반려동물: ${filters.반려동물}`;
    setDetails(formattedDetails); // zustand에 저장
  };

  return (
    <div
      style={{ right, top }}
      className="fixed bg-white p-6 rounded-[12px] shadow-lg w-[432px] h-[364px] z-50"
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
            applyChanges(); // zustand에 저장
          }}
          className="w-[124px] h-[44px] mt-4 bg-[#B3916A] text-white py-2 rounded"
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;
