'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/sign-in');
    }
  }, [router]);

  return (
    <div>
      {user ? (
        <div>
          <h1>환영합니다 , {user.email}</h1>
          <p> {user.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
