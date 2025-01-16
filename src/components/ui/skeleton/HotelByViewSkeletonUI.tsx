const HotelByViewSkeletonUI = ({ buttonCount = 9, cardCount = 3 }) => {

  const Views = [
    { id: `all`, label: `전체` },
    { id: `city`, label: `시티뷰` },
    { id: `ocean`, label: `오션뷰` },
    { id: `mountain`, label: `마운틴뷰` },
    { id: `river`, label: `리버뷰` }
  ];

  return (
    <section className="w-full max-w-[1300px] px-[50px] mx-auto h-[850px] py-[80px] pb-[120px]">
      <h3 className="text-[24px] font-semibold">객실 뷰가 아름다운 호텔</h3>
      <p className="text-[18px] text-[#636363] font-normal leading-[1.45]">
        휴식을 취하면서 바라보는 아름다운 뷰는 힐링하는데 큰 도움을 줄 수 있어요.
      </p>

      <div className="flex flex-row gap-2">
        {Views.map((select) => (
          <div
            key={select.id}
            className={`w-[80px] h-[44px] mr-[12px] mt-[28px] items-center flex flex-col justify-center bg-[#fff] text-[#777] border border-[#CDCDCD] rounded-[8px] text-[18px] text-center font-medium outline-none `}
          >
            {select.label}
          </div>
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

export default HotelByViewSkeletonUI;
