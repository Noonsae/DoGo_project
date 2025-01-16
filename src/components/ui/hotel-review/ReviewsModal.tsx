import { ReviewType } from '@/types/supabase/review-type';
import React, { useEffect, useState } from 'react';

const LikeIcon = () => {
  return (
    <svg width="59" height="53" viewBox="0 0 59 53" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.83317 20.9999H10.8332V53H2.83317C1.36042 53 0.166504 51.8061 0.166504 50.3333V23.6666C0.166504 22.1938 1.36042 20.9999 2.83317 20.9999ZM16.9475 17.5522L34.0156 0.484292C34.4846 0.0150915 35.2276 -0.0376819 35.7582 0.360425L38.0318 2.0656C39.3244 3.03499 39.9068 4.68674 39.5081 6.25243L36.4326 18.3333H53.4998C56.4454 18.3333 58.8332 20.7211 58.8332 23.6666V29.2781C58.8332 29.9749 58.6966 30.6648 58.4316 31.3088L50.1798 51.3485C49.7684 52.3477 48.7945 53 47.714 53H18.8332C17.3604 53 16.1665 51.8061 16.1665 50.3333V19.4378C16.1665 18.7306 16.4475 18.0523 16.9475 17.5522Z"
        fill="#444444"
      />
    </svg>
  );
};

const ReviewsModal = ({
  isOpen,
  onClose,
  reviews
}: {
  isOpen: boolean;
  onClose: () => void;
  reviews: ReviewType[];
}) => {
  if (!isOpen) return null;

  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0); // 모든 리뷰의 평점 합
      setAverageRating(totalRating / reviews.length); // 평균 평점 계산
      setReviewCount(reviews.length); // 리뷰 수 설정

      // 평점별 리뷰 수 카운트
      const newRatingCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviews.forEach((review) => {
        if (newRatingCounts[review.rating] !== undefined) {
          newRatingCounts[review.rating] += 1;
        }
      });
      setRatingCounts(newRatingCounts);
    }
  }, [reviews]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white shadow-lg p-6 rounded-lg overflow-y-auto"
        style={{
          width: '600px',
          height: '740px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          닫기
        </button>
        <h2 className="text-xl font-bold mb-4">전체 이용 후기</h2>

        {/* 상단 별점, 리뷰 수 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div>
              <span className="text-4xl font-bold">{LikeIcon()}</span>
              <span className="text-sm text-gray-500 ml-2">({reviewCount}개의 리뷰)</span>
            </div>
            <span className="text-3xl">{averageRating.toFixed(1)}</span>
          </div>
          <div className="mb-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>{rating}점</span>
                <div className="flex items-center">
                  <div className="bg-[#B3916A] rounded-full w-[250px] h-2 mr-2"></div>
                  <span>{ratingCounts[rating]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 평점별 리뷰 수 그래프 */}

        <button className="text-sm text-gray-600 border border-gray-400 px-2 py-1 ml-[380px] mb- w-[160px] h-[48px] rounded-md hover:bg-gray-200">
          추천순
        </button>

        {/* 리뷰 목록 */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              <div key={review.id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                {/* 프로필, 이름, 작성일 */}
                <div className="flex gap-4 mb-2">
                  <img
                    src={review.users?.profile_img || '/placeholder-profile.png'} // 프로필 이미지
                    alt="Profile"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="flex justify-between w-full">
                    <p className="font-bold text-lg">{review.users?.nickname || '익명'}</p>
                    <p className="text-sm text-gray-500">작성일: {new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* 별점 표시 */}
                <p>{renderStars(review.rating)}</p>

                <p className="text-sm text-gray-700 mb-2">{review.comment}</p>

                {/* 사진 리뷰 */}
                {review.review_img_url?.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {review.review_img_url.map((url: string, index: number) => (
                      <img key={index} src={url} alt="Review Image" className="w-24 h-24 object-cover rounded-md" />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">아직 작성된 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
