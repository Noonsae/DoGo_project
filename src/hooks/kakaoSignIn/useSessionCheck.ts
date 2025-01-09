'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuth';
import { browserSupabase } from '@/supabase/supabase-client';

export const useSessionCheck = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const supabase = browserSupabase();
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        setUser(data.session.user);
        document.cookie = `user=${encodeURIComponent(JSON.stringify(data.session.user))}; path=/;`;

        Swal.fire({
          icon: 'success',
          title: '카카오 로그인 성공',
          text: `${data.session.user.email}님 환영합니다!`,
          confirmButtonText: '확인'
        });

        router.push('/'); // 메인 페이지로 이동
      } else if (error) {
        console.error('세션 로드 실패:', error.message);
        Swal.fire({
          icon: 'error',
          title: '세션 오류',
          text: '로그인 세션을 불러오지 못했습니다.',
          confirmButtonText: '확인'
        });
      }
    };

    fetchSession();
  }, []);
};
