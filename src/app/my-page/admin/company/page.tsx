'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import AdminSidebar from '@/app/my-page/_components/AdminSidebar';

// 회사 데이터 타입 정의
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
  const [currentTab, setCurrentTab] = useState<'company' | 'requests' | 'bookings'>('company');

  useEffect(() => {
    // 회사 데이터 가져오기
    const fetchCompanies = async () => {
      try {
        setLoading(true);

        const { data, error } = await browserSupabase()
          .from('users') // 스키마에 정의된 테이블 이름
          .select(`
            id,
            user_name as name,
            business_number as businessNumber,
            nickname as ownerName,
            phone_number as contact,
            created_at as createdAt
          `);

        if (error) throw error;

        const formattedData: Company[] = data?.map((item: any) => ({
          id: item.id,
          name: item.name || '알 수 없음',
          businessNumber: item.businessNumber || '미등록',
          ownerName: item.ownerName || '미등록',
          contact: item.contact || '없음',
          createdAt: item.createdAt,
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
  }, []);

  if (currentTab !== 'company') {
    return null; // 다른 탭 선택 시 회사 리스트를 숨김
  }

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (companies.length === 0) return <p className="text-center text-gray-500">등록된 회사가 없습니다.</p>;

  return (
    <div className="flex">
      {/* 사이드바 */}
      <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {/* 메인 콘텐츠 */}
      <div className="p-6 bg-white rounded-lg shadow flex-grow">
        <h1 className="text-2xl font-bold mb-4">회사 관리</h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
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
            {companies.map((company) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCompanyPage;
