'use client';

import { useState } from 'react';

import useSearchStore from '@/store/useSearchStore';

const DurationModal = (right ) => {
  const { setCheckIn, setCheckOut } = useSearchStore();
  const [tab, setTab] = useState<'date' | 'flexible'>('date'); // 탭 상태
  const [selectedDateRange, setSelectedDateRange] = useState({ start: '', end: '' }); // 날짜 지정 값
  const [selectedFlexibleOption, setSelectedFlexibleOption] = useState(''); // 유동적인 값

  const applyChanges = () => {
    if (tab === 'date') {
      setCheckIn(selectedDateRange.start);
      setCheckOut(selectedDateRange.end);
    }
  };

  return (
    <div className="fixed bg-white w-[400px] p-6 rounded-lg z-50">
      {/* 탭 */}
      <div className="flex justify-around mb-6">
        <button
          className={`py-2 px-4 rounded ${tab === 'date' ? 'bg-[#B3916A] text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('date')}
        >
          날짜 지정
        </button>
        <button
          className={`py-2 px-4 rounded ${tab === 'flexible' ? 'bg-[#B3916A] text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('flexible')}
        >
          유동적인
        </button>
      </div>

      {/* 날짜 지정 폼 */}
      {tab === 'date' && (
        <div>
          <p className="mb-4">달력 폼이 들어갈 자리 (FullCalendar 라이브러리 활용 가능)</p>
          <input
            type="text"
            placeholder="체크인 날짜"
            value={selectedDateRange.start}
            onChange={(e) => setSelectedDateRange({ ...selectedDateRange, start: e.target.value })}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="체크아웃 날짜"
            value={selectedDateRange.end}
            onChange={(e) => setSelectedDateRange({ ...selectedDateRange, end: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
      )}

      {/* 유동적인 폼 */}
      {tab === 'flexible' && (
        <div>
          <p className="mb-4">얼마나 머무를 예정인가요?</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {['1박', '2~3박', '3~4박', '5~6박'].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedFlexibleOption(option)}
                className={`px-4 py-2 rounded border ${
                  selectedFlexibleOption === option ? 'bg-[#B3916A] text-white' : 'bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mb-4">언제 여행을 가시나요?</p>
          <div className="flex flex-wrap gap-2">
            {['January 2025', 'February 2025', 'March 2025', 'April 2025', 'May 2025'].map((month) => (
              <button
                key={month}
                onClick={() => setSelectedFlexibleOption(month)}
                className={`px-4 py-2 rounded border ${
                  selectedFlexibleOption === month ? 'bg-[#B3916A] text-white' : 'bg-gray-200'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 적용 버튼 */}
      <button onClick={applyChanges} className="mt-6 bg-[#B3916A] text-white py-2 px-4 rounded w-full">
        적용하기
      </button>
    </div>
  );
};

export default DurationModal;
