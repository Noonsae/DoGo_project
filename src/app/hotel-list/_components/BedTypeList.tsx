import React from 'react';

interface BedTypeListProps {
  selectedBeds: string[];
  onBedChange: (bedType: string) => void; // string으로 수정
}

const bedTypes = ['싱글', '더블', '트윈']; // 침대 타입 배열

const BedTypeList: React.FC<BedTypeListProps> = ({ selectedBeds, onBedChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">침대 종류</h3>
      <ul className="flex flex-col gap-2">
        {bedTypes.map((bed) => (
          <li key={bed} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`bed-${bed}`}
              checked={selectedBeds.includes(bed)}
              onChange={() => onBedChange(bed)} // `bedType`을 string으로 처리
              className="w-5 h-5 border-gray-400 rounded-md cursor-pointer"
            />
            <label htmlFor={`bed-${bed}`} className="cursor-pointer">
              {bed}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BedTypeList;
