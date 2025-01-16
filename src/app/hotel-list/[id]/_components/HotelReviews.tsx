import ReviewsModal from '@/components/ui/hotel-review/ReviewsModal';
import { ReviewType } from '@/types/supabase/review-type';
import Image from 'next/image';
import { useState } from 'react';

interface HotelReviewsProps {
  loading: boolean;
  reviews: ReviewType[];
}

const HotelReviews = ({ loading, reviews }: HotelReviewsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div>
      <section id="reviews" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">이용 후기</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-[585px] h-[368px] bg-white border border-gray-200 rounded-[12px] p-[20px] shadow-md flex flex-col gap-[20px]"
                >
                  {/* 프로필 섹션 */}
                  <div className="flex gap-4">
                    <img
                      src={review.users?.profile_img || '/placeholder-profile.png'} // 프로필 이미지
                      alt="Profile"
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                    <div className="flex justify-between w-full">
                      <p className="font-bold text-lg">{review.users?.nickname || '익명'}</p>
                      <p className="text-sm text-gray-500">
                        작성일: {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {/* 별점 */}
                  <div>{renderStars(review.rating)}</div>
                  {/* 객실 타입 */}
                  <p className="text-sm text-gray-500 mt-2">{review.rooms?.room_type}• 성인 2명 • 1일 숙박</p>
                  {/* 사진 리뷰 */}
                  <div className="flex gap-2">
                    {(review.review_img_url && Array.isArray(review.review_img_url) ? review.review_img_url : []).map(
                      (url, index) => (
                        <Image
                          key={index}
                          src={typeof url === 'string' ? url : '/placeholder-profile.png'}
                          alt="Review Image"
                          className="w-[80px] h-[80px] object-cover rounded-md"
                          width={150}
                          height={150}
                        />
                      )
                    )}
                  </div>
                  <div>
                    {/* 코멘트 */}
                    <p className="text-sm text-gray-700 overflow-hidden line-clamp-2">{review.comment}</p>
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
            className="px-6 py-2 bg-[#B3916A] text-white rounded-lg shadow-md hover:bg-brown-500"
          >
            전체 후기 보러가기
          </button>
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && <ReviewsModal isOpen={isModalOpen} onClose={closeModal} reviews={reviews} />}
    </div>
  );
};

export default HotelReviews;
