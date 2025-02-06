'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import '@/styles/calendar.css';
import Swal from 'sweetalert2';
import useSearchStore from '@/store/useSearchStore';

const CalendarForm = () => {
  
  const checkIn = useSearchStore((state) => state.checkIn);
  const checkOut = useSearchStore((state) => state.checkOut);
  const setCheckIn = useSearchStore((state) => state.setCheckIn);
  const setCheckOut = useSearchStore((state) => state.setCheckOut);

  // 첫 번째 달력 클릭 핸들러
  const handleCalendarStartDateClick = (info: { dateStr: string }) => {
    setCheckIn(info.dateStr);
    validateDates(info.dateStr, checkOut); // 날짜 검증
  };

  // 두 번째 달력 클릭 핸들러
  const handleCalendarFinishDateClick = (info: { dateStr: string }) => {
    setCheckOut(info.dateStr);
    validateDates(checkIn, info.dateStr); // 날짜 검증
  };

  const validateDates = (startDate: string, finishDate: string) => {
    if (startDate && finishDate && new Date(startDate) > new Date(finishDate)) {
      Swal.fire({
        icon: 'warning',
        title: '날짜를 확인해주세요.',
        text: '시작일은 종료일보다 이후여야 합니다.',
        confirmButtonColor: '#B3916A',
        confirmButtonText: '날짜 다시 선택하기'
      });
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
          dateClick={handleCalendarStartDateClick} // 첫 번째 달력 클릭 핸들러
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
            dateClick={handleCalendarFinishDateClick} // 두 번재 달력 클릭 핸들러
            selectable={true} // 날짜 선택 가능
            dayCellContent={(arg) => <span>{arg.date.getDate()}</span>}
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        선택된 날짜: {checkIn} ~ {checkOut}
      </p>
    </div>
  );
};

export default CalendarForm;
