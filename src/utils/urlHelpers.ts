import { SearchState } from '@/types/zustand/search-state-type';
import { processInput, parseDetails, parseSchedule, sanitizeInput } from './urlCalculator';

const generateUrl = ({
  location = '',
  checkIn = '',
  checkOut = '',
  stay: stayInput = '',
  // month: monthInput = '',
  details = '',
  stars = [],
  minPrice = 0,
  maxPrice = 2000000,
  facilities = [],
  services = []
}: Partial<SearchState>): string => {
  try {
    // location과 label 처리
    const { location: processedLocation, label } = processInput(location);

    // 예약 일정 처리
    const { stay } = parseSchedule(stayInput);

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

    // 쿼리 파라미터 생성
    const queryParams = [
      processedLocation && `location=${encodeURIComponent(processedLocation)}`,
      label.label && `label=${encodeURIComponent(label.label)}`,
      checkIn && `checkIn=${encodeURIComponent(sanitizeInput(checkIn))}`,
      checkOut && `checkOut=${encodeURIComponent(sanitizeInput(checkOut))}`,
      stay && `stay=${encodeURIComponent(stay)}`,
      // ToDo stay, month 각각 처리하기
      // month && `month=${encodeURIComponent(month)}`,
      room && `room=${encodeURIComponent(room)}`,
      adult && `adult=${encodeURIComponent(adult)}`,
      pet && `pet=${encodeURIComponent(pet)}`,
      child && `child=${encodeURIComponent(child)}`,
      parsedStars && `stars=${encodeURIComponent(parsedStars)}`, // 숫자를 문자열로 변환
      parsedMinPrice && `minPrice=${encodeURIComponent(parsedMinPrice)}`,
      parsedMaxPrice && `maxPrice=${encodeURIComponent(parsedMaxPrice)}`,
      parsedFacilities && `facilities=${encodeURIComponent(parsedFacilities)}`,
      parsedServices && `services=${encodeURIComponent(parsedServices)}`
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
