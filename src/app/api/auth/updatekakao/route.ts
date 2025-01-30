import { NextResponse } from 'next/server';
import { updateKaKao } from '@/actions/auth';
export async function POST(req: Request) {
  try {
    const { userId, phoneNumber } = await req.json();

    if (!userId || !phoneNumber) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }

    const result = await updateKaKao(userId, phoneNumber);
    return NextResponse.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류 발생';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
