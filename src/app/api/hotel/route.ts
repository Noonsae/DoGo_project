import { serverSupabase } from '@/supabase/supabase-server';

export const GET = async (req: Request) => {
  try {
    const supabase = await serverSupabase();
    const url = new URL(req.url);
    const grade = url.searchParams.get('grade'); // 호텔 등급 필터 (옵션)
    const sortOrder = url.searchParams.get('sortOrder'); // 가격 정렬

    // 모든 필드 선택
    let query = supabase
      .from('hotels')
      .select('*, rooms(price)') // rooms.price를 포함하여 가져오기
      .order('name', { ascending: true });

    // 호텔 등급 필터 적용
    if (grade) {
      query = query.eq('stars', Number(grade));
    }
    const { data, error } = await query;
    if (error) {
      console.error('Supabase Query Error:', error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 데이터 변환 (min_price 계산)
    const hotels = data.map((hotel) => ({
      id: hotel.id,
      main_img_url: hotel.main_img_url || '',
      name: hotel.name,
      address: hotel.address,
      stars: hotel.stars,
      min_price: hotel.rooms?.length
        ? Math.min(...hotel.rooms.map((room) => room.price)) // rooms 데이터가 있으면 최소 가격 계산
        : null // rooms 데이터가 없으면 null
    }));

    return new Response(JSON.stringify(hotels), {
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
