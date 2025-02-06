'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthPage, setIsAuthPage] = useState(false);
  // ⭐설명: pathname가 sign-in,up 시작하면,
  // isAuthPage를 true로 설정하고 auth에서 children(전역레이아웃) 렌더링을 막아주는 코드입니다.
  useEffect(() => {
    setIsAuthPage(pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'));
  }, [pathname]);

  return <>{!isAuthPage && children}</>;
}
