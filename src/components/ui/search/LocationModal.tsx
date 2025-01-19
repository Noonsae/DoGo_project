'use client';

import { useState } from 'react';

import useHistoryStore from '@/store/useHistoryStore';

import { locations } from '@/constants/constant';

import { IoMdPin } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

const LocationModal = ({ onSelectLocation }: { onSelectLocation: (label: string) => void }) => {
  const history = useHistoryStore((state) => state.history);
  const removeHotel = useHistoryStore((state) => state.removeHotel);
  const [selectedLocal, setSelectedLocal] = useState<string>(''); // input으로 넘겨주는 상태값

  const getLocationLabel = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId);
    return location ? location.label : '알 수 없음';
  };

  // 1. 역순으로 정렬한 뒤,
  const reversedHistory = [...history].reverse();

  // 2. 중복 값을 제거하고 최대 3개의 리스트만 반환
  const uniqueHistory = reversedHistory
    .filter((item, index, self) => index === self.findIndex((h) => h.location === item.location))
    .slice(0, 3); // 최대 3개만 유지

  // 전체를 제외한 location constant의 값을 필터링
  const filteredLocations = locations.filter((location) => location.id !== 'all');

  // 선택한 지역값을 input의 value로 넘겨줌
  const handleSelectHistory = (locationId: string) => {
    const label = getLocationLabel(locationId); // locationId로 label 가져오기
    setSelectedLocal(label); // 선택된 label 상태 업데이트
    onSelectLocation(label); // 부모 컴포넌트에 전달
  };

  // 선택한 버튼의 지역값을 input의 value로 넘겨줌
  const handleLocationClick = (label: string) => {
    setSelectedLocal(label); // 선택된 버튼의 label을 저장
    onSelectLocation(label); // 부모 컴포넌트로 선택된 label 전달
  };

  return (
    <div className="fixed left-[17%] top-[180px] w-[404px] px-9 py-8 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)] rounded-[12px] z-50">
      <div>
        <p className="mb-3 text-[20px] text-[#232527] font-semibold">최근 검색지</p>
        <div className="h-[126px] overflow-hidden">
          {uniqueHistory.map((history) => (
            <div
              className="h-[42px] px-1 py-2 flex flex-row items-center justify-between rounded-[8px] cursor-pointer hover:bg-[#f5f5f5]"
              onClick={() => handleSelectHistory(history.location)}
            >
              <div className="flex flex-row items-center justify-start">
                <IoMdPin className="w-6 h-6 text-[#777] mr-2" />
                <p className="p-2 text-[18px] text-[#636363] leading-[1.45] ">{getLocationLabel(history.location)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeHotel(history.location)} // 삭제 버튼 동작
              >
                <IoClose className="w-6 h-6 text-[#777]" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-3 text-[20px] text-[#232527] font-semibold">지역</p>
        <div className="flex flex-row flex-wrap gap-3">
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              value={location.id}
              onClick={() => handleLocationClick(location.label)}
              type="button"
              className="w-[74px] h-[36px] border border-[#e2e2e2] rounded-[8px] text-[15px] text-[#777] font-medium bg-[#fff] hover:bg-[#B3916A] hover:text-[#fff] active:bg-[#8F7455]"
            >
              {location.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
