import SearchBox from '../../components/ui/search/SearchBox';

const HeroSection = () => {
  return (
    <section className="w-full h-[520px] bg-[#221A1A]">
      <div className="max-w-[1300px] h-full  px-[50px] mx-auto pt-[180px] text-center text-white">
        <h2 className="mb-[12px] text-[40px] font-medium ">여행의 시작, DoGo</h2>
        <h3 className="text-[24px] font-normal leading-[1.45]">특별한 하루를 위한 최고의 선택</h3>
      </div>
      <SearchBox />
    </section>
  );
};

export default HeroSection;
