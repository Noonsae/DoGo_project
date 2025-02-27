'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// BusinessUser 데이터 타입 정의
// TODO 타입 파일 분리 
interface BusinessUser {
  id: string;
  user_name: string | null; // null 허용
  email: string;
  phone_number: string;
  business_number: string | null;
  created_at: string;
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<BusinessUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // 데이터 가져오기
  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);

        const { count } = await browserSupabase()
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'business');

        if (count !== null) {
          setTotalPages(Math.ceil(count / pageSize));
        }

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error } = await browserSupabase()
          .from('users')
          .select('id, user_name, email, phone_number, business_number, created_at')
          .eq('role', 'business')
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) throw error;

        setCompanies((data as BusinessUser[]) ?? []);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('업체 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [page]);

  // 검색 필터링 (user_name이 null일 경우 대비)
  const filteredCompanies = companies.filter((company) =>
    (company.user_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">업체 리스트</h2>

      {/* 검색 바 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="업체명을 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* 로딩 및 에러 처리 */}
      {loading ? (
        <p className="text-center text-gray-600">로딩 중...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">업체명</th>
                <th className="border p-2">이메일</th>
                <th className="border p-2">전화번호</th>
                <th className="border p-2">사업자 번호</th>
                <th className="border p-2">가입일</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-600 p-4">
                    등록된 업체가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((company) => (
                  <tr key={company.id} className="text-center">
                    <td className="border p-2">{company.user_name ?? 'N/A'}</td>
                    <td className="border p-2">{company.email}</td>
                    <td className="border p-2">{company.phone_number}</td>
                    <td className="border p-2">{company.business_number || 'N/A'}</td>
                    <td className="border p-2">
                      {new Date(company.created_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* 페이지네이션 버튼 */}
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
        </>
      )}
    </div>
  );
};

export default CompanyList;
