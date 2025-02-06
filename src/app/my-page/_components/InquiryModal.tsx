'use client';

import React, { useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  role: 'user' | 'business'; // 사용자 역할
  onInquirySubmitted: () => void; // 문의 등록 후 리스트 갱신을 위한 콜백
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, userId, role, onInquirySubmitted }) => {
  const [newInquiry, setNewInquiry] = useState({ category: '', title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 문의 등록 핸들러
  const handleNewInquirySubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Supabase에 데이터 추가
      const { error } = await browserSupabase()
        .from('inquiries')
        .insert([
          {
            user_id: userId,
            category: newInquiry.category,
            title: newInquiry.title,
            content: newInquiry.content,
            status: 'pending',
            assigned_to: '', // 기본값으로 할당
          },
        ]);

      if (error) throw error;

      // 등록 후 상태 초기화
      setNewInquiry({ category: '', title: '', content: '' });
      onInquirySubmitted(); // 리스트 갱신 트리거
      onClose(); // 모달 닫기
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError('문의 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{role === 'business' ? '업체 문의 등록' : '새 문의 등록'}</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="문의 유형 (예: 예약, 결제)"
          className="w-full p-2 border rounded mb-2"
          value={newInquiry.category}
          onChange={(e) => setNewInquiry({ ...newInquiry, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="문의 제목"
          className="w-full p-2 border rounded mb-2"
          value={newInquiry.title}
          onChange={(e) => setNewInquiry({ ...newInquiry, title: e.target.value })}
        />
        <textarea
          placeholder="문의 내용을 입력하세요."
          className="w-full p-2 border rounded mb-4"
          value={newInquiry.content}
          onChange={(e) => setNewInquiry({ ...newInquiry, content: e.target.value })}
        />
        <div className="flex justify-between">
          <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}>
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleNewInquirySubmit}
            disabled={loading}
          >
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
