//문의 입력 폼
'use client';
import { getUser } from '@/actions/auth';
import useAuthStore from '@/store/useAuth';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
interface InquiryFormProps {
  category: string;
}
const InquiryForm = forwardRef(({ category }: InquiryFormProps, ref) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

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
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, title, content, user_id: userId })
      });

      if (!response.ok) {
        throw new Error('문의 등록에 실패했습니다.');
      }

      alert('문의가 성공적으로 등록되었습니다.');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
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
