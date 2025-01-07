import React from 'react';

const AsideFilter = () => {
  return (
    <aside className="w-[266px] h-[1825px] p-4 border border-gray-300 rounded-md bg-gray-50">
      <h2 className="text-lg font-bold mb-4">필터</h2>
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">가격</h3>
        {/* 가격 필터 */}
        <input type="range" min="0" max="30000000" step="100000" className="w-full" />
      </div>
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">평점</h3>
        {/* 평점 필터 */}
        <ul>
          <li>
            <input type="radio" id="rating1" name="rating" />
            <label htmlFor="rating1" className="ml-2">
              5점
            </label>
          </li>
          <li>
            <input type="radio" id="rating2" name="rating" />
            <label htmlFor="rating2" className="ml-2">
              4점 이상
            </label>
          </li>
        </ul>
      </div>
      <div>
        <h3>침대 갯수</h3>
        <li>
          <input type="radio" id="rating3" name="rating" />
          <label htmlFor="rating3">더블침대 1개</label>
          <input type="radio" id="rating4" name="rating" />
          <label htmlFor="rating4">침대 2개</label>
        </li>
        <li>
          <input type="radio" id="rating5" name="rating" />
          <label htmlFor="rating5">더블침대 2개</label>
          <input type="radio" id="rating6" name="rating" />
          <label htmlFor="rating6">침대 3개</label>
        </li>
      </div>
      {/* 추가 필터 섹션 */}
      <div>
        <h3 className="text-md font-semibold mb-2">공용 시설</h3>
        <ul>
          <li>
            <input type="checkbox" id="facility1" />
            <label htmlFor="facility1" className="ml-2">
              Wi-Fi
            </label>
          </li>
          <li>
            <input type="checkbox" id="facility2" />
            <label htmlFor="facility2" className="ml-2">
              주차장
            </label>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AsideFilter;
