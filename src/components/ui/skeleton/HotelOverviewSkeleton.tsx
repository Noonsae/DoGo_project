const HotelOverviewSkeleton = () => {
  return (
    <section
      id="overview"
      className="scroll-mt-20 w-full max-w-[1200px] mx-auto px-[50px] lg:px-[30px] xl:px-[20px] 2xl:px-0"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* 메인 이미지 스켈레톤 */}
        <div className="rounded-lg shadow-md overflow-hidden bg-gray-200 animate-pulse w-[594px] h-[363px]" />

        {/* 추가 이미지 스켈레톤 */}
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden bg-gray-200 animate-pulse w-[300px] h-[175px]"
            />
          ))}
        </div>
      </div>
      {/* 호텔 정보 스켈레톤 */}
      <div className="mt-4 text-center lg:text-left">
        <div className="bg-gray-200 animate-pulse h-8 w-1/3 mx-auto lg:mx-0 rounded"></div>
        <div className="mt-2 flex justify-center lg:justify-start">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse h-4 w-6 mx-1 rounded"></div>
          ))}
        </div>
        <div className="mt-2 bg-gray-200 animate-pulse h-4 w-2/3 mx-auto lg:mx-0 rounded"></div>
        <div className="mt-2 bg-gray-200 animate-pulse h-4 w-2/4 mx-auto lg:mx-0 rounded"></div>
      </div>
    </section>
  );
};

export default HotelOverviewSkeleton;
