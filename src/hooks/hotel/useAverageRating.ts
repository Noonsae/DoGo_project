import { ReviewType } from '@/types/supabase/hotel-type';
import { useState, useEffect } from 'react';

const useAverageRating = (reviews: ReviewType[]) => {
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (reviews?.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(totalRating / reviews.length);
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  return averageRating;
};

export default useAverageRating;
