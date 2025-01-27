import { FacilitiesType } from '../supabase/facilities-type';
import { HotelType } from '../supabase/hotel-type';
import { ReviewType } from '../supabase/review-type';

export type HotelBoxProps = {
  facilityData: FacilitiesType[]; // 시설 데이터 배열
  roomOption: JSX.Element; // JSX 요소 타입
  hotelData: HotelType;
  reviews: ReviewType[];
  allReviews: ReviewType[];
};
