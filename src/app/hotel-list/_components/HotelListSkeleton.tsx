import React from 'react';

const HotelListSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-8">
      <div className="rounded-[12px] shadow-[0px_4px_8px_rgba(0,0,0,0.1)] bg-gray-300 p-[16px]">
        <div className="flex">
          {/* 이미지 스켈레톤 */}
          <div className="h-[240px] w-[324px] bg-gray-400 rounded-md"></div>

          {/* 텍스트 스켈레톤 */}
          <div className="flex-1 space-y-6 ml-6">
            <div className="h-8 bg-gray-400 rounded"></div>
            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            <div className="h-4 bg-gray-400 rounded"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelListSkeleton;
