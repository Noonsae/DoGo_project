import { SearchState } from '@/types/zustand/search-state-type';
import { convertToEnglish, parseDetails, parseSchedule, sanitizeInput } from './urlCalculator';

const generateUrl = ({
  location = '',
  checkIn = '',
  checkOut = '',
  schedule = '',
  details = ''
}: Partial<SearchState>): string => {
  const sanitizedLocation = convertToEnglish(sanitizeInput(location));
  const { stay, month } = parseSchedule(schedule);
  const { room, adult, child, pet } = parseDetails(details);

  const queryParams = [
    sanitizedLocation && `location=${encodeURIComponent(sanitizedLocation)}`,
    checkIn && `checkIn=${encodeURIComponent(sanitizeInput(checkIn))}`,
    checkOut && `checkOut=${encodeURIComponent(sanitizeInput(checkOut))}`,
    stay && `stay=${encodeURIComponent(stay)}`,
    month && `month=${encodeURIComponent(month)}`,
    room && `room=${encodeURIComponent(room)}`,
    adult && `adult=${encodeURIComponent(adult)}`,
    child && `child=${encodeURIComponent(child)}`,
    pet && `pet=${encodeURIComponent(pet)}`
  ]
    .filter(Boolean) // 값이 있는 항목만 필터링
    .join('&'); // '&'로 조합

  return `/hotel-list?${queryParams}`;
};

export default generateUrl;
