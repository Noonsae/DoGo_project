import { ReviewType } from '@/types/supabase/review-type';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ReviewThumbUpIcon from '../icon/ReviewThumbUpIcon';
import RenderStars from '../icon/RenderStars';
import DropDownIcon from '../icon/DropDownIcon';
import DropUpIcon from '../icon/DropUpIcon';

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
  const [activeTab, setActiveTab] = useState('all');

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelectOption = (option: string) => {
    setSortOption(option);
    filterAndSortReviews(option, activeTab);
    setIsDropdownOpen(false);
  };

  const filterAndSortReviews = (sortOption: string, activeTab: string) => {
    let filteredReviews = reviews.filter((review) => {
      return (
        activeTab === 'all' ||
        (activeTab === 'photo' &&
          review.review_img_url &&
          (typeof review.review_img_url === 'string' || Array.isArray(review.review_img_url)) &&
          review.review_img_url.length > 0)
      );
    });

    if (sortOption === '추천순' || sortOption === '최신 작성 순') {
      filteredReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortOption === '평점 높은 순') {
      filteredReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === '평점 낮은 순') {
      filteredReviews.sort((a, b) => a.rating - b.rating);
    }

    // 별점 및 평가 통계 재계산
    const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
    const newAverageRating = filteredReviews.length > 0 ? totalRating / filteredReviews.length : 0;

    const newRatingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    filteredReviews.forEach((review) => {
      newRatingCounts[review.rating] = (newRatingCounts[review.rating] || 0) + 1;
    });

    setSortedReviews(filteredReviews);
    setRatingCounts(newRatingCounts);
    setReviewCount(filteredReviews.length);
    setAverageRating(newAverageRating);
  };

  useEffect(() => {
    filterAndSortReviews(sortOption, activeTab);
  }, [reviews, sortOption, activeTab]);

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

        <div className="relative border-b border-gray-300">
          {/* 버튼 그룹 */}
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm font-bold ${activeTab === 'all' ? 'text-[#B3916A]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              전체 리뷰
            </button>
            <button
              className={`px-4 py-2 text-sm font-bold ${activeTab === 'photo' ? 'text-[#B3916A]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('photo')}
            >
              사진 리뷰
            </button>
          </div>

          {/* Indicator */}
          <div
            className={`absolute bottom-0 h-1 bg-[#B3916A] transition-transform duration-300`}
            style={{
              width: '10%',
              transform: `translateX(${activeTab === 'all' ? '28%' : '177%'})`
            }}
          ></div>
        </div>
        {/* 별점 통계 */}
        <div className="flex justify-between items-start mt-10 ml-7">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black">{ReviewThumbUpIcon()}</span>
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
                {isDropdownOpen ? DropUpIcon() : DropDownIcon()}
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
                    src={review.users?.profile_img || '/placeholder-profile.webp'}
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
                <p>{RenderStars(review.rating)}</p>
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
