// 1. 호텔 지역 정보 칼큘레이터
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

// 공통) 빈칸 및 특수문자를 제거
export const sanitizeInput = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9가-힣]/g, '');
};

// 2. 여행 기간 정보 칼큘레이터
export const parseSchedule = (stayInput: string, monthInput: string): { stay: string; month: string } => {
  const removeKorean = (text: string): string => text.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, ''); // 한글 제거

  // 여행 기간 처리 (예: "3박4일" -> "34")
  const stay = stayInput ? removeKorean(sanitizeInput(stayInput)) : '';

  // 월 정보 처리 (예: "june" -> 그대로 사용)
  const month = monthInput ? monthInput.trim().toLowerCase() : '';

  return { stay: stay || '', month: month || '' };
};

// 3. 예약 정보 디테일 칼큘레이터
export const parseDetails = (details: string): { room: string; adult: string; child: string; pet: string } => {
  console.log(details);

  const extractedDetails = {
    room: '0',
    adult: '0',
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

// 4. 호텔 성급 칼큘레이터
export const parseStars = (details: string): number => {
  const match = details.match(/성급:\s*(\d+)/);
  if (match) {
    const starValue = parseInt(match[1], 10);
    if (starValue === 4 || starValue === 5) return starValue; // 4 또는 5만 유효
  }
  return 0; // 기본값
};

// 5. 호텔 객실 가격 칼큘레이터
export const parsePrices = (price: string): { minPrice: number; maxPrice: number } => {
  const minMatch = price.match(/최저가:\s*(\d+)/);
  const maxMatch = price.match(/최고가:\s*(\d+)/);
  return {
    minPrice: minMatch ? parseInt(minMatch[1], 10) : 0,
    maxPrice: maxMatch ? parseInt(maxMatch[1], 10) : 10000000
  };
};

// 6. 편의시설(facilities) 칼큘레이터
export const parseFacilities = (facilities: string): string[] => {
  // 쉼표로 구분된 문자열을 배열로 변환
  return facilities ? facilities.split(',').map((item) => item.trim()) : [];
};

// 7. 호텔 제공 서비스(services) 칼큘레이터
export const parseServices = (services: string): string[] => {
  // 쉼표로 구분된 문자열을 배열로 변환
  return services ? services.split(',').map((item) => item.trim()) : [];
};

