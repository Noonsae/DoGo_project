// /app/api/facility/route.ts
import { serverSupabase } from '@/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const hotelId = searchParams.get('hotel_id'); // hotel_id를 쿼리 파라미터로 받음

    if (!hotelId) {
      return NextResponse.json({ error: 'hotel_id가 필요합니다.' }, { status: 400 });
    }

    const supabase = await serverSupabase();

    const { data, error } = await supabase
      .from('hotel_facility') // 테이블 이름
      .select('*') // 필요한 컬럼 선택 (필요시 특정 컬럼만 선택)
      .eq('hotel_id', hotelId); // hotel_id로 필터링

    if (error) {
      console.error('Error fetching facilities:', error);
      return NextResponse.json({ error: error.message || '시설 데이터를 가져오는 중 오류 발생' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('Unhandled error:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || '알 수 없는 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}
