'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client'; // Supabase 클라이언트 가져오기

// Props 타입 정의
interface BusinessSidebarProps {
  userId: string; // 현재 사용자 ID
  currentTab: string; // 현재 선택된 탭
  setCurrentTab?: (tab: string) => void; // 탭 변경 함수 (필요하지 않음)
}

// 사업자 정보 타입 정의
interface BusinessUser {
  id: string;
  user_name: string;
  created_at: string;
  business_number: string | null;
}

const BusinessSidebar: React.FC<BusinessSidebarProps> = ({ userId, currentTab }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessUser | null>(null); // 사업자 정보 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const router = useRouter(); // Next.js 라우터 사용

  // Supabase에서 사업자 데이터 가져오기
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('users')
          .select('id, user_name, created_at, business_number')
          .eq('id', userId) //1. 왜 undefined인지 찾아보기 
          .maybeSingle();

        if (error) throw error;

        setBusinessInfo(data);
      } catch (err) {
        console.error('Error fetching business info:', err); //문제가 있다면 체크해보기
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessInfo();
  }, [userId]);

  // 메뉴 정의
  const menus = [
    { id: 'hotel', label: '호텔 관리' },
    { id: 'policy', label: '정책 관리' },
    { id: 'room', label: '객실 관리' },
    { id: 'booking', label: '예약 관리' },
    { id: 'inquiry', label: '문의 관리' },
    { id: 'profile', label: '프로필 관리' }
  ];

  // 로딩 중일 때 출력
  if (loading) return <p className="text-center text-gray-600">로딩 중...</p>;

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      {/* 사업자 정보 표시 */}
      <div className="mb-6">
        <div className="rounded-full bg-gray-300 w-16 h-16 mx-auto" />
        <p className="text-center mt-2 font-bold">{businessInfo ? businessInfo.user_name : '사업자'}</p>
        <p className="text-center text-sm text-gray-600">
          가입일: {businessInfo ? new Date(businessInfo.created_at).toLocaleDateString() : 'N/A'}
        </p>
        <p className="text-center text-sm">사업자 번호: {businessInfo?.business_number || '없음'}</p>
      </div>

      {/* 메뉴 목록 */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menus.map((menu) => (
            <li
              key={menu.id}
              className={`p-2 rounded cursor-pointer ${
                currentTab === menu.id ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'
              }`}
              onClick={() => router.push(`/my-page/business/${menu.id}`)} // 경로 변경
            >
              {menu.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default BusinessSidebar;
