import React from 'react';

const HotelManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">호텔 관리</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">호텔 이름</label>
          <input
            type="text"
            placeholder="호텔 이름을 입력하세요"
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

export default HotelManagement;
