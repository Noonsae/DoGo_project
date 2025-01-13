import React, { useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

const HotelManagement: React.FC = () => {
  // 상태 변수들: 입력 필드를 관리
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
    event.preventDefault(); // 기본 폼 제출 동작 방지
    setLoading(true); // 로딩 상태 활성화
    setMessage(null); // 메시지 초기화

    try {
      // Supabase의 hotels 테이블에 데이터 삽입
      const { error } = await browserSupabase().from('hotels').insert([
        {
          name: hotelName, // 호텔 이름
          description, // 호텔 설명
          address, // 호텔 주소
          main_img_url: mainImgUrl, // 메인 이미지 URL
          stars, // 호텔 등급
          min_price: minPrice, // 최소 가격
          check_in: checkIn, // 체크인 시간
          check_out: checkOut, // 체크아웃 시간
          location, // 위치 정보
        },
      ]);

      if (error) throw error; // 오류가 발생하면 예외 처리

      // 성공 시 상태 초기화 및 메시지 설정
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
      console.error('Error saving hotel:', err); // 오류 콘솔 출력
      setMessage('호텔 저장 중 오류가 발생했습니다.'); // 오류 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">호텔 관리</h2>
      {/* 호텔 등록 폼 */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* 호텔 이름 입력 */}
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
        {/* 호텔 설명 입력 */}
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
        {/* 호텔 주소 입력 */}
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
        {/* 메인 이미지 URL 입력 */}
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
        {/* 호텔 등급 입력 */}
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
        {/* 최소 가격 입력 */}
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
        {/* 체크인 시간 입력 */}
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
        {/* 체크아웃 시간 입력 */}
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
        {/* 위치 입력 */}
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
        {/* 저장 버튼 */}
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
      {/* 메시지 표시 */}
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default HotelManagement;
