'use client';

import { useState } from 'react';

const SearchSection = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSearch = () => {
    console.log('Search with:', { location, checkIn, checkOut });
    // 검색 로직 추가 (예: 클라이언트 측 API 호출)
  };

  return (
    <section className="w-full max-w-[1200px] h-[150px] mx-auto -mt-[180px] px-[24px] py-[32px] border border-black">
      <h2 className="text-2xl font-bold mb-6">숙소 검색</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex flex-row justify-around items-center"
      >
        <input
          type="text"
          placeholder="여행지 검색"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-md p-2 w-80"
        />
        <div className="flex space-x-4">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border rounded-md p-2"
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border rounded-md p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
          검색
        </button>
      </form>
    </section>
  );
}

export default SearchSection;