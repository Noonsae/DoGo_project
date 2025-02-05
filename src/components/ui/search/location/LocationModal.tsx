'use client';

import useSearchHistoryStore from '@/store/useSearchHistoryStore';

import { locations } from '@/constants/constant';
import IoMdPinIcon from '../../icon/IoMdPinIcon';
import IoCloseIcon from '../../icon/IoCloseIcon';
import useSearchStore from '@/store/useSearchStore';

const LocationModal = ({ onClose }: { onClose: () => void }) => {
  const history = useSearchHistoryStore((state) => state.history); // 히스토리 값 가져오기
  const removeHistory = useSearchHistoryStore((state) => state.removeHistory);
  const { location, setLocation } = useSearchStore();

  const getLocationLabel = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId);
    return location ? location.label : '';
  };

  // 전체를 제외한 location constant의 값을 필터링
  const filteredLocations = locations.filter((location) => location.id !== 'all');

  // 선택한 버튼의 지역값을 전역 상태로 저장
  const handleLocationClick = (label: string) => {
    setLocation(label);
    onClose();
  };

  // 검색 기록을 지우면서 input 상태 초기화
  const handleRemoveSearchHistory = (item: string) => {
    setLocation('');
    removeHistory(item);
  };

  return (
    <div className="modal-content modal-location fixed left-1/2 top-1/2 w-[404px] px-9 py-8 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)] rounded-[12px] z-50 transform -translate-x-1/2 -translate-y-1/2">
      <div>
        <p className="mb-6 text-[18px] text-[#636363] font-normal leading-[1.45]">
          검색어를 입력하거나 지역을 선택해주세요.
        </p>
        <p className="mb-3 text-[20px] text-[#232527] font-semibold">최근 검색지</p>
        <div className="h-[126px] overflow-hidden">
          {history.length > 0 ? (
            history.map((item, index) => (
              <div
                key={index}
                className="h-[42px] px-1 py-2 flex flex-row items-center justify-between rounded-[8px] cursor-pointer hover:bg-[#f5f5f5]"
                onClick={() => handleLocationClick(item)}
              >
                <div className="flex flex-row items-center justify-start">
                  <IoMdPinIcon className="w-6 h-6 text-[#777] mr-2" />
                  <p className="p-2 text-[18px] text-[#636363] leading-[1.45] ">{item}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 버블링 방지
                    handleRemoveSearchHistory(item);
                  }} // 삭제 버튼 동작
                >
                  <div>
                    <IoCloseIcon className="w-6 h-6 text-[#777]" />
                  </div>
                </button>
              </div>
            ))
          ) : (
            <div className="w-full h-[126px] flex flex-row items-center justify-center">
              <p className="text-[18px] text-[#636363] font-normal leading-[1.45]">
                이전 검색 기록을 찾을 수 없습니다.
              </p>
            </div>
          )}
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
