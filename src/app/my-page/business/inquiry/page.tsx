'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

interface Inquiry {
  id: string;
  title: string;
  content: string;
  user_id: string | null; // 수정: string -> string | null
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

const InquiryPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);

        const { data, error, count } = await browserSupabase()
          .from('contacts')
          .select('id, title, content, user_id, created_at', { count: 'exact' })
          .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

        if (error) throw error;

        setInquiries(data || []);
        if (count) {
          setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
        }
      } catch (err) {
        console.error('Error fetching inquiries:', err);
        setError('문의 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [currentPage]);

  const handleDeleteInquiry = async (id: string) => {
    try {
      const { error } = await browserSupabase().from('contacts').delete().eq('id', id);

      if (error) throw error;

      setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
    } catch (err) {
      console.error('Error deleting inquiry:', err);
      setError('문의 삭제 중 오류가 발생했습니다.');
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">문의 관리</h2>

      {inquiries.length === 0 ? (
        <p>등록된 문의가 없습니다.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">제목</th>
              <th className="border p-2">작성자</th>
              <th className="border p-2">작성일</th>
              <th className="border p-2">작업</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="border p-2">{inquiry.title}</td>
                <td className="border p-2">{inquiry.user_id || '알 수 없음'}</td>
                <td className="border p-2">{new Date(inquiry.created_at).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteInquiry(inquiry.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span className="mx-4">페이지 {currentPage} / {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default InquiryPage;
