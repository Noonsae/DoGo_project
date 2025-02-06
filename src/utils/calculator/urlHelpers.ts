import { SearchState } from '@/types/zustand/search-state-type';
import { processInput, parseDetails } from './urlCalculator';
import { addDays, today_date } from './dateCalculator';

// TODO 가능하려나 ㅠ
// 1. 날짜를 선택했을 경우
// → 체크인 체크아웃 값을 통해서 머무르는기간(stay), 달(month)를 계산해준다.

// 2. 머무르는 기간, 달을 선택했을 경우
// → 오늘을 기준으로 머무르는 기간을 반영한 램덤 날짜를 만든다. 

const generateUrl = ({
  location = '',
  checkIn = '',
  checkOut = '',
  stay = null,
  month = null,
  details = '',
  stars = [],
  minPrice = 0,
  maxPrice = 2000000,
  facilities = [],
  services = [],
  beds = []
}: Partial<SearchState>): string => {
  try {
    // location과 label 처리
    const { location: processedLocation, label } = processInput(location);

    // 예약 정보 디테일 처리
    const { room, adult, child, pet } = parseDetails(details);

    // 성급 처리
    const parsedStars = stars && stars.length > 0 ? stars.join('') : '';

    // 가격 처리
    const parsedMinPrice = minPrice ? minPrice : '';
    const parsedMaxPrice = maxPrice ? maxPrice : '';

    // 배치 시설 처리
    const parsedFacilities = Array.isArray(facilities) ? facilities.join(',') : '';

    // 제공 서비스 처리
    const parsedServices = Array.isArray(services) ? services.join(',') : '';

    const parsedBeds = beds.length > 0 ? encodeURIComponent(beds.join(',')) : '';

    // 쿼리 파라미터 생성
    const queryParams = [
      processedLocation && `location=${encodeURIComponent(processedLocation)}`,
      label.label && `label=${encodeURIComponent(label.label)}`,
      checkIn && `checkIn=${encodeURIComponent(checkIn)}`,
      checkOut && `checkOut=${encodeURIComponent(checkOut)}`,
      stay && `stay=${encodeURIComponent(stay)}`,
      month && `month=${encodeURIComponent(month)}`,
      room && `room=${encodeURIComponent(room)}`,
      adult && `adult=${encodeURIComponent(adult)}`,
      pet && `pet=${encodeURIComponent(pet)}`,
      child && `child=${encodeURIComponent(child)}`,
      parsedStars && `stars=${encodeURIComponent(parsedStars)}`, // 숫자를 문자열로 변환
      parsedMinPrice && `minPrice=${encodeURIComponent(parsedMinPrice)}`,
      parsedMaxPrice && `maxPrice=${encodeURIComponent(parsedMaxPrice)}`,
      parsedFacilities && `facilities=${encodeURIComponent(parsedFacilities)}`,
      parsedServices && `services=${encodeURIComponent(parsedServices)}`,
      parsedBeds && `beds=${encodeURIComponent(parsedBeds)}` // 인코딩된 beds를 그대로 쿼리 파라미터로 전달
    ]
      .filter(Boolean) // 값이 있는 항목만 필터링
      .join('&'); // '&'로 연결

    return `/hotel-list?${queryParams}`;
  } catch (error) {
    console.error('Error generating URL:', error);
    // 오류 발생 시 기본 URL 반환
    return '/hotel-list';
  }
};

export default generateUrl;
