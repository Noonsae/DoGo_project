'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { browserSupabase } from '@/supabase/supabase-client';
import useAuthStore from '@/store/useAuth';

// 사업자 정보 타입 정의
interface BusinessUser {
  id: string;
  user_name: string;
  created_at: string;
  business_number: string | null;
}

// 메뉴 정의
const MENUS = [
  { id: 'hotel', label: '호텔 관리' },
  { id: 'policy', label: '정책 관리' },
  { id: 'room', label: '객실 관리' },
  { id: 'booking', label: '예약 관리' },
  { id: 'inquiry', label: '문의 관리' },
  { id: 'profile', label: '프로필 관리' }
];

const BusinessSidebar: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('');
  const user = useAuthStore((state) => state.user);
  const [businessInfo, setBusinessInfo] = useState<BusinessUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = user?.id;
  const pathname = usePathname();

  // 현재 URL에서 탭 추출
  useEffect(() => {
    const pathnames = pathname.split('/');
    const currentPath = pathnames[pathnames.length - 1];
    setCurrentTab(currentPath);
  }, [pathname]);

  // Supabase에서 사업자 정보 가져오기
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        if (userId) {
          const { data, error } = await browserSupabase()
            .from('users')
            .select('id, user_name, created_at, business_number')
            .eq('id', userId)
            .maybeSingle();

          if (error) throw error;

          setBusinessInfo((data as BusinessUser) ?? null);
        }
      } catch (err) {
        console.error('Error fetching business info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessInfo();
  }, [userId]);

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
          {MENUS.map((menu) => (
            <li
              key={menu.id}
              className={`p-2 rounded cursor-pointer ${
                currentTab === menu.id ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'
              }`}
              onClick={() => router.push(`/my-page/business/${menu.id}`)}
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
