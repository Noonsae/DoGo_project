'use client';

import useAuthStore from '@/store/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';

export default function MyProvider({ children }: { children: React.ReactNode }) {
  const { loadUserFromCookie } = useAuthStore((state) => state);
  // zustand -> state -> setState (state 변경) -> 리렌더링
  // loadUserFromCookie(); -> state 변경 -> 리렌더링 -> loadUserFromCookie 실행 -> 리렌더링 -> loadUserFromCookie 실행 -> 리렌더링
  useEffect(() => {
    loadUserFromCookie();
  }, []);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000
          }
        }
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
