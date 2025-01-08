// import { serverSupabase } from '@/supabase/supabase-server';
// import { HotelType } from '@/types/supabase/hotel-type';
// import { RoomType } from '@/types/supabase/room-type';

// interface Filters {
//   grade?: number; // 호텔 등급
// }

// export const fetchHotelsAndRooms = async (
//   filters: Filters = {}
// ): Promise<{ hotels: HotelType[]; rooms: RoomType[] }> => {
//   const supabase = await serverSupabase();

//   let query = supabase.from('hotels').select('*');

//   // 호텔 등급 필터 적용
//   if (filters.grade) {
//     query = query.eq('stars', filters.grade);
//   }

//   const { data: hotels, error: hotelsError } = await query;
//   if (hotelsError) {
//     throw new Error(`Failed to fetch hotels: ${hotelsError.message}`);
//   }

//   const { data: rooms, error: roomsError } = await supabase.from('rooms').select('*');
//   if (roomsError) {
//     throw new Error(`Failed to fetch rooms: ${roomsError.message}`);
//   }

//   return { hotels: hotels || [], rooms: rooms || [] };
// };
