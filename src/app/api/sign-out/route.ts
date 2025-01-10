'use server';

import { redirect } from 'next/navigation';

export async function logout() {
  try {
    localStorage.removeItem('user');
    console.log('User logged out');
    redirect('/sign-in');
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw new Error('로그아웃에 실패했습니다.');
  }
}
