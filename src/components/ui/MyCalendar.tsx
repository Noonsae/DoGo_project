// components/ui/MyCalendar.tsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const MyCalendar = () => {
  const handleDateClick = (info: any) => {
    alert(`Date clicked: ${info.dateStr}`);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek" // 주간 시간대 보기
      timeZone="Asia/Seoul" // 한국 시간대 적용
      locale="ko" // 한국어 지원
      editable={true}
      selectable={true}
      events={[
        { title: '회의', start: '2025-01-05T10:00:00', end: '2025-01-05T11:00:00' },
        { title: '워크샵', start: '2025-01-10T14:00:00', end: '2025-01-10T16:00:00' }
      ]}
      dateClick={handleDateClick}
    />
  );
};

export default MyCalendar;
