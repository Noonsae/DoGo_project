/**
 * 유저 마이페이지 -> 일반 사용자로 로그인한 당사자만 들어갈 수 있다. -> 비즈니스 마이페이지 X, 어드민 X
 * 비즈니스 마이페이지 -> 비즈니스 사용자로 로그인한 당사자만 들어갈 수 있다. -> 일반 마이페이지 X, 어드민 X
 * 어드민 마이페이지 -> 어드민 사용자만 접근 가능
 */

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import UserPage from '@/app/my-page/user/page';
import BusinessPage from '@/app/my-page/business/page';
import AdminPage from '@/app/my-page/admin/page';
import useAuthStore from '@/store/useAuth';

// Supabase 클라이언트 초기화
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function MyPage() {
  // TODO: 사용 예시
  const user = useAuthStore((state) => state.user);
  const [role, setRole] = useState<'user' | 'business' | 'admin' | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // 사용자 ID 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // 현재 인증된 사용자 정보 가져오기
        const {
          data: { user },
          error: authError
        } = await supabase.auth.getUser();

        if (authError || !user) throw new Error('로그인된 사용자가 없습니다.');

        setUserId(user.id); // 사용자 ID 저장

        // 사용자 역할 가져오기
        const { data, error: userError } = await supabase.from('users').select('role').eq('id', user.id).single();

        if (userError) throw userError;

        // 역할 설정
        setRole(data.role);
      } catch (err) {
        console.error('Error fetching user role:', err);
        setError('사용자 정보를 가져오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // 로딩 상태 처리
  if (loading) {
    return <p className="text-center text-gray-500">페이지를 로드하는 중입니다...</p>;
  }

  // 에러 상태 처리
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // 역할에 따른 페이지 렌더링
  switch (role) {
    case 'user':
      return <UserPage />;
    case 'business':
      return <BusinessPage userId={userId!} />; // `userId`를 `BusinessPage`로 전달
    case 'admin':
      return <AdminPage />;
    default:
      return <p className="text-center text-gray-500">유효한 역할을 찾을 수 없습니다.</p>;
  }
}
