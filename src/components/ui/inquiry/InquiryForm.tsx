//문의 입력 폼
'use client';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { getUser, getUserRole } from '@/actions/auth';
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
    const { data: userRoleData } = await getUserRole(userId);
    if (userRoleData?.role === 'business' || userRoleData?.role === 'admin') {
      Swal.fire({
        title: '문의 불가',
        text: '사업자 및 관리자 계정은 문의를 등록할 수 없습니다.',
        icon: 'warning',
        confirmButtonText: '확인'
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
  //커밋용
  useImperativeHandle(ref, () => ({
    submit: handleSubmit
  }));
  return (
    <form className="flex flex-col gap-4 mt-4 w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
      <div className="flex items-center">
        <p className="text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold leading-[135%] text-[#444]">
          제목
        </p>
        <span className="ml-1 text-red-500">*</span>
      </div>
      <input
        type="text"
        placeholder="문의하실 글의 제목을 작성해 주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`flex h-[48px] px-4 py-2 items-center gap-1 sm:gap-2 md:gap-4 border rounded mt-2 w-full text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[135%] ${
          title ? 'text-black' : 'text-[#A0A0A0]'
        }`}
      />

      <div className="flex items-center">
        <p className="text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold leading-[135%] text-[#444]">
          문의 사항
        </p>
        <span className="ml-1 text-red-500">*</span>
      </div>
      <textarea
        placeholder="문의하실 글의 내용을 작성해 주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`flex items-center gap-1 sm:gap-2 md:gap-4 w-full border rounded h-[176px] resize-none text-[16px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[135%]${
          content ? 'text-black' : 'text-[#A0A0A0]'
        }`}
      />
    </form>
  );
});
export default InquiryForm;
