const ActionButton = ({
  handleResetSchedule,
  handleSaveSchedule
}: {
  handleResetSchedule: () => void; // 반환값이 없는 함수
  handleSaveSchedule: () => void; // 반환값이 없는 함수
}) => {
  return (
    <div className="w-full flex justify-end">
      <button
        onClick={handleResetSchedule}
        className="w-[124px] mt-8 px-6 py-[10px] text-[18px] font-semibold text-[#B3916A] hover:text-[#8f7455]"
      >
        초기화
      </button>
      <button
        onClick={handleSaveSchedule}
        className="w-[124px] mt-8 px-6 py-[10px] bg-[#B3916A] text-white text-[18px] font-semibold rounded-lg hover:bg-[#8F7455] active:bg-[#6B573F]"
      >
        적용하기
      </button>
    </div>
  );
};

export default ActionButton;
