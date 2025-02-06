/**
 * 선택한 달에서 랜덤 날짜와 숙박 기간을 계산하는 함수
 * @param month 선택한 달 (예: "February")
 * @param stay 숙박 기간 (예: 3)
 * @returns { stayStartDate: string, stayEndDate: string }
 */

const calculateRandomStayDates = (month: string, stay: number): { startDate: string; endDate: string } => {
  // 영문 달 이름을 숫자로 매핑
  const monthMapping: { [key: string]: number } = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
  };

  // 영문 달을 숫자로 변환
  const monthNumber = monthMapping[month];
  if (!monthNumber) {
    throw new Error(`Invalid month: ${month}`);
  }

  const year = new Date().getFullYear();
  const startDate = new Date(`${year}-${monthNumber}-01`);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();

  // 랜덤 시작일 선택
  const randomStartDay = Math.floor(Math.random() * (daysInMonth - stay + 1)) + 1;
  const randomStartDate = new Date(year, monthNumber - 1, randomStartDay);

  // 종료 날짜 계산
  const randomEndDate = new Date(randomStartDate);
  randomEndDate.setDate(randomStartDate.getDate() + stay - 1);

  return {
    startDate: randomStartDate.toISOString().split('T')[0], // yyyy-mm-dd 형식으로 반환
    endDate: randomEndDate.toISOString().split('T')[0]
  };
};

export default calculateRandomStayDates;