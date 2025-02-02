//문의 입력 폼
'use client';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { getUser } from '@/actions/auth';
import { useRouter } from 'next/navigation';

import useAuthStore from '@/store/useAuth';
import Swal from 'sweetalert2';
interface InquiryFormProps {
  category: string;
  hotel_id: string;
}
const InquiryForm = forwardRef(({ category, hotel_id }: InquiryFormProps, ref) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  const router = useRouter();
  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    } else {
      const storedUserId = localStorage.getItem('user_id');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!title || !content) {
      Swal.fire({
        title: '입력 오류',
        text: '제목과 내용을 입력해주세요.',
        icon: 'error',
        confirmButtonText: '확인'
      });
      return;
    }
    if (!userId) {
      Swal.fire({
        title: '로그인이 필요합니다.',
        text: '로그인 페이지로 이동할까요?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '이동',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/sign-in');
        }
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, title, content, user_id: userId, hotel_id })
      });

      if (!response.ok) {
        throw new Error('문의 등록에 실패했습니다.');
      }

      Swal.fire({
        title: '문의 등록 완료',
        text: '문의가 성공적으로 등록되었습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: '등록 실패',
        text: '카테고리를 선택해주세요.',
        icon: 'error',
        confirmButtonText: '확인'
      });
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit
  }));
  return (
    <form className="flex flex-col gap-4 mt-4">
      <div className="flex flex-row">
        <p className="text-[#444] font-pretendard text-[16px] font-semibold leading-[135%]">제목</p>
        <span className="ml-[4px] text-red-500">*</span>
      </div>
      <input
        type="text"
        placeholder="문의하실 글의 제목을 작성해 주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />
      <div className="flex flex-row">
        <p className="text-[#444] font-pretendard text-[16px] font-semibold leading-[135%]">문의사항</p>
        <span className="ml-[4px] text-red-500">*</span>
      </div>
      <textarea
        placeholder="문의하실 글의 내용을 작성해 주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded h-[176px] text-left flex items-center placeholder:text-left placeholder:flex placeholder:items-center"
      />
    </form>
  );
});
export default InquiryForm;
