'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import useSearchStore from '@/store/useSearchStore';

const DurationModal = ({ left = '36%', top }: { left?: string; top?: string }) => {
  const { setCheckIn, setCheckOut } = useSearchStore();
  const [tab, setTab] = useState<'date' | 'flexible'>('date'); // 탭 상태
  const [selectedDates, setSelectedDates] = useState<{ start?: Date; end?: Date }>({}); // 달력에서 선택한 날짜
  const [selectedFlexibleOption, setSelectedFlexibleOption] = useState(''); // 유동적인 옵션

  const applyChanges = () => {
    if (tab === 'date' && selectedDates.start && selectedDates.end) {
      setCheckIn(selectedDates.start.toISOString().split('T')[0]);
      setCheckOut(selectedDates.end.toISOString().split('T')[0]);
    } else if (tab === 'flexible') {
      console.log('유동적인 옵션:', selectedFlexibleOption);
    }
  };

  const handleDateSelect = (info: any) => {
    if (!selectedDates.start) {
      setSelectedDates({ start: info.start });
    } else {
      setSelectedDates({ start: selectedDates.start, end: info.end });
    }
  };

  return (
    <div
      style={{ left, top }}
      className="fixed bg-white w-[400px] p-6 rounded-lg z-50 shadow-lg"
    >
      {/* 탭 */}
      <div className="flex justify-around mb-6">
        <button
          className={`py-2 px-4 rounded ${
            tab === 'date' ? 'bg-[#B3916A] text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTab('date')}
        >
          날짜 지정
        </button>
        <button
          className={`py-2 px-4 rounded ${
            tab === 'flexible' ? 'bg-[#B3916A] text-white' : 'bg-gray-200'
          }`}
          onClick={() => setTab('flexible')}
        >
          유동적인
        </button>
      </div>

      {/* 날짜 지정 폼 */}
      {tab === 'date' && (
        <div>
          <p className="mb-4 text-lg font-semibold">날짜 선택</p>
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* 첫 번째 달력 */}
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              dayCellContent={(arg) => {
                console.log({ arg });
                return (
                  <div className="custom-day-cell">
                    <span>{arg.date.getDate()}</span>
                  </div>
                );
              }}
              locale="ko"
              height="274px"
              events={[]}
              selectable
              select={handleDateSelect}
              headerToolbar={false}
              dayMaxEventRows
            />

            {/* 두 번째 달력 */}
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale="ko"
              height="274px"
              events={[]}
              selectable
              select={handleDateSelect}
              headerToolbar={false}
              dayMaxEventRows
              initialDate={new Date(new Date().setMonth(new Date().getMonth() + 1))} // 다음 달 표시
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={applyChanges}
              className="w-[124px] mt-8 px-6 py-[10px] bg-[#B3916A] text-white text-[18px] font-semibold rounded-lg hover:bg-[#8F7455] active:bg-[#6B573F]"
            >
              적용하기
            </button>
          </div>
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
    </div>
  );
};

export default DurationModal;
