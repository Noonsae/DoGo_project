'use client';

import { useEffect, useState } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Inquiry 데이터 타입 정의
// TODO 타입 파일 분리 
interface Inquiry {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

// Props 타입 정의
interface InquiryManagementProps {
  userId: string;
}

const InquiryManagement: React.FC<InquiryManagementProps> = ({ userId }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('contacts')
          .select('id, title, content, created_at')
          .eq('user_id', userId);

        if (error) throw error;

        setInquiries(data || []);
      } catch (err) {
        console.error('Error fetching inquiries:', err);
        setError('문의 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-600">로딩 중입니다...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (inquiries.length === 0) {
    return <p className="text-center text-gray-600">등록된 문의가 없습니다.</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">문의 관리</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 text-left">문의 제목</th>
            <th className="border p-2 text-left">문의 내용</th>
            <th className="border p-2 text-left">작성일</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id} className="hover:bg-gray-100">
              <td className="border p-2">{inquiry.title}</td>
              <td className="border p-2">{inquiry.content}</td>
              <td className="border p-2">
                {new Date(inquiry.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryManagement;
