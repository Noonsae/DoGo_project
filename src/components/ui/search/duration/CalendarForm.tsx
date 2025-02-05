'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import '@/styles/calendar.css';
import Swal from 'sweetalert2';

const CalendarForm = ({
  selectedDateRange,
  setSelectedDateRange
}: {
  selectedDateRange: { start: string; end: string };
  setSelectedDateRange: (range: { start: string; end: string }) => void;
}) => {
  const handleDateClick = (info: { dateStr: string }) => {
    const clickedDate = info.dateStr;

    if (!selectedDateRange.start || (selectedDateRange.start && selectedDateRange.end)) {
      // 시작 날짜 설정
      setSelectedDateRange({ start: clickedDate, end: '' });
    } else if (!selectedDateRange.end) {
      // 종료 날짜 설정
      if (new Date(clickedDate) >= new Date(selectedDateRange.start)) {
        setSelectedDateRange({ start: selectedDateRange.start, end: clickedDate });
      } else {
        Swal.fire({
          icon: 'warning',
          title: '날짜를 확인해주세요.',
          text: '시작일은 종료일보다 이후여야 합니다.',
          confirmButtonColor: '#B3916A',
          confirmButtonText: '날짜 다시 선택하기'
        });
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* 첫 번째 달력 */}
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          height="274px"
          dayMaxEventRows
          headerToolbar={{
            left: 'prev', // 왼쪽: 이전
            center: 'title', // 중앙: 제목
            right: 'next' // 오른쪽: 다음
          }}
          dateClick={handleDateClick} // 날짜 클릭 이벤트 핸들러
          selectable={true} // 날짜 선택 가능
          dayCellContent={(arg) => <span>{arg.date.getDate()}</span>}
        />

        {/* 두 번째 달력 */}
        <div className="h-[274px]">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="ko"
            height="274px"
            dayMaxEventRows
            headerToolbar={{
              left: 'prev', // 왼쪽: 이전
              center: 'title', // 중앙: 제목
              right: 'next' // 오른쪽: 다음
            }}
            initialDate={new Date(new Date().setMonth(new Date().getMonth() + 1))} // 다음 달 표시
            dateClick={handleDateClick} // 날짜 클릭 이벤트 핸들러
            selectable={true} // 날짜 선택 가능
            dayCellContent={(arg) => <span>{arg.date.getDate()}</span>}
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        선택된 날짜: {selectedDateRange.start || '없음'} ~ {selectedDateRange.end || '없음'}
      </p>
    </div>
  );
};

export default CalendarForm;
