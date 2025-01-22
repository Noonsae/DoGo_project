import LikeIcon from '@/app/hotel-list/_components/LikeIcon';
import { ReviewType } from '@/types/supabase/review-type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
  const [sortedReviews, setSortedReviews] = useState<ReviewType[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('추천순'); // 드롭다운 정렬 옵션

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

  const dropDownIcon = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const dropUpIcon = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 15L12 9L6 15" stroke="#444444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      let filteredReviews = [...reviews];

      // 정렬 기준 적용
      if (sortOption === '추천순' || sortOption === '최신 작성 순') {
        filteredReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      } else if (sortOption === '평점 높은 순') {
        filteredReviews.sort((a, b) => b.rating - a.rating);
      } else if (sortOption === '평점 낮은 순') {
        filteredReviews.sort((a, b) => a.rating - b.rating);
      }

      setSortedReviews(filteredReviews);

      // 별점 및 평가 통계 계산
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const newAverageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

      const newRatingCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviews.forEach((review) => {
        if (newRatingCounts[review.rating] !== undefined) {
          newRatingCounts[review.rating] += 1;
        }
      });

      setRatingCounts(newRatingCounts);
      setReviewCount(reviews.length);
      setAverageRating(newAverageRating);
    } else {
      setSortedReviews([]);
      setRatingCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
      setReviewCount(0);
      setAverageRating(0);
    }
  }, [reviews, sortOption]);

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

        {/* 별점 통계 */}
        <div className="flex justify-between items-start mt-10 ml-7">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black">{LikeIcon()}</span>
              </div>
              <span className="text-5xl font-extrabold mt-1.5 -ml-2 text-[#232527]">{averageRating.toFixed(1)}</span>
            </div>
          </div>

          {/* 별점 바 */}
          <div className="flex flex-col gap-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-6">{rating}점</span>
                <div className="relative w-[300px] h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-2 bg-[#B3916A] rounded-full"
                    style={{ width: `${(ratingCounts[rating] / reviewCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <h2 className="text-lg font-bold text-[#444]">총 {sortedReviews.length}개의 후기</h2>
          {/* 드롭다운 정렬 버튼 */}
          <div className="relative mb-4">
            {/* 드롭다운 버튼 */}
            <button
              onClick={toggleDropdown}
              className="flex justify-between items-center px-4 py-2 w-48 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none hover:bg-gray-200"
            >
              {sortOption}
              <span className="ml-2 transform transition-transform duration-300">
                {isDropdownOpen ? dropUpIcon() : dropDownIcon()}
              </span>
            </button>

            {/* 드롭다운 리스트 */}
            {isDropdownOpen && (
              <div className="absolute top-12 left-0 w-48 bg-white border border-gray-300 shadow-md rounded-lg z-10">
                <ul className="flex flex-col text-sm">
                  {['추천순', '최신 작성 순', '평점 높은 순', '평점 낮은 순'].map((option) => (
                    <li
                      key={option}
                      onClick={() => handleSelectOption(option)}
                      className={`cursor-pointer px-4 py-2 hover:bg-gray-100 flex justify-between items-center ${
                        sortOption === option ? 'font-bold text-[#B3916A]' : 'text-gray-600'
                      }`}
                    >
                      {option}
                      {sortOption === option && <span className="text-[#B3916A] font-bold ml-2">✔</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 리뷰 리스트 */}
        <div className="flex flex-col gap-10 mt-2">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div key={review.id} className="p-4 border-b border-gray-200">
                <div className="flex gap-4 mb-2 items-center">
                  <Image
                    src={review.users?.profile_img || '/placeholder-profile.png'}
                    alt="Profile"
                    height={80}
                    width={80}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="flex justify-between w-full">
                    <p className="font-bold text-[#444] text-lg">{review.users?.nickname || '익명'}</p>
                    <p className="text-sm text-gray-500">작성일: {new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <p>{renderStars(review.rating)}</p>
                <div className="flex gap-1 h-[80px]">
                  {Array.isArray(review.review_img_url) ? (
                    review.review_img_url.map((url, index) =>
                      typeof url === 'string' ? (
                        <Image key={index} src={url} alt={`review-image-${index}`} height={80} width={80} />
                      ) : null
                    )
                  ) : typeof review.review_img_url === 'string' ? (
                    <Image src={review.review_img_url} alt="review-image" height={80} width={80} />
                  ) : null}
                </div>
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
