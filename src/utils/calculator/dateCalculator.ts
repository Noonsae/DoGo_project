// 오늘 날짜 계산하기
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
export const today_date = `${year}-${month}-${day}`;

// YYYY-MM-DD 형식의 문자열을 받도록 타입 정의
type DateString = string;

/**
 * 한국 시간(KST) 기준으로 Date 객체 생성
 * @param dateString YYYY-MM-DD 형식
 * @returns Date 객체 (KST 기준)
 */
export const createKSTDate = (dateString: DateString): Date => {
  return new Date(`${dateString}T00:00:00+09:00`);
};

/**
 * 특정 날짜에서 N일을 더하거나 뺀 날짜 반환
 * @param dateString YYYY-MM-DD 형식
 * @param days 더할 일 수 (음수면 빼기)
 * @returns YYYY-MM-DD 형식의 변경된 날짜
 */
export const addDays = (dateString: DateString, days: number): DateString => {
  const date = createKSTDate(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

/**
 * 두 날짜 차이 계산 (일 단위)
 * @param startDateString 시작 날짜 (YYYY-MM-DD)
 * @param endDateString 종료 날짜 (YYYY-MM-DD)
 * @returns 두 날짜의 차이 (일 단위)
 */
export const getDateDifference = (startDateString: DateString, endDateString: DateString): number => {
  const startDate = createKSTDate(startDateString);
  const endDate = createKSTDate(endDateString);
  const diffInMs = endDate.getTime() - startDate.getTime();
  return diffInMs / (1000 * 60 * 60 * 24); // ms -> 일(days)
};

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 * @param date Date 객체
 * @returns YYYY-MM-DD 형식의 문자열
 */
export const formatDate = (date: Date): DateString => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 특정 날짜의 요일을 반환 (한국어 요일)
 * @param dateString YYYY-MM-DD 형식
 * @returns 요일 (일, 월, 화, 수, 목, 금, 토)
 */
export const getDayOfWeek = (dateString: DateString): string => {
  const date = createKSTDate(dateString);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  return weekDays[date.getDay()];
};

/**
 * 현재 한국 시간(KST) 반환
 * @returns "YYYY-MM-DD HH:MM:SS" 형식의 문자열
 */
export const getCurrentKST = (): string => {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
};
