import SearchBox from '../../components/ui/search/SearchBox';

const HeroSection = () => {
  return (
    <section className="w-full h-[520px] bg-[#221A1A]">
      <div className="max-w-[1300px] h-full  px-[50px] mx-auto pt-[180px] text-center text-white">
        <h2 className="mb-[12px] text-[40px] font-semibold ">TITLE</h2>
        <h3 className="text-[24px] font-normal leading-[1.45]">sub title</h3>
      </div>
      <SearchBox />
    </section>
  );
};

export default HeroSection;
