'use client';

import React, { ReactNode, useState } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode; // ✅ children을 props에 추가하여 타입 에러 해결
}

const facilitiesList = [
  { category: '공용 시설', options: ['사우나', '수영장', '스파', '골프장', '주방/식당'] },
  { category: '기타 시설', options: ['룸서비스', '무료주차', '유아차', '편의점'] },
];

const BusinessHotelModal: React.FC<ModalProps> = ({ onClose, children }) => {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (option: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleSave = () => {
    console.log('선택된 시설:', selectedFacilities);
    onClose(); // 저장 후 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">편의 시설 및 서비스</h2>
        <div className="space-y-6">
          {facilitiesList.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="font-medium mb-2">{group.category}</h3>
              <div className="grid grid-cols-2 gap-4">
                {group.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFacilities.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {children}
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-[#B3916A] text-white py-2 rounded-lg hover:bg-[#8F7455] active:bg-[#6B573F]"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default BusinessHotelModal;
