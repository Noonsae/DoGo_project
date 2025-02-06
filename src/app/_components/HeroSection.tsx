import SearchBox from '../../components/ui/search/SearchBox';

const HeroSection = () => {
  return (
    <section className="w-full lg:h-[520px] xxs:h-[250px] bg-[#221A1A]">
      <div className="max-w-[1300px] h-full px-[50px] mx-auto lg:pt-[180px] xxs:pt-[88px] text-center text-white">
        <h2 className="lg:mb-[12px] xxs:mb-2 lg:text-[40px] text-[#FDF9F4] font-semibold xxs:text-[24px]">
          품격 있는 여행의 시작, DoGo
        </h2>
        <h3 className="lg:text-[24px] xxs:text-[18px] text-[#FDF9F4] opacity-80 font-normal leading-[1.45]">
          당신의 특별한 하루를 더욱 빛나게
          <span className='xxs:hidden sm:inline '>만들어줄 최고의 선택</span>
        </h3>
      </div>
      <SearchBox />
    </section>
  );
};

export default HeroSection;
