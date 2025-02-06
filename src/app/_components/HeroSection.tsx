import SearchBox from '../../components/ui/search/SearchBox';

const HeroSection = () => {
  return (
    <section className="w-full h-[520px] bg-[#221A1A]">
      <div className="max-w-[1300px] h-full  px-[50px] mx-auto pt-[180px] text-center text-white">
        <h2 className="mb-[12px] text-[40px] text-[#FDF9F4] font-semibold">품격 있는 여행의 시작, DoGo</h2>
        <h3 className="text-[24px] text-[#FDF9F4] opacity-80 font-normal leading-[1.45]">
          당신의 특별한 하루를 더욱 빛나게 만들어줄 최고의 선택
        </h3>
      </div>
      <SearchBox />
    </section>
  );
};

export default HeroSection;
