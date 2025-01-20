import { SearchState } from "@/types/zustand/search-state-type";
import { convertToEnglish, parseDetails, parseFacilities, parsePrices, parseSchedule, parseServices, parseStars, sanitizeInput } from "./urlCalculator";

const generateUrl = ({
  location = '',
  checkIn = '',
  checkOut = '',
  stay : stayInput = '',
  month : monthInput = '',
  details = '',
  stars: starsInput = '', // 입력값과 결과값 변수 이름 구분
  prices: pricesInput = '',
  facilities: facilitiesInput = '',
  services: servicesInput = ''
}: Partial<SearchState>): string => {
  try {
    // 데이터 처리
    const sanitizedLocation = convertToEnglish(sanitizeInput(location)); // 위치 정보 처리
    const { stay, month } = parseSchedule(stayInput, monthInput); // 예약 일정 처리
    const { room, adult, child, pet } = parseDetails(details); // 예약 정보 디테일 처리
    const parsedStars = parseStars(starsInput); // 성급 처리
    const { minPrice, maxPrice } = parsePrices(pricesInput); // 가격 처리
    const parsedFacilities = parseFacilities(facilitiesInput).join(','); // 배열 -> 문자열
    const parsedServices = parseServices(servicesInput).join(','); // 배열 -> 문자열

    // 쿼리 파라미터 생성
    const queryParams = [
      sanitizedLocation && `location=${encodeURIComponent(sanitizedLocation)}`,
      checkIn && `checkIn=${encodeURIComponent(sanitizeInput(checkIn))}`,
      checkOut && `checkOut=${encodeURIComponent(sanitizeInput(checkOut))}`,
      stay && `stay=${encodeURIComponent(stay)}`,
      month && `month=${encodeURIComponent(month)}`,
      room && `room=${encodeURIComponent(room)}`,
      adult && `adult=${encodeURIComponent(adult)}`,
      pet && `pet=${encodeURIComponent(pet)}`,
      child && `child=${encodeURIComponent(child)}`,
      parsedStars && `stars=${encodeURIComponent(parsedStars.toString())}`, // 숫자를 문자열로 변환
      minPrice && `minPrice=${encodeURIComponent(minPrice.toString())}`, // 숫자를 문자열로 변환
      maxPrice && `maxPrice=${encodeURIComponent(maxPrice.toString())}`, // 숫자를 문자열로 변환
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

const searchState: Partial<SearchState> = {
  location: '서울',
  checkIn: '2023-02-01',
  checkOut: '2023-02-05',
  stay: '4박5일',
  month: 'June',
  details: '객실수: 2개, 성인: 2명, 어린이: 1명, 반려동물: 0',
  stars: '5',
  prices: '최저가: 100000, 최고가: 300000',
  facilities: '수영장, 헬스장, 사우나',
  services: '룸서비스, 조식 포함'
};
console.log(generateUrl(searchState));

