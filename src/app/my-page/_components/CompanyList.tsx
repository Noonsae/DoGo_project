'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// BusinessUser 데이터 타입 정의
interface BusinessUser {
  id: string; // 사용자 ID
  user_name: string; // 업체명
  email: string; // 이메일
  phone_number: string; // 전화번호
  business_number: string | null; // 사업자 번호 (null 가능)
  created_at: string; // 가입 날짜
}

const CompanyList: React.FC = () => {
  // 상태 정의
  const [companies, setCompanies] = useState<BusinessUser[]>([]); // 업체 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리

  // 데이터 가져오기
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Supabase에서 데이터 가져오기
        const { data, error } = await browserSupabase()
          .from('users')
          .select(`
            id,
            user_name,
            email,
            phone_number,
            business_number,
            created_at
          `)
          .eq('role', 'business'); // role이 'business'인 데이터만 필터링

        if (error) throw error;

        // 데이터를 상태에 저장
        setCompanies(data || []);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('업체 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // 검색 결과 필터링
  const filteredCompanies = companies.filter((company) =>
    company.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 로딩 중 메시지
  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;

  // 에러 발생 시 메시지
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 데이터가 없을 때 메시지
  if (filteredCompanies.length === 0)
    return <p className="text-center text-gray-600">등록된 업체가 없습니다.</p>;

  return (
    <div>
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

      <table className="w-full border-collapse border border-gray-300">
        {/* 테이블 헤더 */}
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">업체명</th>
            <th className="border p-2">이메일</th>
            <th className="border p-2">전화번호</th>
            <th className="border p-2">사업자 번호</th>
            <th className="border p-2">가입일</th>
          </tr>
        </thead>
        {/* 테이블 바디 */}
        <tbody>
          {filteredCompanies.map((company) => (
            <tr key={company.id}>
              <td className="border p-2">{company.user_name}</td>
              <td className="border p-2">{company.email}</td>
              <td className="border p-2">{company.phone_number}</td>
              <td className="border p-2">{company.business_number || 'N/A'}</td>
              <td className="border p-2">
                {new Date(company.created_at).toLocaleDateString('ko-KR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
