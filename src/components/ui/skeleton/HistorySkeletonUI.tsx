const HistorySkeletonUI = () => {
  return (
    <section className="w-full max-w-[1300px] px-[50px] pt-[80px] pb-[120px] mx-auto h-[748px]">
      <h3 className="text-[24px] font-semibold">최근 본 호텔 상품</h3>
      <div className="w-full max-w-[1200px] h-[548px] flex flex-row justify-between items-center gap-[30px] mt-8">
        {[...Array(3)].map((_, idx) => (
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

export default HistorySkeletonUI;