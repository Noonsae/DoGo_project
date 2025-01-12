import { serverSupabase } from '@/supabase/supabase-server';

export const GET = async (req: Request) => {
  try {
    const supabase = await serverSupabase();
    const url = new URL(req.url);

    const offset = parseInt(url.searchParams.get('offset') || '0', 10); // 기본값: 0
    const limit = parseInt(url.searchParams.get('limit') || '8', 10); // 기본값: 8
    const grade = url.searchParams.get('grade'); // 성급 필터

    let query = supabase
      .from('hotels')
      .select('*, rooms(price)', { count: 'exact' }) // count('exact')로 전체 개수 가져오기
      .order('name', { ascending: true })
      .range(offset, offset + limit - 1); // 페이지네이션 처리

    if (grade) {
      query = query.eq('stars', parseInt(grade, 10));
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase Query Error:', error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hotels = data.map((hotel) => ({
      id: hotel.id,
      main_img_url: hotel.main_img_url || '',
      name: hotel.name,
      address: hotel.location || '',
      stars: hotel.stars,
      min_price: hotel.rooms?.length
        ? Math.min(...hotel.rooms.map((room) => room.price))
        : null,
    }));

    return new Response(
      JSON.stringify({
        items: hotels || [],
        totalCount: count || 0, // 전체 데이터 개수 반환
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Server Error:', err.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
