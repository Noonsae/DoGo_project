export interface UseFetchHotelsFilterParamsType {
  pageParam?: number;
  filters: FiltersType;
  sortOrder?: 'asc' | 'desc' | ''; // 정렬 옵션 추가
}

export type HotelFacility = {
  facility_id: string;
  facilities: { name: string };
};

export type HotelService = {
  service_id: string;
  services: { name: string };
};

type HotelFilterResponseType = {
  id: string; // 고유 아이디
  name: string; // 호텔명
  address: string; // 호텔 상세 주소
  label: string; // 호텔 이름 또는 상세주소
  stars: number; // 호텔의 성급 4 or 5
  description: string; // 호텔 상세 설명
  main_img_url: string; // 호텔 메인 사진
  hotel_img_urls: any | null; // 호텔 이미지 사진
  check_in: string; // 체크인 시간
  check_out: string; // 체크아웃 시간
  location: string; // 호텔 위치 지역
  user_id: string; // 사용자 아이디
  facilities: HotelFacility[]; // 호텔 구비 시설
  services: HotelService[]; // 호텔 제공 서비스
};

export interface FetchHotelsFilterResponse {
  items: HotelFilterResponseType[];
  totalCount: number;
}

export interface FiltersType {
  location?: string;
  label: string;
  name?: string;
  address?: string;
  stars: number[];
  minPrice: number;
  maxPrice: number;
  facilities: string[]; // 중첩 구조에 맞게 수정
  services: string[]; // 중첩 구조에 맞게 수정
  facilityIds: string[];
  serviceIds: string[];
}

export type sortOrder = 'asc' | 'desc' | '';
