"use client"

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@/styles/calendar.css';

const CalendarForm = ({
  handleDateClick,
  selectedDateRange
}: {
  handleDateClick: (info: any) => void;
  selectedDateRange: { start: string; end: string };
}) => {
  return (
    <div>
      <p className="mb-4 text-lg font-semibold">날짜 선택</p>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* 첫 번째 달력 */}
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          height="274px"
          events={[]}
          dayMaxEventRows
          headerToolbar={false}
          dateClick={handleDateClick} // 날짜 클릭 이벤트 핸들러
          dayCellContent={(arg) => <span>{arg.date.getDate()}</span>}
        />

        {/* 두 번째 달력 */}
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          height="274px"
          events={[]}
          dayMaxEventRows
          headerToolbar={false}
          initialDate={new Date(new Date().setMonth(new Date().getMonth() + 1))} // 다음 달 표시
          dateClick={handleDateClick} // 날짜 클릭 이벤트 핸들러
          dayCellContent={(arg) => <span>{arg.date.getDate()}</span>}
        />
      </div>
      <p className="text-sm text-gray-500">
        선택된 날짜: {selectedDateRange.start || '없음'} ~ {selectedDateRange.end || '없음'}
      </p>
    </div>
  );
};

export default CalendarForm;
