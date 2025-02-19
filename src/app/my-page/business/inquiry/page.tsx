'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import InquiryModal from '@/app/my-page/_components/InquiryModal';

// 문의 데이터를 나타내는 인터페이스 정의
// TODO 타입 파일 분리 
interface Inquiry {
  id: string;
  title: string;
  content: string;
  user_id: string | null;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

const BusinessInquiryPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const businessId = '현재 로그인된 업체 ID'; // 실제 로그인된 업체 ID 가져와야 함

  useEffect(() => {
    fetchInquiries();
  }, [currentPage]);

  // 문의 목록 가져오기
  // TODO 데이터 요청 함수 분리
  const fetchInquiries = async () => {
    try {
      setLoading(true);

      const { data, error, count } = await browserSupabase()
        .from('contacts')
        .select('id, title, content, user_id, created_at', { count: 'exact' })
        .eq('user_id', businessId) // 업체 ID로 필터링
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

  // 문의 삭제 핸들러
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

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">업체 문의 관리</h2>

      {/* 문의 등록 버튼 */}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        업체 문의 등록하기
      </button>

      {/* 문의 목록 */}
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

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span className="mx-4">
          페이지 {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>

      {/* 모달 추가 */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={businessId}
        role="business"
        onInquirySubmitted={fetchInquiries}
      />
    </div>
  );
};

export default BusinessInquiryPage;
