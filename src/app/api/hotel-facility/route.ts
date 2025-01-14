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

    // Join 쿼리로 facilities 테이블과 연결
    const { data, error } = await supabase
      .from('hotel_facility')
      .select(
        `
        id,
        hotel_id,
        facilities ( id, name )
      `
      )
      .eq('hotel_id', hotelId);

    if (error) {
      console.error('Error fetching facilities:', error);
      return NextResponse.json({ error: error.message || '시설 데이터를 가져오는 중 오류 발생' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    const facilitiesWithIdAndName = data.map((item: any) => ({
      id: item.facilities?.id,
      name: item.facilities?.name
    }));
    return NextResponse.json(facilitiesWithIdAndName || []);
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
