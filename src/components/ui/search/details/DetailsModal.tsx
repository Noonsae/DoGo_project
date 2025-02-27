'use client';

import React from 'react';

import useSearchStore from '@/store/useSearchStore'; // zustand store import

import IoIosRemoveCircleOutlineIcon from '../../icon/IoIosRemoveCircleOutlineIcon';
import IoIosAddCircleOutlineIcon from '../../icon/IoIosAddCircleOutlineIcon';

const DetailsModal = ({ onClose }: { onClose: () => void }) => {
  const { setDetails } = useSearchStore(); // zustand의 setDetails 사용

  const initialFilters = {
    객실수: 1,
    성인: 1,
    어린이: 0,
    반려동물: 0
  };

  const [filters, setFilters] = React.useState(initialFilters);

  const handleChange = (type: keyof typeof filters, increment: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : prev[type] > 0 ? prev[type] - 1 : 0
    }));
  };

  const handleSaveDetails = () => {
    const formattedDetails = Object.entries(filters)
      .filter(([_, value]) => value > 0) // 값이 0보다 큰 항목만 필터링
      .map(([key, value]) => {
        switch (key) {
          case '객실수':
            return `객실수: ${value}개`;
          case '성인':
            return `성인: ${value}명`;
          case '어린이':
            return `어린이: ${value}명`;
          case '반려동물':
            return `반려동물: ${value}마리`;
          default:
            return '';
        }
      })
      .join(', '); // 필터링된 값을 쉼표로 연결

    setDetails(formattedDetails); // zustand에 저장
    onClose();
  };

  const handleResetFilters = () => {
    setFilters(initialFilters); // 초기 상태로 되돌리기
    setDetails('');
  };

  return (
    <div
      className="fixed left-1/2 top-1/2 w-[432px] p-8 bg-white rounded-[12px] shadow-lg z-50 transform -translate-x-1/2 -translate-y-1/2"
      onClick={(e) => e.stopPropagation()} // 내부 클릭 방지
    >
      <p className="mb-6 text-[18px] text-[#636363] font-normal leading-[1.45]">추가 정보를 입력해주세요</p>

      {Object.keys(filters).map((key) => (
        <div key={key} className="mb-[12px]">
          {/* 필터 옵션 */}
          <div className="flex justify-between items-center mb-1 mt-[12px]">
            <div>
              <p className="text-[18px] text-[#444] font-medium">{key}</p>
              <p className="text-base text-[#A0A0A0] leading-[1.45] font-normal ">
                {key === '객실수' && '필요한 객실의 수'}
                {key === '성인' && '18세 이상'}
                {key === '어린이' && '17세 이하'}
                {key === '반려동물' && '강아지, 고양이, 소동물 등'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* - 버튼 */}
              <button
                onClick={() =>
                  filters[key as keyof typeof filters] > 1 && handleChange(key as keyof typeof filters, false)
                }
                disabled={filters[key as keyof typeof filters] <= 1}
                className={`text-[25px] ${
                  filters[key as keyof typeof filters] > 1
                    ? 'text-[#B3916A] hover:text-[#8F7455]'
                    : 'text-[#D3D3D3] cursor-not-allowed'
                }`}
                aria-label={`${key} 감소 버튼`}
              >
                <IoIosRemoveCircleOutlineIcon />
              </button>
              <span className="text-lg">{filters[key as keyof typeof filters]}</span>
              {/* + 버튼 */}
              <button
                onClick={() => handleChange(key as keyof typeof filters, true)}
                className="text-[#B3916A] text-[25px] hover:text-[#8F7455]"
                aria-label={`${key} 증가 버튼`}
              >
                <IoIosAddCircleOutlineIcon />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* 버튼 영역 */}
      <div className="w-full flex justify-end mt-8">
        <button
          onClick={handleResetFilters} // 상태값 초기화
          className="w-[124px] px-6 py-[10px] text-[18px] font-semibold text-[#B3916A] hover:text-[#8f7455]"
        >
          초기화
        </button>

        <button
          onClick={handleSaveDetails} // zustand에 저장
          className="w-[124px] px-6 py-[10px] bg-[#B3916A] text-white text-[18px] font-semibold rounded-lg hover:bg-[#8F7455] active:bg-[#6B573F]"
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;
