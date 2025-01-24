import { ReviewType } from '../supabase/review-type';

export interface HotelReviewsProps {
  loading: boolean;
  reviews: ReviewType[];
  allReviews: ReviewType[]; // 전체 리뷰
}
