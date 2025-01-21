export interface UseFetchHotelsFilterParamsType {
  pageParam?: number;
  filters: FiltersType;
  sortOrder?: 'asc' | 'desc' | ''; // 정렬 옵션 추가
}

export interface FetchHotelsFilterResponse {
  items: {
    address: string;
    check_in: string;
    check_out: string;
    description: string;
    hotel_img_urls: any | null;
    id: string;
    location: string;
    main_img_url: string;
    name: string;
    stars: number;
    user_id: string;
  }[];
  totalCount: number;
}

export interface FiltersType {
  stars: number[];
  minPrice: number;
  maxPrice: number;
  location: string;
  facilities: string[];
  services: string[];
}

export type sortOrder = 'asc' | 'desc' | '';