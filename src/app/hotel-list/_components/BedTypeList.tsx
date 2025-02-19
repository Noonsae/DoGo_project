//TODO 타입파일 정리
interface BedTypeListProps {
  selectedBeds: string[];
  onBedChange: (bedType: string) => void; // string으로 수정
}

const bedTypes = ['싱글', '더블', '트윈']; // 침대 타입 배열

const BedTypeList = ({ selectedBeds, onBedChange }: BedTypeListProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-[32px] mt-10">침대 종류</h3>
      <ul className="flex flex-col gap-4">
        {bedTypes.map((bed) => (
          <li key={bed} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`bed-${bed}`}
              checked={selectedBeds.includes(bed)}
              onChange={() => onBedChange(bed)} // `bedType`을 string으로 처리
              className="w-5 h-5 border-neutral-600 rounded-[9999px] cursor-pointer"
            />
            <label htmlFor={`bed-${bed}`} className="text-neutral-600 cursor-pointer">
              {bed}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BedTypeList;
