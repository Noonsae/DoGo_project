import React from 'react';

const HotelBoxSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-8 w-full max-w-[1180px] mx-auto animate-pulse">
      {/* 첫 번째 박스 */}
      <div className="bg-white rounded-lg p-6 border w-full">
        <div className="flex items-center mb-4">
          <div className="bg-gray-300 rounded-full w-12 h-12"></div>
          <div className="ml-3 w-28 h-5 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
      </div>

      {/* 두 번째 박스 */}
      <div className="bg-white rounded-lg p-4 border w-full">
        <div className="w-32 h-5 bg-gray-300 rounded mb-3"></div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 세 번째 박스 */}
      <div className="bg-white rounded-lg p-4 border w-full">
        <div className="w-32 h-5 bg-gray-300 rounded mb-4"></div>
        <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default HotelBoxSkeleton;
