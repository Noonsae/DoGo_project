import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// BusinessUser 인터페이스 정의
interface BusinessUser {
  id: string; // 사용자 ID
  user_name: string; // 사용자 이름 (업체명)
  email: string; // 사용자 이메일
  phone_number: string; // 전화번호
  business_number: string | null; // 사업자 번호 (string 형식, null 가능)
}

const CompanyList: React.FC = () => {
  // 업체 데이터를 저장하는 상태
  const [companies, setCompanies] = useState<BusinessUser[]>([]);
  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);
  // 오류 메시지 상태 관리
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트가 마운트되었을 때 한 번 실행
  useEffect(() => {
    // 업체 데이터를 가져오는 비동기 함수
    const fetchCompanies = async () => {
      try {
        // Supabase로부터 데이터를 가져옴
        const { data, error } = await browserSupabase()
          .from('users') // 'users' 테이블에서
          .select(`
            id,
            user_name,
            email,
            phone_number,
            business_number
          `)
          .eq('role', 'business'); // role이 'business'인 사용자만 필터링

        // 데이터베이스 호출에서 오류 발생 시 예외 처리
        if (error) throw error;

        // 데이터 포맷 수정: business_number를 string으로 변환
        const formattedData = (data || []).map((company) => ({
          ...company,
          business_number: company.business_number
            ? String(company.business_number) // number -> string으로 변환
            : null,
        }));

        // 상태에 포맷된 데이터를 저장
        setCompanies(formattedData);
      } catch (err) {
        // 에러가 발생하면 콘솔에 출력하고 오류 메시지 상태 설정
        console.error('Error fetching companies:', err);
        setError('업체 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        // 로딩 상태를 완료로 변경
        setLoading(false);
      }
    };

    fetchCompanies(); // 데이터를 가져오는 함수 호출
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트 마운트 시 한 번만 실행

  // 로딩 중일 때 표시할 메시지
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 오류가 발생했을 때 표시할 메시지
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 데이터가 없을 때 표시할 메시지
  if (companies.length === 0)
    return <p className="text-center text-gray-600">등록된 업체가 없습니다.</p>;

  return (
    <div>
      {/* 업체 리스트 제목 */}
      <h2 className="text-xl font-bold mb-4">업체 리스트</h2>
      {/* 업체 데이터를 표시하는 테이블 */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">업체명</th>
            <th className="border p-2">이메일</th>
            <th className="border p-2">전화번호</th>
            <th className="border p-2">사업자 번호</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              {/* 업체명 */}
              <td className="border p-2">{company.user_name}</td>
              {/* 이메일 */}
              <td className="border p-2">{company.email}</td>
              {/* 전화번호 */}
              <td className="border p-2">{company.phone_number}</td>
              {/* 사업자 번호 (null일 경우 'N/A' 표시) */}
              <td className="border p-2">{company.business_number || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
