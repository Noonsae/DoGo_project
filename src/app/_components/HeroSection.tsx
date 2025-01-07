import React from 'react'
import SearchSection from './SearchSection';

const HeroSection = () => {
  return (
    <section className="w-full pb-[65px] bg-[#E3E3E3]">
      <div className="max-w-[1200px] h-[556px] mx-auto flex flex-col justify-center items-center text-center">
        <h2 className="text-[40px]">뉴진스의 하우스윗이요</h2>
        <p className="text-[24px] text-[#7E7E7E]">
          톡시 러버~ 류노베러~ 거기 숨지말고 빨리나와~
          <br />u little demon in my 스토리라인~ 돈녹얼마도얼 얼른 나가버려~
        </p>
      </div>
      <SearchSection />
    </section>
  );
}

export default HeroSection