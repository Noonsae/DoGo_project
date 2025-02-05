import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarForm = ({
  handleDateSelect,
  selectedDateRange
}: {
  handleDateSelect: (info: any) => void;
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
    </div>
  );
};

export default CalendarForm;
