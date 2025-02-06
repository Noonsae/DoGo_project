const today = new Date();

const year = today.getFullYear(); // 연도 (예: 2025)
const month = today.getMonth() + 1; // 월 (0부터 시작하므로 +1, 예: 2)
const day = today.getDate(); // 일 (예: 5)

export const today_date = `${year}-${month}-${day}`;

// dateString에 원하는 일수를 추가
export const addDays = (dateString: string, daysToAdd: number): string => {
  const [year, month, day] = dateString.split('-').map(Number); // 문자열을 숫자로 변환
  const date = new Date(year, month - 1, day); // Date 객체 생성 (월은 0부터 시작하므로 -1 필요)
  date.setDate(date.getDate() + daysToAdd); // 원하는 일수만큼 추가

  // 새로운 날짜를 반환 (형식 유지)
  const newYear = date.getFullYear();
  const newMonth = date.getMonth() + 1;
  const newDay = date.getDate();

  return `${newYear}-${newMonth}-${newDay}`;
};
