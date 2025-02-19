'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client';

// 리뷰 데이터 타입 정의
// TODO 타입 파일 분리 
interface Review {
  id: string;
  room_id: string;
  user_id: string;
  rating: number;
  comment: string;
  review_img_url: string[];
  created_at: string;
  room_name: string;
}

const UserReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
          error: authError
        } = await browserSupabase().auth.getUser();

        if (authError || !user) {
          throw new Error('로그인 정보가 없습니다.');
        }

        const { data, error } = await browserSupabase()
          .from('reviews')
          .select(
            `
            id,
            room_id,
            user_id,
            rating,
            comment,
            review_img_url,
            created_at,
            rooms ( room_name )
          `
          )
          .eq('user_id', user.id);

        if (error) throw error;

        const formattedData: Review[] = (data || []).map((review: any) => ({
          id: review.id,
          room_id: review.room_id,
          user_id: review.user_id,
          rating: review.rating,
          comment: review.comment,
          review_img_url: review.review_img_url ? JSON.parse(review.review_img_url) : [],
          created_at: review.created_at,
          room_name: review.rooms?.room_name || 'N/A'
        }));

        setReviews(formattedData);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('리뷰 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">내 후기</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => router.push('/my-page/user/review/write')}
        >
          후기 등록하기
        </button>
      </div>

      <ul className="space-y-4">
        {reviews.length === 0 && <p className="text-center text-gray-500">등록된 리뷰가 없습니다.</p>}
        {reviews.map((review) => (
          <li key={review.id} className="p-4 border rounded shadow">
            <div className="flex items-center space-x-4">
              {/* 리뷰 이미지 */}
              {review.review_img_url.length > 0 && (
                <img src={review.review_img_url[0]} alt="Review" className="w-24 h-24 object-cover rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{review.room_name}</h3>
                <p className="text-yellow-500 font-semibold">평점: {review.rating}/5</p>
                <p className="mt-2 text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-400">작성일: {new Date(review.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviewPage;
