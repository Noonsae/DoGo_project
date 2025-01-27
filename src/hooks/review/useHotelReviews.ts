import { useState, useEffect } from 'react';
import { ReviewType } from '@/types/supabase/review-type';

const useHotelReviews = (hotelId: string) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [allReviews, setAllReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/review?hotelId=${hotelId}`);
        const data = await response.json();

        if (response.ok) {
          // 리뷰를 최신순으로 정렬
          const sortedReviews = data.sort((a: ReviewType, b: ReviewType) => b.created_at.localeCompare(a.created_at));
          setReviews(sortedReviews.slice(0, 2)); // 최신 2개 리뷰
          setAllReviews(sortedReviews); // 전체 리뷰
        } else {
          console.error('API Error:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchReviews();
    }
  }, [hotelId]);

  return { reviews, allReviews, loading };
};

export default useHotelReviews;
