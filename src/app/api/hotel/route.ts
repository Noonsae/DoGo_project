import { serverSupabase } from '@/supabase/supabase-server';

export const GET = async (req: Request) => {
  try {
    const supabase = await serverSupabase();
    const url = new URL(req.url);

    const offset = parseInt(url.searchParams.get('offset') || '0', 10); // 기본값: 0
    const limit = parseInt(url.searchParams.get('limit') || '8', 10); // 기본값: 8
    const gradeQuery = url.searchParams.get('grade'); // 성급 필터
    const sortOrder = url.searchParams.get('sortOrder'); // 정렬 기준

    // Supabase 쿼리 생성
    let query = supabase
      .from('hotels')
      .select('*, rooms(price)', { count: 'exact' }) // count로 총 개수 가져오기
      .range(offset, offset + limit - 1);

    // 성급 필터 추가
    if (gradeQuery) {
      const grades = gradeQuery.replace('in.(', '').replace(')', '').split(',');
      const validGrades = grades.map((g) => parseInt(g, 10)).filter((g) => !isNaN(g)); // 숫자만 필터링
      if (validGrades.length > 0) {
        query = query.in('stars', validGrades);
      }
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase Query Error:', error.message);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 데이터 형식 변환 및 가격 정렬 처리
    let hotels = data.map((hotel) => ({
      id: hotel.id,
      main_img_url: hotel.main_img_url || '',
      name: hotel.name,
      address: hotel.location || '',
      stars: hotel.stars,
      min_price: hotel.rooms?.length
        ? Math.min(...hotel.rooms.map((room) => room.price))
        : null,
    }));

    // 서버에서 정렬 처리
    if (sortOrder === 'asc') {
      hotels = hotels.sort((a, b) => (a.min_price ?? Infinity) - (b.min_price ?? Infinity));
    } else if (sortOrder === 'desc') {
      hotels = hotels.sort((a, b) => (b.min_price ?? 0) - (a.min_price ?? 0));
    }

    return new Response(
      JSON.stringify({
        items: hotels || [],
        totalCount: count || 0,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Server Error:', err.message);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
