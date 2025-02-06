'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client';
import Image from 'next/image';

const ReviewWritePage = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 별점 설정
  const handleRating = (value: number) => setRating(value);

  // 이미지 업로드 및 미리보기
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.error('파일이 선택되지 않았습니다.');
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      console.error('파일이 없습니다.');
      return;
    }

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages((prev) => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(file);

    // Supabase에 이미지 업로드
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `reviews/${fileName}`;

    const { data, error } = await browserSupabase().storage.from('review_images').upload(filePath, file);

    if (error) {
      console.error('Image upload error:', error);
      return;
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/review_images/${filePath}`;
    setImageUrls((prev) => [...prev, imageUrl]);
  };

  // 이미지 삭제 기능 (미리보기에서 제거)
  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // 후기 제출 핸들러
  const handleSubmitReview = async () => {
    if (!rating || reviewText.trim() === '') {
      setError('별점과 후기를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const user = await browserSupabase().auth.getUser();
      if (!user.data.user) throw new Error('로그인이 필요합니다.');

      const { data, error } = await browserSupabase()
        .from('reviews')
        .insert([
          {
            user_id: user.data.user.id,
            rating,
            comment: reviewText,
            review_img_url: imageUrls
            //TODO :  room_id: 
          }
        ]);

      if (error) throw error;
      router.push('/my-page/user/review');
    } catch (err) {
      console.error('Review submission error:', err);
      setError('후기 제출 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">후기 작성하기</h1>

      {/* 별점 선택 */}
      <div className="mb-4">
        <p className="font-semibold">평점</p>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* 이미지 업로드 */}
      <div className="mb-4">
        <p className="font-semibold">리뷰 이미지 등록하기</p>
        <div className="flex space-x-2 mt-2">
          {previewImages.map((url, index) => (
            <div key={index} className="relative group">
              <Image src={url} alt="리뷰 이미지" width={80} height={80} className="rounded" />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full opacity-75 hover:opacity-100"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
          <label className="cursor-pointer border border-gray-300 p-2 rounded">
            이미지 추가
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      </div>

      {/* 후기 작성 입력 */}
      <textarea
        className="w-full p-3 border border-gray-300 rounded mb-4"
        placeholder="마음껏 호텔에 대한 자세한 이용 후기를 작성해주세요."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>

      {/* 오류 메시지 */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* 버튼 그룹 */}
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setIsCancelModalOpen(true)}>
          취소
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmitReview}
          disabled={loading}
        >
          {loading ? '제출 중...' : '등록'}
        </button>
      </div>

      {/* 취소 확인 모달 */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">페이지를 나가시겠습니까?</p>
            <p className="text-sm text-gray-600 mb-4">페이지를 나가면 후기 등록 시 작성된 내용이 초기화됩니다.</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsCancelModalOpen(false)}
              >
                아니요
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => router.back()}
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewWritePage;
