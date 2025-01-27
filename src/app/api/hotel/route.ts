import { serverSupabase } from '@/supabase/supabase-server';

export const GET = async (req: Request) => {
  try {
    const supabase = await serverSupabase();
    const url = new URL(req.url);

    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const limit = parseInt(url.searchParams.get('limit') || '8', 10);
    const gradeQuery = url.searchParams.get('grade');
    const minPrice = parseInt(url.searchParams.get('minPrice') || '0', 10);
    const maxPrice = parseInt(url.searchParams.get('maxPrice') || '10000000', 10);
    const facilities = url.searchParams.get('facilities')?.split(',') || [];
    const services = url.searchParams.get('services')?.split(',') || [];
    const sortOrder = url.searchParams.get('sortOrder');

    let query = supabase
      .from('hotels')
      .select(
        `
          id,
          name,
          description,
          main_img_url,
          location,
          stars,
          address,
          rooms(price, view),
          hotel_facility(facility_id(name)),
          hotel_service(service_id(name))
        `,
        { count: 'exact' }
      )
      .range(offset, offset + limit - 1);

    // 성급 필터 추가
    if (gradeQuery) {
      const grades = gradeQuery.replace('in.(', '').replace(')', '').split(',');
      const validGrades = grades.map((g) => parseInt(g, 10)).filter((g) => !isNaN(g));
      if (validGrades.length > 0) {
        query = query.in('stars', validGrades);
      }
    }

    // 가격 필터 추가
    query = query.gte('rooms.price', minPrice).lte('rooms.price', maxPrice);

    if (facilities.length > 0) {
      facilities.forEach((facility) => {
        query = query.filter('hotel_facility.facility_id', 'eq', facility);
      });
    }
    if (services.length > 0) {

      // UUID 배열을 IN 조건으로 필터링
      query = query.in('hotel_service.service_id', services);
    }

    const { data, error, count } = await query;

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 데이터 형식 변환
    const hotels = data.map((hotel) => ({
      id: hotel.id,
      description: hotel.description || '',
      main_img_url: hotel.main_img_url || '',
      name: hotel.name || '',
      address: hotel.address || '',
      location: hotel.location || '',
      stars: hotel.stars || 0,
      min_price:
        hotel.rooms?.length > 0
          ? Math.min(...hotel.rooms.map((room) => room.price).filter((price) => price != null)) // null 방지
          : null,
      facilities: hotel.hotel_facility?.map((facility) => facility.facility_id?.name) || [],
      services: hotel.hotel_service?.map((service) => service.service_id?.name) || []
    }));

    // 서버에서 정렬 처리
    if (sortOrder === 'asc') {
      hotels.sort((a, b) => (a.min_price ?? Infinity) - (b.min_price ?? Infinity));
    } else if (sortOrder === 'desc') {
      hotels.sort((a, b) => (b.min_price ?? 0) - (a.min_price ?? 0));
    }

    return new Response(
      JSON.stringify({
        items: hotels || [],
        totalCount: count || 0
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err: any) {
    console.error('Server Error:', err.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
