'use client';

import useSearchStore from '@/store/useSearchStore';

import { MonthList } from '@/constants/constant';

import DurationTab from './DurationTab';
import CalendarForm from './CalendarForm';
import FlexibleForm from './FlexibleForm';
import ActionButton from './ActionButton';

const DurationModal = ({
  tab,
  setTab,
  onClose
}: {
  tab: 'date' | 'flexible';
  setTab: (value: 'date' | 'flexible') => void;
  onClose: () => void;
}) => {

  const setCheckIn = useSearchStore((state) => state.setCheckIn);
  const setCheckOut = useSearchStore((state) => state.setCheckOut);
  const setStay = useSearchStore((state) => state.setStay);
  const setMonth = useSearchStore((state) => state.setMonth);

  // 저장 버튼
  const handleSaveSchedule = () => {
    onClose();
  };

  // 초기화 버튼
  const handleResetSchedule = () => {
    setCheckIn('');
    setCheckOut('');
    setStay(null);
    setMonth(null);
  };

  return (
    <div className="fixed left-1/2 top-1/2 bg-white w-[592px] px-9 p-8 rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-50 transform -translate-x-1/2 -translate-y-1/2">
      <p className="mb-6 text-[18px] text-[#636363] font-normal leading-[1.45]">원하는 일정을 선택해주세요.</p>

      {/* date vs flexible */}
      <DurationTab
        tab={tab}
        setTab={setTab}
      />

      {/* 캘린더 폼 Date 탭 선택 시 렌더링 */}
      {tab === 'date' && (
        <CalendarForm
        />
      )}

      {/* 유동적인 계획 탭 선택 시 렌더링 */}
      {tab === 'flexible' && (
        <FlexibleForm
          MonthList={MonthList}
        />
      )}

      {/* 적용 버튼 */}
      <ActionButton handleResetSchedule={handleResetSchedule} handleSaveSchedule={handleSaveSchedule} />
    </div>
  );
};

export default DurationModal;
