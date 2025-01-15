import React from 'react';

const HotelReviews = () => {
  return (
    <div>
      <section id="reviews" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">이용 후기</h2>
        <div className="flex gap-[30px]">
          <p className="w-[585px] h-[368px] bg-slate-400">이곳은 이용 후기를 보여주는 콘텐츠 영역입니다.</p>
          <p className="w-[585px] h-[368px] bg-slate-400">이곳은 이용 후기를 보여주는 콘텐츠 영역입니다.</p>
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-6 py-2 bg-[#B3916A] text-white rounded-lg shadow-md hover:bg-brown-500">
            전체 후기 보러가기
          </button>
        </div>
      </section>
    </div>
  );
};

export default HotelReviews;
