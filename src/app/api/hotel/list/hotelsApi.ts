import { browserSupabase } from '@/supabase/supabase-client';
import { Tables } from '@/types/supabase/supabase-type';

export type HotelsType = Tables<'hotels'>;
export type RoomsType = Tables<'rooms'>;

interface Filters {
  grade?: number; // 호텔 등급
}

export const fetchHotelsAndRooms = async (
  filters: Filters = {}
): Promise<{ hotels: HotelsType[]; rooms: RoomsType[] }> => {
  const supabase = browserSupabase();

  let query = supabase.from('hotels').select('*');

  // 호텔 등급 필터 적용
  if (filters.grade) {
    query = query.eq('stars', filters.grade);
  }

  const { data: hotels, error: hotelsError } = await query;
  if (hotelsError) {
    throw new Error(`Failed to fetch hotels: ${hotelsError.message}`);
  }

  const { data: rooms, error: roomsError } = await supabase.from('rooms').select('*');
  if (roomsError) {
    throw new Error(`Failed to fetch rooms: ${roomsError.message}`);
  }

  return { hotels: hotels || [], rooms: rooms || [] };
};
