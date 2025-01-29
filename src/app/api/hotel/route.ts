// import { serverSupabase } from '@/supabase/supabase-server';

// export const GET = async () => {
//   try {
//     const supabase = await serverSupabase();

//     // ⭐ hotels 테이블과 rooms 테이블을 조인하여 최소 가격 가져오기
//     const { data, error } = await supabase
//       .from('hotels')
//       .select(
//         `
//         *,
//         rooms(price),
//         facilities:facilities(id, name)
//       `
//       )
//       .order('rooms.price', { ascending: true })
//       .limit(1, { foreignTable: 'rooms' }); // ⭐ rooms 테이블에서 최소 가격만 가져옴

//     if (error) {
//       console.error('호텔 데이터 조회 오류:', error);
//       return new Response(JSON.stringify({ error: '호텔 데이터를 가져오는 중 오류 발생' }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     // ⭐ 데이터 가공
//     const hotels = data.map((hotel) => ({
//       ...hotel,
//       min_price: hotel.rooms?.[0]?.price || null, // rooms 테이블에서 최소 가격 가져오기
//       rooms: undefined, // rooms 데이터 제거 (필요 없으면)
//       facility_names: hotel.facilities?.map((facility) => facility.name) || [] // 시설 이름만 추출
//     }));

//     return new Response(JSON.stringify({ items: hotels }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (err: any) {
//     console.error('Server Error:', err.message);
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// };
