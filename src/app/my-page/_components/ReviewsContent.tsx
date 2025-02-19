'use client';
import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Review 데이터 타입 정의
// TODO 타입 파일 분리
interface Review {
  id: string; // 후기 고유 ID
  room_id: string; // 객실 ID
  user_id: string; // 사용자 ID
  comment: string; // 후기 내용
  rating: number; // 평점 (1~5)
  review_img_url: string[] | null; // 후기 이미지 URL (JSON 배열 형태)
  created_at: string; // 작성 날짜
  room: {
    room_name: string; // 객실 이름
  } | null; // 객실 정보
}

// Props 타입 정의
interface ReviewsContentProps {
  userId: string; // 현재 사용자 ID
}

const ReviewsContent: React.FC<ReviewsContentProps> = ({ userId }) => {
  const [reviews, setReviews] = useState<Review[]>([]); // 후기 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('reviews')
          .select(
            `
            id,
            room_id,
            user_id,
            comment,
            rating,
            review_img_url,
            created_at,
            rooms (room_name)
          `
          )
          .eq('user_id', userId);

        if (error) throw error;

        const formattedData: Review[] =
          data?.map((review: any) => ({
            ...review,
            review_img_url: review.review_img_url
              ? JSON.parse(review.review_img_url) // JSON 데이터 파싱
              : null,
            room: review.rooms || null
          })) || [];

        setReviews(formattedData);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('후기를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!reviews.length) return <p className="text-center text-gray-600">작성한 후기가 없습니다.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">작성한 후기</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="p-4 border rounded shadow">
            {/* 객실 이름 */}
            <h3 className="font-bold text-lg">{review.room?.room_name || '알 수 없음'}</h3>
            {/* 작성 날짜 */}
            <p className="text-sm text-gray-500">작성일: {new Date(review.created_at).toLocaleDateString()}</p>
            {/* 후기 내용 */}
            <p className="mt-2">{review.comment}</p>
            {/* 평점 */}
            <p className="mt-2 text-yellow-500">평점: {'⭐'.repeat(review.rating)}</p>
            {/* 첨부 이미지 */}
            {review.review_img_url && review.review_img_url.length > 0 && (
              <div className="mt-4 space-y-2">
                {review.review_img_url.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Review Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsContent;
