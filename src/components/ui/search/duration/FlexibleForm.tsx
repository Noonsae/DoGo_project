import FiCalendarIcon from '../../icon/FiCalendarIcon';

const FlexibleForm = ({
  selectedStayOption,
  setSelectedStayOption,
  selectedMonth,
  setSelectedMonth,
  MonthList
}: {
  selectedStayOption: string;
  setSelectedStayOption: (value: string | ((prevOption: string) => string)) => void;
  selectedMonth: string;
  setSelectedMonth: (value: string | ((prevMonth: string) => string)) => void;
  MonthList: string[];
}) => {
  return (
    <div className="mt-10 text-center">
      <p className="mb-3 text-base font-semibold">얼마나 머무를 예정인가요?</p>
      <div className="w-[396px] mx-auto grid grid-cols-5 gap-3 mb-4">
        {['1박', '2박', '3박', '4박', '5박'].map((option) => (
          <button
            key={option}
            value={option}
            onClick={() => setSelectedStayOption((prevOption) => (prevOption === option ? '' : option))} // 단일 선택
            className={`w-[76px] h-[36px] px-4 py-2 rounded-full border text-[15px] font-medium hover:bg-[#8F7455] hover:text-white active:bg-[#6B573F] ${
              selectedStayOption === option ? 'bg-[#B3916A] text-white' : 'bg-white border border-[#e2e2e2] text-[#777]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-10">
        <p className="mb-3 text-base font-semibold">언제 여행을 가시나요?</p>
        <div className="grid grid-cols-6 gap-2">
          {MonthList.map((month) => (
            <button
              key={month}
              value={month}
              onClick={() => setSelectedMonth((prevMonth) => (prevMonth === month ? '' : month))} // 단일 선택
              className={`h-[96px] flex flex-col items-center justify-center p-2 rounded-lg border 
      hover:bg-[#8F7455] hover:text-white active:bg-[#6B573F] ${
        selectedMonth.includes(month) ? 'bg-[#B3916A] text-white' : 'bg-white border border-[#e2e2e2] text-[#777]'
      } group`}
            >
              <FiCalendarIcon
                className={`w-8 h-8 ${
                  selectedMonth.includes(month) ? 'text-white' : 'text-[#A0A0A0]'
                } group-hover:text-white group-active:text-white`}
              />
              <p
                className={`mt-2 text-[15px] font-medium ${
                  selectedMonth.includes(month) ? 'text-white' : 'text-[#777]'
                } group-hover:text-white group-active:text-white`}
              >
                {month}
              </p>
              <span
                className={`text-sm font-normal leading-[1.45] ${
                  selectedMonth.includes(month) ? 'text-white' : 'text-[#777]'
                } group-hover:text-white group-active:text-white`}
              >
                2025
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlexibleForm;
