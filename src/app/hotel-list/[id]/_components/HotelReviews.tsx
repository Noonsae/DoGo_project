import ReviewsModal from '@/components/ui/hotel-review/ReviewsModal';
import Image from 'next/image';

import { useState } from 'react';
import { HotelReviewsProps } from '@/types/hotel/hotel-review-type';
import RatingIcon from '@/components/ui/icon/RatingIcon';
import useAverageRating from '@/hooks/hotel/useAverageRating';

const HotelReviews = ({ loading, reviews, allReviews }: HotelReviewsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const averageRating = useAverageRating(reviews);
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="reviews" className="scroll-mt-20" style={{ marginBottom: window.innerWidth <= 360 ? '0px' : '120px' }}>
      <div className="max-[360px]:flex max-[360px]:gap-2">
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-4 max-[360px]:text-[18px] max-[360px]:ml-5 ">
          이용 후기
        </h2>
        <p className="max-[360px]:text-[#444444] gap-1 text-[15px] max-[360px]:flex hidden h-[28px] w-[66px] py-1 max-[360px]:bg-blue-500 max-[360px]:bg-opacity-20 rounded-2xl justify-center items-center ">
          <RatingIcon className="w-[16px] h-[16px] " />
          {averageRating.toFixed(1)}
        </p>
        <p className="hidden max-[360px]:block text-[13px] font-medium  text-gray-600 mt-1">
          {allReviews.length}명의 평가 &gt;
        </p>
      </div>
      <p></p>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-[360px]:px-5">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200 rounded-[12px] p-[20px] shadow-md flex flex-col gap-[20px] max-[360px]:gap-0"
              >
                {/* 프로필 섹션 */}
                <div className="flex gap-4">
                  <img
                    src={review.users?.profile_img || '/placeholder-profile.webp'} // 프로필 이미지
                    alt="Profile"
                    className="w-[50px] h-[50px] rounded-full object-cover max-[360px]:w-[48] max-[360px]:h-[48px]"
                  />
                  <div className="flex justify-between w-full">
                    <p className="font-bold text-lg max-[360px]:text-[16px] max-[360px]:font-semibold">
                      {review.users?.nickname || '익명'}
                      <p className="hidden max-[360px]:block max-[360px]:text-[14px] max-[360px]:text-[#A0A0A0] max-[360px]:font-normal max-[360px]:mb-[20px]">
                        작성일:
                        {new Date(review.created_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </p>
                    <p className="text-sm text-gray-500 max-[360px]:hidden">
                      작성일:
                      {new Date(review.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {/* 별점 */}
                <div className="max-[360px]:mb-[20px]">{renderStars(review.rating)}</div>
                {/* 객실 타입 */}
                <p className="text-sm text-gray-500 mt-2 max-[360px]:text-[13px] max-[360px]:text-[#777] max-[360px]:font-medium max-[360px]:mt-0 max-[360px]:mb-3">
                  {review.rooms?.room_type} • 성인 2명 • 1일 숙박
                </p>
                {/* 사진 리뷰 */}
                <div className="flex gap-2">
                  {(review.review_img_url && Array.isArray(review.review_img_url) ? review.review_img_url : []).map(
                    (url, index) => (
                      <Image
                        key={index}
                        src={typeof url === 'string' ? url : '/placeholder-profile.webp'}
                        alt="Review Image"
                        width={80}
                        height={80}
                        className="w-[80px] h-[80px] object-cover rounded-md max-[360px]:w-[96px] max-[360px]:h-[96px] max-[360px]:mb-3"
                      />
                    )
                  )}
                </div>
                {/* 코멘트 */}
                <div>
                  <p className="text-sm text-gray-700 overflow-hidden line-clamp-3 max-[360px]:font-normal max-[360px]:text-[#636363]">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">아직 작성된 리뷰가 없습니다.</p>
          )}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={openModal}
          className="px-6 py-2 bg-[#B3916A] text-white rounded-lg shadow-md hover:bg-brown-500 max-[360px]:w-[151px] max-[360px]:h-10 max-[360px]:py-2 max-[360px]:px-4 max-[360px]:font-semibold"
        >
          전체 후기 보러가기
        </button>
      </div>
      <div className="hidden max-[360px]:block border-b-[10px] mt-[48px]" />
      {/* 모달 */}
      {isModalOpen && <ReviewsModal isOpen={isModalOpen} onClose={closeModal} reviews={allReviews} />}
    </section>
  );
};

export default HotelReviews;
