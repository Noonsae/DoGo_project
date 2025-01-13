'use client';

import React, { useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Props 타입 정의
interface HotelManagementProps {
  userId: string; // 사용자 ID
}

// HotelManagement 컴포넌트
const HotelManagement: React.FC<HotelManagementProps> = ({ userId }) => {
  const [hotelName, setHotelName] = useState(''); // 호텔 이름
  const [description, setDescription] = useState(''); // 호텔 설명
  const [address, setAddress] = useState(''); // 호텔 주소
  const [mainImgUrl, setMainImgUrl] = useState(''); // 메인 이미지 URL
  const [stars, setStars] = useState<number>(1); // 호텔 등급 (1~5)
  const [minPrice, setMinPrice] = useState<number>(0); // 최소 가격
  const [checkIn, setCheckIn] = useState(''); // 체크인 시간
  const [checkOut, setCheckOut] = useState(''); // 체크아웃 시간
  const [location, setLocation] = useState(''); // 호텔 위치
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [message, setMessage] = useState<string | null>(null); // 성공/오류 메시지

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Supabase의 hotels 테이블에 데이터 삽입
      const { error } = await browserSupabase().from('hotels').insert([
        {
          name: hotelName,
          description,
          address,
          main_img_url: mainImgUrl,
          stars,
          min_price: minPrice,
          check_in: checkIn,
          check_out: checkOut,
          location,
          user_id: userId, // 사용자 ID 저장
        },
      ]);

      if (error) throw error;

      setMessage('호텔이 성공적으로 저장되었습니다!');
      setHotelName('');
      setDescription('');
      setAddress('');
      setMainImgUrl('');
      setStars(1);
      setMinPrice(0);
      setCheckIn('');
      setCheckOut('');
      setLocation('');
    } catch (err) {
      console.error('Error saving hotel:', err);
      setMessage('호텔 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">호텔 관리</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">호텔 이름</label>
          <input
            type="text"
            placeholder="호텔 이름을 입력하세요"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">호텔 설명</label>
          <textarea
            placeholder="호텔 설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">주소</label>
          <input
            type="text"
            placeholder="호텔 주소를 입력하세요"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">메인 이미지 URL</label>
          <input
            type="url"
            placeholder="이미지 URL을 입력하세요"
            value={mainImgUrl}
            onChange={(e) => setMainImgUrl(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">호텔 등급 (별 개수)</label>
          <input
            type="number"
            placeholder="1~5"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md"
            min={1}
            max={5}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">최소 가격 (1박 기준)</label>
          <input
            type="number"
            placeholder="최소 가격을 입력하세요"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">체크인 시간</label>
          <input
            type="time"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">체크아웃 시간</label>
          <input
            type="time"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">위치</label>
          <input
            type="text"
            placeholder="위치 정보를 입력하세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? '저장 중...' : '저장하기'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default HotelManagement;
