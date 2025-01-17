import { HotelType } from '@/types/supabase/hotel-type';

const handleSaveHistory = (hotel: HotelType) => {
  const maxHistory = 10; // 히스토리 최대 개수

  // 기존 로컬스토리지 데이터를 가져오기
  const storedHistory = localStorage.getItem('hotelHistory');
  const history: HotelType[] = storedHistory ? JSON.parse(storedHistory) : [];

  // 클릭한 호텔 추가 (중복 제거)
  const isAlreadyInHistory = history.some((item) => item.id === hotel.id);
  if (!isAlreadyInHistory) {
    const updatedHistory = [...history, hotel].slice(-maxHistory); // 최근 10개 유지
    localStorage.setItem('hotelHistory', JSON.stringify(updatedHistory)); // 로컬스토리지 업데이트
  }
};

export default handleSaveHistory;
