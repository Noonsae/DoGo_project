'use client';

import useAuthStore from '@/store/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

export default function MyProvider({ children }: { children: React.ReactNode }) {
  const { loadUserFromCookie } = useAuthStore((state) => state);

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
