const today = new Date();

const year = today.getFullYear(); // 연도 (예: 2025)
const month = today.getMonth() + 1; // 월 (0부터 시작하므로 +1, 예: 2)
const day = today.getDate(); // 일 (예: 5)

export const today_date = `${year}-${month}-${day}`;
