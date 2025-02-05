// Tabs.tsx
const DurationTab = ({ tab, setTab }: { tab: string; setTab: (value: 'date' | 'flexible') => void }) => {
  return (
    <div className="w-[270px] h-[43px] mx-auto flex justify-center mb-3 p-1 bg-[#EFEFEF] rounded-full">
      <button
        className={`w-[130px] h-[34px] py-[6px] rounded-full text-base text-center font-semibold ${
          tab === 'date' ? 'bg-[#fff] text-[#B3916A]' : 'bg-[#EFEFEF] text-[#777]'
        }`}
        onClick={() => setTab('date')}
      >
        날짜 지정
      </button>
      <button
        className={`w-[130px] h-[34px] py-[6px] rounded-full text-base text-center font-semibold ${
          tab === 'flexible' ? 'bg-[#fff] text-[#B3916A]' : 'bg-[#EFEFEF] text-[#777]'
        }`}
        onClick={() => setTab('flexible')}
      >
        유동적인
      </button>
    </div>
  );
};

export default DurationTab;
