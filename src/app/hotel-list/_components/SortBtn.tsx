import React, { ChangeEvent } from 'react';

// Props 타입 정의
interface SortBtnType {
  sortOrder: string; // 선택된 정렬 순서
  handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void; // onChange 핸들러
}

const SortBtn = ({ sortOrder, handleSortChange }: SortBtnType) => {
  return (
    <div>
      <select
        value={sortOrder} // 선택된 값
        onChange={handleSortChange} // 변경 이벤트 핸들러
        id="sortOrder"
        className="h-[50px] w-[150px] border rounded-md ml-14"
      >
        <option value="">가격 정렬</option>
        <option value="asc">낮은 가격 순</option>
        <option value="desc">높은 가격 순</option>
      </select>
    </div>
  );
};

export default SortBtn;
