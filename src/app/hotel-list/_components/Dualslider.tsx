import React, { useState, useRef } from 'react';

const DualSlider = () => {
  const [minValue, setMinValue] = useState(0); // 최소값
  const [maxValue, setMaxValue] = useState(10000000); // 최대값
  const sliderRef = useRef<HTMLDivElement>(null); // 슬라이더 참조

  // 50만 원 단위로 반올림하는 함수
  const roundToStep = (value: number, step: number) => {
    return Math.round(value / step) * step;
  };

  const handleDragStart = (event: React.MouseEvent) => {
    event.preventDefault(); // 드래그 동작 방지
  };

  const handleDrag = (type: 'min' | 'max', clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left; // 슬라이더 시작점부터의 상대 위치
    const percentage = Math.max(0, Math.min(1, relativeX / rect.width)); // 0 ~ 1 사이로 제한
    const newValue = roundToStep(percentage * 10000000, 500000); // 50만 원 단위로 반올림

    if (type === 'min') {
      setMinValue(Math.min(newValue, maxValue - 500000)); // 최소값이 최대값보다 크지 않도록 제한
    } else {
      setMaxValue(Math.max(newValue, minValue + 500000)); // 최대값이 최소값보다 작지 않도록 제한
    }
  };

  const handleMouseDown = (type: 'min' | 'max') => {
    const onMouseMove = (event: MouseEvent) => {
      handleDrag(type, event.clientX);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="relative w-full h-[3px] mt-6 bg-gray-200 rounded-full" ref={sliderRef}>
      {/* 트랙의 활성화된 부분 */}
      <div
        className="absolute h-[3px] bg-[#B3916A] rounded"
        style={{
          left: `${(minValue / 10000000) * 100}%`,
          right: `${100 - (maxValue / 10000000) * 100}%`
        }}
      />
      {/* 최소값 핸들 */}
      <div
        className="absolute w-2 h-2 bg-[#B3916A] border-2 border-[#B3916A] outline-none outline-offset-4 outline-[#B3916A] rounded-full cursor-pointer"
        style={{
          left: `${(minValue / 10000000) * 100}%`,
          transform: 'translate(-50%, -50%)',
          top: '50%'
        }}
        onMouseDown={(event) => {
          handleMouseDown('min');
          event.preventDefault(); // 기본 드래그 동작 방지
        }}
        onDragStart={handleDragStart}
      />
      {/* 최대값 핸들 */}
      <div
        className="absolute w-2 h-2 bg-[#B3916A] border-2 border-[#B3916A] outline-none outline-offset-4 outline-[#B3916A] rounded-full cursor-pointer"
        style={{
          left: `${(maxValue / 10000000) * 100}%`,
          transform: 'translate(-50%, -50%)',
          top: '50%'
        }}
        onMouseDown={(event) => {
          handleMouseDown('max');
          event.preventDefault(); // 기본 드래그 동작 방지
        }}
        onDragStart={handleDragStart}
      />
      {/* 값 표시 */}
      <div className="flex justify-between text-sm mt-6">
        <span>{minValue.toLocaleString()}원</span>
        <span>{maxValue.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default DualSlider;
