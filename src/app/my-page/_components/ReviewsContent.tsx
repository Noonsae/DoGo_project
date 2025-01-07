import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import { ReviewType } from '@/types/supabase/review-type';


interface ReviewsContentProps {
  userId: string;
}

const ReviewsContent: React.FC<ReviewsContentProps> = ({ userId }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase 클라이언트 가져오기
  const supabase = browserSupabase();

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase.from('reviews').select('*').eq('user_id', userId);
      if (error) {
        console.error('리뷰를 가져오는 중 오류가 발생했습니다:', error);
      }
      setReviews((data || []) as ReviewType[]); // 타입 캐스팅
      setLoading(false);
    };

    fetchReviews();
  }, [userId, supabase]);

  if (loading) return <p>Loading...</p>;
  if (!reviews.length) return <p>작성한 후기가 없습니다.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">작성한 후기</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="p-4 border rounded shadow">
            <h3 className="font-bold">Room ID: {review.room_id}</h3>
            <p className="text-sm text-gray-500">작성일: {review.created_at}</p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsContent;
