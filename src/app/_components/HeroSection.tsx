import React from 'react'
import SearchSection from './SearchSection';

const HeroSection = () => {
  return (
    <section className="w-full pb-[65px] bg-[#221A1A]">
      <div className="max-w-[1200px] h-[556px] mx-auto flex flex-col justify-center items-center text-center text-white">
        <h2 className="text-[40px] font-semibold">TITLE</h2>
        <h3 className="text-[24px] leading-[1.45]">sub title</h3>
      </div>
      <SearchSection />
    </section>
  );
}

export default HeroSection