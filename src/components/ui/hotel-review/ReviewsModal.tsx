import { ReviewType } from '@/types/supabase/review-type';
import Image from 'next/image';
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
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('최신순');
  const [filterOption, setFilterOption] = useState('전체 후기'); // "전체 후기" 또는 "사진 후기"
  const [sortedReviews, setSortedReviews] = useState<ReviewType[]>([]);

  const handleSelectOption = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      let filteredReviews = [...reviews];

      // 필터 옵션에 따른 필터링
      if (filterOption === '사진 후기') {
        filteredReviews = filteredReviews.filter(
          (review) => Array.isArray(review.review_img_url) && review.review_img_url.length > 0
        );
      }

      // 정렬 옵션에 따른 정렬
      if (sortOption === '최신순') {
        filteredReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      } else if (sortOption === '별점 높으순') {
        filteredReviews.sort((a, b) => b.rating - a.rating);
      } else if (sortOption === '별점 낮으순') {
        filteredReviews.sort((a, b) => a.rating - b.rating);
      }

      setSortedReviews(filteredReviews);

      // 통계 계산
      const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(filteredReviews.length > 0 ? totalRating / filteredReviews.length : 0);
      setReviewCount(filteredReviews.length);

      const newRatingCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      filteredReviews.forEach((review) => {
        if (newRatingCounts[review.rating] !== undefined) {
          newRatingCounts[review.rating] += 1;
        }
      });
      setRatingCounts(newRatingCounts);
    } else {
      setSortedReviews([]);
      setAverageRating(0);
      setReviewCount(0);
      setRatingCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    }
  }, [reviews, sortOption, filterOption]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg p-6 rounded-lg overflow-y-auto scrollbar-hide w-[600px] h-[740px]">
        {/* 상단 헤더 */}
        <div className="flex justify-between items-center h-[67px] mb-4 bg-[#221A1A] -mx-6 -mt-6 px-6 py-2 rounded-t-lg">
          <h1 className="text-white font-semibold">이용후기</h1>
          <button onClick={onClose} className="text-gray-300 hover:text-white px-2 py-1 rounded-md">
            닫기
          </button>
        </div>

        {/* 필터 버튼 */}
        <div className="text-base text-[#534431] flex gap-5 mb-4">
          <h2
            onClick={() => setFilterOption('전체 후기')}
            className={`cursor-pointer px-4 py-2 rounded-lg font-bold ${
              filterOption === '전체 후기' ? ' text-[#534431]' : ' text-[#777]'
            }`}
          >
            전체 후기
          </h2>
          <h2
            onClick={() => setFilterOption('사진 후기')}
            className={`cursor-pointer px-4 py-2 rounded-lg font-bold ${
              filterOption === '사진 후기' ? ' text-[#534431]' : ' text-[#777]'
            }`}
          >
            사진 후기
          </h2>
        </div>
        <div className="border-b border-gray-200"></div>

        {/* 별점, 리뷰 수 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center flex-col ml-[60px]">
              <span className="text-4xl font-black">{LikeIcon()}</span>
              <span className="text-lg text-gray-500 ml-2 mt-1">총 {reviewCount}개의 평가</span>
            </div>
            <span className="text-5xl font-extrabold -mt-6 text-[#232527]">{averageRating.toFixed(1)}</span>
          </div>
          <div>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>{rating}점</span>
                <div className="flex items-center">
                  <div className="bg-[#B3916A] rounded-full w-[180px] h-2 mr-2"></div>
                  <span>{ratingCounts[rating]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 정렬 드롭다운 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-[#444]">총 {reviewCount}개의 후기</h2>

          <div className="relative">
            <button
              className="text-sm text-gray-600 border border-gray-400 px-2 py-1 w-[150px] h-[48px] rounded-md hover:bg-gray-200 flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {sortOption}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-[160px] bg-white border border-gray-300 rounded-md shadow-md z-10">
                <button
                  onClick={() => handleSelectOption('최신순')}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  최신순
                </button>
                <button
                  onClick={() => handleSelectOption('별점 높으순')}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  별점 높으순
                </button>
                <button
                  onClick={() => handleSelectOption('별점 낮으순')}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  별점 낮으순
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 리뷰 리스트 */}
        <div className="flex flex-col gap-10">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div key={review.id} className="p-4 border-b border-gray-200">
                <div className="flex gap-4 mb-2 justify-center items-center">
                  <img
                    src={review.users?.profile_img || '/placeholder-profile.png'}
                    alt="Profile"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="flex justify-between w-full">
                    <p className="font-bold text-[#444] text-lg">{review.users?.nickname || '익명'}</p>
                    <p className="text-sm text-gray-500">작성일: {new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <p>{renderStars(review.rating)}</p>

                {Array.isArray(review.review_img_url) &&
                  review.review_img_url.map((item, idx) => (
                    <Image
                      key={idx}
                      src={item}
                      alt="Review Image"
                      width={300}
                      height={300}
                      className="inline-block w-24 h-24 object-cover rounded-md mr-2"
                    />
                  ))}
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                </div>
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
