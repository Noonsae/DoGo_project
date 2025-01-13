'use client';
import React, { useEffect, useState } from 'react'; // React와 필요한 훅들(import)
import { browserSupabase } from '@/supabase/supabase-client'; // Supabase 클라이언트 가져오기

// SidebarProps: 컴포넌트의 props를 위한 타입 정의
interface SidebarProps {
  currentTab: string; // 현재 선택된 탭
  setCurrentTab: (tab: string) => void; // 탭 변경 함수
}

// BusinessUser: 사업자 정보 타입 정의
interface BusinessUser {
  id: string; // 사업자 ID
  user_name: string; // 사업자 이름
  created_at: string; // 가입일
}

const BusinessSidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  // 사업자 정보를 저장하는 상태
  const [businessInfo, setBusinessInfo] = useState<BusinessUser | null>(null);
  // 데이터 로딩 상태 관리
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 렌더링될 때 한 번 실행되는 useEffect
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        // Supabase에서 'users' 테이블 데이터를 가져옴
        const { data, error } = await browserSupabase()
          .from('users') // 'users' 테이블에서
          .select('id, user_name, created_at') // 필요한 필드 선택
          .eq('role', 'business') // role이 'business'인 사용자 필터링
          .maybeSingle(); // 한 명만 가져오도록 설정

        // 에러가 발생한 경우 예외 처리
        if (error) throw error;

        // 가져온 데이터를 상태에 저장
        setBusinessInfo(data);
      } catch (err) {
        console.error('Error fetching business info:', err); // 에러를 콘솔에 출력
      } finally {
        // 로딩 상태를 false로 설정
        setLoading(false);
      }
    };

    fetchBusinessInfo(); // 데이터 가져오기 함수 호출
  }, []); // 컴포넌트 마운트 시에만 실행

  // 메뉴 목록 배열 정의
  const menus = [
    { id: 'hotel', label: '호텔 관리' }, // 호텔 관리 메뉴
    { id: 'policy', label: '정책 관리' }, // 정책 관리 메뉴
    { id: 'room', label: '객실 관리' }, // 객실 관리 메뉴
    { id: 'booking', label: '예약 관리' }, // 예약 관리 메뉴
    { id: 'inquiry', label: '문의 관리' }, // 문의 관리 메뉴
  ];

  // 로딩 중일 때 표시할 메시지
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <aside className="w-64 bg-gray-100 p-4">
      {/* 사업자 정보 섹션 */}
      <div className="mb-6">
        {/* 사업자 아바타 */}
        <div className="rounded-full bg-gray-200 w-16 h-16 mx-auto"></div>
        {/* 사업자 이름 */}
        <p className="text-center mt-2 font-bold">
          {businessInfo ? businessInfo.user_name : 'Business Name'} {/* 데이터가 없을 경우 기본값 */}
        </p>
        {/* 가입일 */}
        <p className="text-center text-sm text-gray-600">
          가입일: {businessInfo ? new Date(businessInfo.created_at).toLocaleDateString() : 'N/A'} {/* 데이터 포맷 */}
        </p>
      </div>

      {/* 메뉴 목록 섹션 */}
      <ul className="space-y-2">
        {/* 각 메뉴를 순회하며 렌더링 */}
        {menus.map((menu) => (
          <li
            key={menu.id} // 메뉴의 고유 ID를 key로 사용
            className={`p-2 cursor-pointer rounded ${
              currentTab === menu.id ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'
            }`} // 현재 탭과 일치하면 스타일 변경
            onClick={() => setCurrentTab(menu.id)} // 클릭 시 탭 변경 함수 호출
          >
            {menu.label} {/* 메뉴 이름 표시 */}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BusinessSidebar;
