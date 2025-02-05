'use client';

import { useState } from 'react';

import useSearchStore from '@/store/useSearchStore';

import { MonthList } from '@/constants/constant';

import DurationTab from './DurationTab';
import CalendarForm from './CalendarForm';
import FlexibleForm from './FlexibleForm';
import ActionButton from './ActionButton';

import { today_date } from '@/utils/todayCalculator';

const DurationModal = ({
  tab,
  setTab,
  onClose
}: {
  tab: 'date' | 'flexible';
  setTab: (value: 'date' | 'flexible') => void;
  onClose: () => void;
}) => {
  const { setCheckIn, setCheckOut, setMonth, setStay } = useSearchStore();

  const [selectedDateRange, setSelectedDateRange] = useState({ start: today_date, end: '' }); // 날짜 지정 값

  const [selectedStayOption, setSelectedStayOption] = useState(''); // 단일 선택된 숙박 옵션
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // 다중 선택된 달

  // 저장 버튼
  const handleSaveSchedule = () => {
    if (tab === 'date') {
      const checkIn_schedule = selectedDateRange.start;
      const checkOut_schedule = selectedDateRange.end;

      setCheckIn(checkIn_schedule);
      setCheckOut(checkOut_schedule);
    } else if (tab === 'flexible') {
      // 유동적인 옵션 저장
      const stayDetails = selectedStayOption ? `숙박 옵션: ${selectedStayOption}` : '';
      const monthDetails = selectedMonth ? `여행 월: ${selectedMonth}` : '';

      // 각각 별도로 상태 업데이트
      if (stayDetails) {
        setStay(stayDetails); // 숙박 옵션만 업데이트
      }
      if (monthDetails) {
        setMonth(monthDetails); // 여행 월만 업데이트
      }

      console.log(selectedStayOption, selectedMonth);
    }
    onClose();
  };

  // 초기화 버튼
  const handleResetSchedule = () => {
    // ToDo : checkIn, checkOut
    setSelectedStayOption('');
    setSelectedMonth('');
    setCheckIn('');
    setCheckOut('');
    setStay('');
    setMonth('');
    setSelectedDateRange({ start: today_date, end: '' });
  };

  return (
    <div className="fixed left-1/2 top-1/2 bg-white w-[592px] px-9 p-8 rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-50 transform -translate-x-1/2 -translate-y-1/2">
      <p className="mb-6 text-[18px] text-[#636363] font-normal leading-[1.45]">원하는 일정을 선택해주세요.</p>

      {/* date vs flexible */}
      <DurationTab tab={tab} setTab={setTab} />

      {/* 캘린더 폼 Date 탭 선택 시 렌더링 */}
      {tab === 'date' && (
        <CalendarForm selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange} />
      )}

      {/* 유동적인 계획 탭 선택 시 렌더링 */}
      {tab === 'flexible' && (
        <FlexibleForm
          selectedStayOption={selectedStayOption}
          setSelectedStayOption={setSelectedStayOption}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          MonthList={MonthList}
        />
      )}

      {/* 적용 버튼 */}
      <ActionButton handleResetSchedule={handleResetSchedule} handleSaveSchedule={handleSaveSchedule} />
    </div>
  );
};

export default DurationModal;
