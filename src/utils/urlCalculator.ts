export const convertToEnglish = (text: string): string => {
  // 한글을 영어로 변환하는 로직 (예: 라이브러리 활용 또는 간단한 매핑)
  const conversionMap: { [key: string]: string } = {
    제주: 'jeju',
    서울: 'seoul',
    부산: 'busan',
    광주: 'gwangju',
    인천: 'incheon',
    울산: 'ulsan',
    대전: `daejeon`,
    대구: 'daegu',
  };
  return conversionMap[text] || text;
};
export const sanitizeInput = (text: string): string => {
  // 빈칸 및 특수문자를 제거
  return text.replace(/[^a-zA-Z0-9가-힣]/g, '');
};

export const parseSchedule = (schedule: string): { stay: string; month: string } => {
  const removeKorean = (text: string): string => text.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''); // 한글 제거
  const [stay, month] = schedule.split('|').map((item) => {
    const sanitized = sanitizeInput(item.trim()); // 특수문자 제거
    return removeKorean(sanitized); // 한글 제거
  });
  return { stay: stay || '', month: month || '' };
};

export const parseDetails = (details: string): { room: string; adult: string; child: string; pet: string } => {
  const detailRegex = /객실:(\d+)개|어른:(\d+)명|어린이:(\d+)명|반려동물:(\d+)/g;
  const matches = details.match(detailRegex) || [];

  const extractedDetails = {
    room: '0',
    adult: '0',
    child: '0',
    pet: '0'
  };

  matches.forEach((match) => {
    if (match[1]) extractedDetails.room = match[1]; // 객실
    if (match[2]) extractedDetails.adult = match[2]; // 어른
    if (match[3]) extractedDetails.child = match[3]; // 어린이
    if (match[4]) extractedDetails.pet = match[4]; // 반려동물
  });

  return extractedDetails;
};