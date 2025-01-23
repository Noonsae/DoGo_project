const HotelCardSkeleton = () => {
  return (
    <li className="flex animate-pulse flex-row items-center rounded-[12px] w-[872px] shadow-[0px_4px_8px_rgba(0,0,0,0.1)] p-[16px] bg-white relative space-x-6">
      {/* 이미지 스켈레톤 */}
      <div className="h-[240px] w-[324px] bg-gray-400 rounded-md"></div>

      {/* 텍스트 및 기타 정보 스켈레톤 */}
      <div className="flex-1">
        {/* 호텔 이름 스켈레톤 */}
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
        {/* 호텔 설명 스켈레톤 */}
        <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        {/* 가격 및 태그 스켈레톤 */}
        <div className="flex justify-between items-center mt-[110px]">
          <div className="flex space-x-2">
            <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
          </div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* 하트 아이콘 스켈레톤 */}
      <div className="absolute top-[25px] right-[16px]">
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>
    </li>
  );
};

export default HotelCardSkeleton;
