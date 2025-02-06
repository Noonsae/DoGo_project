'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

import useSearchStore from '@/store/useSearchStore';

import Swal from 'sweetalert2';

import '@/styles/calendar.css';

const CalendarForm = () => {
  const checkIn = useSearchStore((state) => state.checkIn);
  const setCheckIn = useSearchStore((state) => state.setCheckIn);
  const checkOut = useSearchStore((state) => state.checkOut);
  const setCheckOut = useSearchStore((state) => state.setCheckOut);

  const today = new Date();

  // 날짜 유효성 검증 함수 - 시작일은 종료일보다
  const isValidDateRange = (startDate: string, finishDate: string) => {
    if (startDate && finishDate && new Date(startDate) > new Date(finishDate)) {
      Swal.fire({
        icon: 'warning',
        title: '날짜를 확인해주세요.',
        text: '종료일이 시작일보다 이릅니다.',
        confirmButtonColor: '#B3916A',
        confirmButtonText: '날짜 다시 선택하기'
      });
      return false;
    }
    return true;
  };

  // 부모 태그의 특정 class를 추가해서 커스텀 스타일링
  document.querySelectorAll('.child').forEach((child) => {
    if (child.classList.contains('fc-highlight')) {
      child.parentElement?.classList.add('parent-highlight');
    }
  });

  // 첫 번째 달력 클릭 핸들러
  const handleCalendarStartDateClick = (info: { dateStr: string }) => {
    const selectedDate = new Date(info.dateStr);

    if (selectedDate < today) {
      Swal.fire({
        icon: 'warning',
        title: '날짜를 확인해주세요.',
        text: '시작일은 오늘 이전으로 선택할 수 없습니다.',
        confirmButtonColor: '#B3916A',
        confirmButtonText: '날짜 다시 선택하기'
      });
      return; // 날짜 선택 무효화
    }

    if (!checkOut || isValidDateRange(info.dateStr, checkOut)) {
      setCheckIn(info.dateStr);
    }
  };

  // 두 번째 달력 클릭 핸들러
  const handleCalendarFinishDateClick = (info: { dateStr: string }) => {
    const selectedDate = new Date(info.dateStr);

    if (selectedDate < today) {
      Swal.fire({
        icon: 'warning',
        title: '날짜를 확인해주세요.',
        text: '종료일은 오늘 이전으로 선택할 수 없습니다.',
        confirmButtonColor: '#B3916A',
        confirmButtonText: '날짜 다시 선택하기'
      });
      return; // 날짜 선택 무효화
    }

    if (!checkIn || isValidDateRange(checkIn, info.dateStr)) {
      setCheckOut(info.dateStr);
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
      <p className="text-sm text-gray-700 font-normal">
        선택된 날짜 : &nbsp;
        <span className=" text-base text-[#B3916A] font-normal">{checkIn}</span> ~{' '}
        <span className=" text-base text-[#B3916A] font-normal">{checkOut}</span>
      </p>
    </div>
  );
};

export default CalendarForm;
