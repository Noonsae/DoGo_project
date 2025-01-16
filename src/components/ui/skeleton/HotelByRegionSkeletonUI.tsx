const HotelByRegionSkeletonUI = ({ buttonCount = 9, cardCount = 3 }) => {

  const buttonClass = 'w-[80px] h-[44px] bg-gray-300 animate-pulse';

  return (
    <section className="w-full max-w-[1300px] px-[50px] mx-auto h-[850px] py-[80px] pb-[120px]">
      <h3 className="text-[24px] font-semibold">많은 회원이 높은 평가를 준 호텔</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45]">
        지역별로 인기가 가장 많았던 호텔을 추천해 드릴게요.
      </p>

      <div className="w-full max-w-[1200px] flex flex-wrap items-center gap-3 mt-[28px] rounded-[8px]">
        {[...Array(buttonCount)].map((_, idx) => (
          <div key={idx} className={buttonClass}></div>
        ))}
      </div>

      <div className="w-full max-w-[1200px] h-[548px] flex flex-row items-center gap-[30px] mt-8">
        {[...Array(cardCount)].map((_, idx) => (
          <div
            key={idx}
            className="w-[380px] h-[484px] p-[16px] rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] bg-gray-100 animate-pulse"
          >
            <div className="w-full h-[292px] rounded-[12px] bg-gray-300"></div>
            <div className="mt-[12px] h-[32px] w-[70%] bg-gray-300 rounded"></div>
            <div className="mt-[8px] h-[24px] w-[50%] bg-gray-300 rounded"></div>
            <div className="mt-[11px] h-[24px] w-[30%] bg-gray-300 rounded"></div>
            <div className="mt-[24px] h-[32px] w-[40%] bg-gray-300 rounded ml-auto"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelByRegionSkeletonUI;
