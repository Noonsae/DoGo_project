'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import AdminSidebar from '@/app/my-page/_components/AdminSidebar';

// 협력 요청 데이터 타입 정의
interface CooperationRequest {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  businessNumber: string;
  createdAt: string;
}

const AdminCooperationPage: React.FC = () => {
  const [requests, setRequests] = useState<CooperationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'company' | 'requests' | 'bookings' | 'inquiry'>('requests'); // 'inquiry' 추가

  useEffect(() => {
    // 협력 요청 데이터 가져오기
    const fetchRequests = async () => {
      try {
        setLoading(true);

        const { data, error } = await browserSupabase()
          .from('users') // 스키마에 따라 테이블 이름은 'users'
          .select(
            `
            id,
            user_name as userName,
            email,
            phone_number as phoneNumber,
            business_number as businessNumber,
            created_at as createdAt
          `
          )
          .eq('role', 'business'); // role이 'business'인 사용자만 가져오기

        if (error) throw error;

        const formattedData: CooperationRequest[] = (data || []).map((item: any) => ({
          id: item.id || '알 수 없음',
          userName: item.userName || '알 수 없음',
          email: item.email || '없음',
          phoneNumber: item.phoneNumber || '없음',
          businessNumber: item.businessNumber || '미등록',
          createdAt: item.createdAt || ''
        }));

        setRequests(formattedData);
      } catch (err) {
        console.error('Error fetching cooperation requests:', err);
        setError('협력 요청 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (requests.length === 0) return <p className="text-center text-gray-500">등록된 협력 요청이 없습니다.</p>;

  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <AdminSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">협력 요청 관리</h1>
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">사용자 ID</th>
                <th className="border px-4 py-2">이름</th>
                <th className="border px-4 py-2">이메일</th>
                <th className="border px-4 py-2 hidden md:table-cell">연락처</th>
                <th className="border px-4 py-2">사업자 번호</th>
                <th className="border px-4 py-2">등록일</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="text-center">
                  <td className="border px-4 py-2">{request.id}</td>
                  <td className="border px-4 py-2">{request.userName}</td>
                  <td className="border px-4 py-2">{request.email}</td>
                  <td className="border px-4 py-2 hidden md:table-cell">{request.phoneNumber}</td>
                  <td className="border px-4 py-2">{request.businessNumber}</td>
                  <td className="border px-4 py-2">{new Date(request.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminCooperationPage;
