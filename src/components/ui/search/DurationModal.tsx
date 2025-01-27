'use client';

import { useState } from 'react';

import useSearchStore from '@/store/useSearchStore';

import { MonthList } from '@/constants/constant';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import FiCalendarIcon from '../icon/FiCalendarIcon';

const DurationModal = ({ left = '36%', top, onClose }: { left?: string; top?: string; onClose: () => void }) => {
  const { setCheckIn, setCheckOut, setMonth, setStay } = useSearchStore();
  const [tab, setTab] = useState<'date' | 'flexible'>('date'); // 탭 상태
  const [selectedDateRange, setSelectedDateRange] = useState({ start: '', end: '' }); // 날짜 지정 값
  const [selectedStayOption, setSelectedStayOption] = useState(''); // 단일 선택된 숙박 옵션
  const [selectedMonth, setSelectedMonth] = useState<string>(''); // 다중 선택된 달

    const handleDateSelect = (info: any) => {
      const { startStr, endStr } = info;
      setSelectedDateRange({ start: startStr, end: endStr });
  };

  // 캘린더 폼 모달 저장 버튼
    const applyChanges = () => {
      if (selectedDateRange.start && selectedDateRange.end) {
        const formattedSchedule = `체크인: ${selectedDateRange.start}, 체크아웃: ${selectedDateRange.end}`;
        setCheckIn(selectedDateRange.start);
        setCheckOut(selectedDateRange.end);
        setMonth(formattedSchedule);
        setStay(formattedSchedule);
      }
    };

  // 저장 버튼
  const handleSaveSchedule = () => {
    if (tab === 'date') {
      const formattedSchedule = `체크인: ${selectedDateRange.start}, 체크아웃: ${selectedDateRange.end}`;
      // 날짜 지정 옵션 저장
      setCheckIn(selectedDateRange.start);
      setCheckOut(selectedDateRange.end);
      setMonth(formattedSchedule);
      setStay(formattedSchedule);
    } else if (tab === 'flexible') {
      // 유동적인 옵션 저장
      const stayDetails = selectedStayOption ? `숙박 옵션: ${selectedStayOption}` : '';
      const monthDetails = selectedMonth ? `여행 월: ${selectedMonth}` : '';
      if (stayDetails || monthDetails) {
        const formattedSchedule = [stayDetails, monthDetails].filter(Boolean).join(' | ');
        setMonth(formattedSchedule);
        setStay(formattedSchedule);
      }
    }
    onClose();
  };

  return (
    <div
      style={{ left, top }}
      className="fixed bg-white w-[592px] px-9 p-8 rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-50"
    >
      {/* 탭 */}
      <div className="w-[270px] h-[43px] mx-auto flex justify-center mb-3 p-1 bg-[#EFEFEF] rounded-full">
        <button
          className={`w-[130px] h-[34px] py-[6px] rounded-full text-base text-center font-semibold ${
            tab === 'date' ? 'bg-[#fff] text-[#B3916A]' : 'bg-[#EFEFEF] text-[#777]'
          }`}
          onClick={() => setTab('date')}
        >
          날짜 지정
        </button>
        <button
          className={`w-[130px] h-[34px] py-[6px] rounded-full text-base text-center font-semibold  ${
            tab === 'flexible' ? 'bg-[#fff] text-[#B3916A]' : 'bg-[#EFEFEF] text-[#777]'
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
                // arg.dayNumber는 날짜 숫자
                return (
                  // 버튼 onClick -> state 넣기
                  <div className="custom-day-cell">
                    {/* <span>{arg.dayNumber}</span> */}
                    <span>{arg.date.getDate()}</span>
                  </div>
                );
              }}
              locale="ko"
              height="274px"
              events={[]}
              selectable
              select={(info) => handleDateSelect(info)}
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
              select={(info) => handleDateSelect(info)}
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
        <div className="mt-10 text-center">
          <p className="mb-3 text-base font-semibold">얼마나 머무를 예정인가요?</p>
          <div className="w-[308px] mx-auto grid grid-cols-4 gap-3 mb-4">
            {['1박', '2~3박', '3~4박', '5~6박'].map((option) => (
              <button
                key={option}
                value={option}
                onClick={() => setSelectedStayOption((prevOption) => (prevOption === option ? '' : option))} // 단일 선택
                className={`w-[76px] h-[36px] px-4 py-2 rounded-full border text-[15px] font-medium hover:bg-[#8F7455] hover:text-white active:bg-[#6B573F] ${
                  selectedStayOption === option
                    ? 'bg-[#B3916A] text-white'
                    : 'bg-white border border-[#e2e2e2] text-[#777]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-10">
            <p className="mb-3 text-base font-semibold">언제 여행을 가시나요?</p>
            <div className="grid grid-cols-6 gap-2">
              {MonthList.map((month) => (
                <button
                  key={month}
                  value={month}
                  onClick={() => setSelectedMonth((prevMonth) => (prevMonth === month ? '' : month))} // 단일 선택
                  className={`h-[96px] flex flex-col items-center justify-center p-2 rounded-lg border 
      hover:bg-[#8F7455] hover:text-white active:bg-[#6B573F] ${
        selectedMonth.includes(month) ? 'bg-[#B3916A] text-white' : 'bg-white border border-[#e2e2e2] text-[#777]'
      } group`}
                >
                  <FiCalendarIcon
                    className={`w-8 h-8 ${
                      selectedMonth.includes(month) ? 'text-white' : 'text-[#A0A0A0]'
                    } group-hover:text-white group-active:text-white`}
                  />
                  <p
                    className={`mt-2 text-[15px] font-medium ${
                      selectedMonth.includes(month) ? 'text-white' : 'text-[#777]'
                    } group-hover:text-white group-active:text-white`}
                  >
                    {month}
                  </p>
                  <span
                    className={`text-sm font-normal leading-[1.45] ${
                      selectedMonth.includes(month) ? 'text-white' : 'text-[#777]'
                    } group-hover:text-white group-active:text-white`}
                  >
                    2025
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={handleSaveSchedule}
              className="w-[124px] mt-8 px-6 py-[10px] bg-[#B3916A] text-white text-[18px] font-semibold rounded-lg hover:bg-[#8F7455] active:bg-[#6B573F]"
            >
              적용하기
            </button>
          </div>
        </div>
      )}

      {/* 적용 버튼 */}
    </div>
  );
};

export default DurationModal;
