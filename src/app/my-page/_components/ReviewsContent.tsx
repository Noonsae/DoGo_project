'use client';
import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 후기 데이터를 정의하는 인터페이스
interface Review {
  id: string; // 후기 고유 ID
  room_id: string; // 관련된 객실 ID
  user_id: string; // 작성자 ID
  comment: string; // 후기 내용
  rating: number; // 평점 (1~5)
  review_img_url: string[] | null; // 첨부된 후기 이미지 URL 목록 (없을 경우 null)
  created_at: string; // 작성 날짜
  room: {
    room_name: string; // 객실 이름
  } | null; // 관련 객실 정보 (없을 경우 null)
}

// 컴포넌트 Props 정의
interface ReviewsContentProps {
  userId: string; // 현재 사용자의 ID
}

// 후기 관리 컴포넌트 정의
const ReviewsContent: React.FC<ReviewsContentProps> = ({ userId }) => {
  // 상태 정의
  const [reviews, setReviews] = useState<Review[]>([]); // 후기를 저장하는 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  // Supabase를 통해 후기 데이터를 가져오는 함수
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Supabase 쿼리를 통해 'reviews' 테이블 데이터와 연결된 'rooms' 데이터를 가져옴
        const { data, error } = await browserSupabase()
          .from('reviews')
          .select(`
            id,
            room_id,
            user_id,
            comment,
            rating,
            review_img_url,
            created_at,
            rooms (
              room_name
            )
          `)
          .eq('user_id', userId); // 현재 사용자의 ID와 일치하는 후기만 가져옴

        if (error) throw error; // 에러 발생 시 예외 처리

        // 데이터를 타입스크립트에서 정의한 형식에 맞게 변환
        const formattedData = data?.map((review: any) => ({
          ...review,
          review_img_url: review.review_img_url
            ? JSON.parse(review.review_img_url) // JSON 데이터를 배열로 파싱
            : null, // 데이터가 없으면 null
          room: review.rooms || null, // 연결된 'rooms' 데이터를 'room'으로 매핑
        }));

        setReviews(formattedData || []); // 상태에 변환된 데이터를 저장
      } catch (err) {
        console.error('Error fetching reviews:', err); // 에러를 콘솔에 출력
        setError('후기를 불러오는 중 오류가 발생했습니다.'); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchReviews(); // 함수 호출
  }, [userId]); // userId가 변경될 때마다 함수 실행

  // 로딩 상태일 때 표시할 컴포넌트
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 에러 상태일 때 표시할 컴포넌트
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 후기가 없을 때 표시할 컴포넌트
  if (!reviews.length) return <p className="text-center text-gray-600">작성한 후기가 없습니다.</p>;

  // 후기 목록 렌더링
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">작성한 후기</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="p-4 border rounded shadow">
            {/* 객실 이름 */}
            <h3 className="font-bold">객실 이름: {review.room?.room_name || '알 수 없음'}</h3>
            {/* 작성일 */}
            <p className="text-sm text-gray-500">
              작성일: {new Date(review.created_at).toLocaleDateString()}
            </p>
            {/* 후기 내용 */}
            <p className="mt-2">{review.comment}</p>
            {/* 평점 */}
            <p className="mt-2 text-sm text-yellow-500">평점: {review.rating}/5</p>
            {/* 첨부 이미지 */}
            {review.review_img_url && review.review_img_url.length > 0 && (
              <div className="mt-4 space-y-2">
                {review.review_img_url.map((imgUrl, index) => (
                  <img
                    key={index} // 각 이미지에 고유 키 설정
                    src={imgUrl} // 이미지 URL
                    alt={`Review Image ${index + 1}`} // 대체 텍스트
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
