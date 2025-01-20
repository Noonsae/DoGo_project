import { serverSupabase } from '@/supabase/supabase-server';

export const GET = async (req: Request) => {
  try {
    const supabase = await serverSupabase();
    const url = new URL(req.url);

    // 쿼리 파라미터에서 필터 조건 추출
    const hotelId = url.searchParams.get('hotelId');
    const view = url.searchParams.get('view');
    const bedType = url.searchParams.get('bedType');

    if (!hotelId) {
      return new Response(JSON.stringify({ error: 'hotelId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 기본 쿼리: rooms 테이블 참조
    let query = supabase.from('rooms').select('*').eq('hotel_id', hotelId);

    // 일반 필드 조건 추가
    if (view) {
      query = query.eq('view', view);
    }
    if (bedType) {
      query = query.eq('bed_type', bedType);
    }

    // 데이터 가져오기
    const { data, error } = await query;

    if (error) {
      console.error('Supabase Query Error:', error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Server Error:', err.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
