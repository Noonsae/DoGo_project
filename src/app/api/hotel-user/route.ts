import { NextResponse } from 'next/server';
import { getUser, getUserRole } from '@/actions/auth';

export async function GET() {
  try {
    const userData = await getUser();
    const userId = userData?.data?.user?.id || null;

    let userRole = null;
    if (userId) {
      const roleData = await getUserRole(userId);
      userRole = roleData?.data?.role || null;
    }

    return NextResponse.json({ userId, userRole });
  } catch (error) {
    return NextResponse.json({ error: '❌ 유저 정보를 가져오는 중 오류 발생' }, { status: 500 });
  }
}
