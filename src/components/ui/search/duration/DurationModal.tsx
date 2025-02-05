'use client';

import { useState } from 'react';

import useSearchStore from '@/store/useSearchStore';

import { MonthList } from '@/constants/constant';

import DurationTab from './DurationTab';
import CalendarForm from './CalendarForm';
import FlexibleForm from './FlexibleForm';
import ActionButton from './ActionButton';

const DurationModal = ({ onClose }: { onClose: () => void }) => {
  const { setCheckIn, setCheckOut, setMonth, setStay } = useSearchStore();

  const [tab, setTab] = useState<'date' | 'flexible'>('date'); // 탭 상태

  const [selectedDateRange, setSelectedDateRange] = useState({ start: '', end: '' }); // 날짜 지정 값

  const [selectedStayOption, setSelectedStayOption] = useState(''); // 단일 선택된 숙박 옵션
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // 다중 선택된 달

  const handleDateClick = (info: any) => {
    const clickedDate = info.dateStr;
    console.log(clickedDate);

    if (!selectedDateRange.start || (selectedDateRange.start && selectedDateRange.end)) {
      // 시작 날짜 설정
      setSelectedDateRange({ start: clickedDate, end: '' });
    } else if (!selectedDateRange.end) {
      // 종료 날짜 설정
      if (new Date(clickedDate) >= new Date(selectedDateRange.start)) {
        setSelectedDateRange({ start: selectedDateRange.start, end: clickedDate });
      } else {
        alert('종료 날짜는 시작 날짜 이후여야 합니다.');
      }
    }
  };

  // 저장 버튼
  const handleSaveSchedule = () => {
    if (tab === 'date') {
      const formattedSchedule = `체크인: ${selectedDateRange.start}, 체크아웃: ${selectedDateRange.end}`;
      // 날짜 지정 옵션 저장
      // setCheckIn(selectedDateRange.start);
      // setCheckOut(selectedDateRange.end);
      setCheckIn(formattedSchedule);
      setCheckOut(formattedSchedule);
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
    setStay('');
    setMonth('');
  };

  return (
    <div className="fixed left-1/2 top-1/2 bg-white w-[592px] px-9 p-8 rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-50 transform -translate-x-1/2 -translate-y-1/2">
      <p className="mb-6 text-[18px] text-[#636363] font-normal leading-[1.45]">원하는 일정을 선택해주세요.</p>

      {/* date vs flexible */}
      <DurationTab tab={tab} setTab={setTab} />

      {/* 캘린더 폼 Date 탭 선택 시 렌더링 */}
      {tab === 'date' && (
        <CalendarForm
          selectedDateRange={selectedDateRange}
          handleDateClick={handleDateClick}
        />
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
