import useSearchStore from '@/store/useSearchStore';
import FiCalendarIcon from '../../icon/FiCalendarIcon';
import Swal from 'sweetalert2';

const FlexibleForm = ({ MonthList }: { MonthList: { name: string; value: number }[] }) => {
  const stay = useSearchStore((state) => state.stay);
  const setStay = useSearchStore((state) => state.setStay);
  const month = useSearchStore((state) => state.month);
  const setMonth = useSearchStore((state) => state.setMonth);

  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="mt-10 text-center">
      <p className="mb-3 text-base font-semibold">얼마나 머무를 예정인가요?</p>
      <div className="w-[396px] mx-auto grid grid-cols-5 gap-3 mb-4">
        {[1, 2, 3, 4, 5].map((option) => (
          <button
            key={option}
            value={option}
            onClick={() => {
              if (stay === option) {
                setStay(null);
              } else {
                setStay(option);
              }
            }} // 단일 선택
            className={`w-[76px] h-[36px] px-4 py-2 rounded-full border text-[15px] font-medium hover:bg-[#8F7455] hover:text-white active:bg-[#6B573F] ${
              stay === option ? 'bg-[#B3916A] text-white' : 'bg-white border border-[#e2e2e2] text-[#777]'
            }`}
          >
            {option}박
          </button>
        ))}
      </div>
      <div className="mt-10">
        <p className="mb-3 text-base font-semibold">언제 여행을 가시나요?</p>
        <div className="grid grid-cols-6 gap-2">
          {MonthList.map((m) => (
            <button
              key={m.value}
              value={m.value}
              onClick={() => {
                if (m.value < currentMonth) {
                  Swal.fire({
                    title: '날짜를 확인해주세요.',
                    text: '이전 날짜는 선택할 수 없습니다.',
                    icon: 'error',
                    confirmButtonText: '확인'
                  });
                }
                if (m.value === month) {
                  setMonth(null);
                } else {
                  setMonth(m.value);
                }
              }} // 단일 선택
              className={`h-[96px] flex flex-col items-center justify-center p-2 rounded-lg border 
              hover:bg-[#8F7455] hover:text-white active:bg-[#6B573F] ${
                month === m.value ? 'bg-[#B3916A] text-white' : 'bg-white border border-[#e2e2e2] text-[#777]'
              } group`}
            >
              <FiCalendarIcon
                className={`w-8 h-8 ${
                  month === m.value ? 'text-white' : 'text-[#A0A0A0]'
                } group-hover:text-white group-active:text-white`}
              />
              <p
                className={`mt-2 text-[15px] font-medium ${
                  month === m.value ? 'text-white' : 'text-[#777]'
                } group-hover:text-white group-active:text-white`}
              >
                {m.name}
              </p>
              <span
                className={`text-sm font-normal leading-[1.45] ${
                  month === m.value ? 'text-white' : 'text-[#777]'
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
