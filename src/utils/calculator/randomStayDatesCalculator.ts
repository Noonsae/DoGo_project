// 현재 년도
export const currentYear = new Date().getFullYear();

/**
 * 특정 연도와 월 기준으로 **오늘 이후의 랜덤 날짜**를 생성
 * @param year 연도 (예: 2024)
 * @param month 월 (1~12, 1월부터 시작)
 * @returns YYYY-MM-DD 형식의 랜덤 날짜 (KST 기준, 오늘 이후)
 */
export const getRandomDateAfterToday = (year: number, month: number): string => {
  // 현재 날짜 객체 (KST 기준)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 초기화 (00:00:00)

  // month는 1~12로 입력받지만, JS Date는 0~11이므로 -1 처리 필요
  const actualMonth = month - 1;

  // 해당 월의 마지막 날짜 구하기
  const lastDay = new Date(year, month, 0).getDate();

  let randomDate: Date;

  do {
    // 1일부터 마지막 날짜 사이에서 랜덤 날짜 생성
    const randomDay = Math.floor(Math.random() * lastDay) + 1;
    randomDate = new Date(year, actualMonth, randomDay);
  } while (randomDate <= today); // 🔥 오늘 날짜보다 이후가 나올 때까지 반복

  return formatDate(randomDate);
};

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 * @param date Date 객체
 * @returns YYYY-MM-DD 형식의 문자열
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 2자리 맞추기
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
