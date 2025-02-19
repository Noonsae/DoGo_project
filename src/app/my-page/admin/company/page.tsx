'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import AdminSidebar from '@/app/my-page/_components/AdminSidebar';

// AdminSidebar에서 지원하는 모든 탭 포함
// TODO 타입 파일 분리 
type AdminTabType = 'company' | 'requests' | 'bookings' | 'inquiry';

// 회사 데이터 타입 정의
// TODO 타입 파일 분리 
interface Company {
  id: string;
  name: string;
  businessNumber: string;
  ownerName: string;
  contact: string;
  createdAt: string;
}

const AdminCompanyPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<AdminTabType>('company');

  // 페이지네이션 관련 상태
  const [page, setPage] = useState(1);
  const pageSize = 10; // 한 페이지당 10개 표시
  const [totalPages, setTotalPages] = useState(1);

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    // 전체 데이터 개수 가져오기
    const fetchTotalCompanies = async () => {
      const { count, error } = await browserSupabase().from('users').select('*', { count: 'exact', head: true });

      if (!error && count !== null) {
        setTotalPages(Math.ceil(count / pageSize));
      }
    };

    fetchTotalCompanies();
  }, []);

  useEffect(() => {
    // 회사 데이터 가져오기
    const fetchCompanies = async () => {
      try {
        setLoading(true);

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error } = await browserSupabase()
          .from('users')
          .select(
            `
            id,
            user_name as name,
            business_number as businessNumber,
            nickname as ownerName,
            phone_number as contact,
            created_at as createdAt
          `
          )
          .range(from, to)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedData: Company[] =
          data?.map((item: any) => ({
            id: item.id,
            name: item.name || '알 수 없음',
            businessNumber: item.businessNumber || '미등록',
            ownerName: item.ownerName || '미등록',
            contact: item.contact || '없음',
            createdAt: item.createdAt
          })) || [];

        setCompanies(formattedData);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('회사 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [page]);

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex">
      {/* 사이드바 */}
      <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 메인 콘텐츠 */}
      <div className="p-6 bg-white rounded-lg shadow flex-grow">
        <h1 className="text-2xl font-bold mb-4">회사 관리</h1>

        {/* 반응형 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">회사 ID</th>
                <th className="border border-gray-200 px-4 py-2">회사 이름</th>
                <th className="border border-gray-200 px-4 py-2">사업자 번호</th>
                <th className="border border-gray-200 px-4 py-2">대표자 이름</th>
                <th className="border border-gray-200 px-4 py-2">연락처</th>
                <th className="border border-gray-200 px-4 py-2">등록일</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 p-4">
                    등록된 회사가 없습니다.
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id}>
                    <td className="border border-gray-200 px-4 py-2">{company.id}</td>
                    <td className="border border-gray-200 px-4 py-2">{company.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{company.businessNumber}</td>
                    <td className="border border-gray-200 px-4 py-2">{company.ownerName}</td>
                    <td className="border border-gray-200 px-4 py-2">{company.contact}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {new Date(company.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
            disabled={page === 1}
          >
            이전
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded-md">
            {page} / {totalPages} 페이지
          </span>
          <button
            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={page >= totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyPage;
