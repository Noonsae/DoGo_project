// 공통) 빈칸 및 특수문자를 제거
export const sanitizeInput = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9가-힣]/g, '');
};

// 1. 호텔 지역 정보(location) 칼큘레이터
export const convertToEnglish = (text: string) => {  

  // 한글을 영어로 변환하는 로직 (예: 간단한 매핑)
  const conversionMap: { [key: string]: string } = {
    제주: 'jeju',
    서울: 'seoul',
    부산: 'busan',
    광주: 'gwangju',
    인천: 'incheon',
    울산: 'ulsan',
    대전: `daejeon`,
    대구: 'daegu'
  };

  // 예외 처리: 변환할 필요가 없는 경우 (매핑되지 않은 경우)
  if (Object.keys(conversionMap).includes(text.trim())) {
    return conversionMap[text.trim()]; // 변환된 값을 반환
  }
  return; // 변환되지 않을 경우 그대로 반환;
};

// 2. 호텔 이름 또는 주소(Label) 칼큘레이터
export const parseLabel = (input: string): { label: string } => {
  
  return {
    label: input // label로 설정
  };
};

// 3. 메인 로직: convertToEnglish or parseLabel 상황에 따라 나눠서 처리하기
export const processInput = (text: string): { location: string; label: { label: string } } => {

  const converted = convertToEnglish(text);
  if (converted) {
    // 변환 가능한 경우 location으로 처리    
    return {
      location: converted,
      label: { label: '' }
    };
  }

  // 변환이 불가능한 경우 label로 처리
  const parsedLabel = parseLabel(text);
  return {
    location: '',
    label: parsedLabel
  };
};

// 4. 여행 기간 정보 변환기
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
  December: 12,
};

export const parseSchedule = (stayInput: string, monthInput: string): { stay: string; month: number | null } => {
  const removeKorean = (text: string): string => text.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
  const stay = stayInput ? removeKorean(sanitizeInput(stayInput)) : '';
  const trimmedMonthInput = monthInput.trim(); // 공백 제거
  const month = monthMapping[trimmedMonthInput] || null; // 매핑된 값 가져오기

  return { stay, month };
};

// 5. 예약 정보 디테일 칼큘레이터
export const parseDetails = (details: string): { room: string; adult: string; child: string; pet: string } => {

  const extractedDetails = {
    room: '1',
    adult: '1',
    child: '0',
    pet: '0'
  };

  // 문자열을 ','로 분리
  const parts = details.split(',').map((part) => part.trim());

  // 각각의 항목 처리
  parts.forEach((part) => {
    // 매칭 정보를 담을 키
    let key: keyof typeof extractedDetails | null = null;

    // 항목에 따라 키를 매칭
    switch (true) {
      case part.includes('객실수'):
        key = 'room';
        break;
      case part.includes('성인'):
        key = 'adult';
        break;
      case part.includes('어린이'):
        key = 'child';
        break;
      case part.includes('반려동물'):
        key = 'pet';
        break;
      default:
        key = null;
    }

    // 매칭된 키가 있을 경우 값 추출
    if (key) {
      const match = part.match(/(\d+)/);
      if (match) extractedDetails[key] = match[1];
    }
  });

  return extractedDetails;
};

// 6. 호텔 성급 칼큘레이터
export const parseStars = (grade: string): number => {
  const match = grade.match(/성급:\s*(\d+)/);
  if (match) {
    const starValue = parseInt(match[1], 10);
    if (starValue === 4 || starValue === 5) return starValue; // 4 또는 5만 유효
    if (starValue === 45) return 0;
  }
  return 0; // 기본값
};

// 7. 편의시설(facilities) 칼큘레이터
export const parseFacilities = (facilities: string): string[] => {
  // 쉼표로 구분된 문자열을 배열로 변환
  return facilities ? facilities.split(',').map((item) => item.trim()) : [];
};

// 8. 호텔 제공 서비스(services) 칼큘레이터
export const parseServices = (services: string): string[] => {
  // 쉼표로 구분된 문자열을 배열로 변환
  return services ? services.split(',').map((item) => item.trim()) : [];
};

