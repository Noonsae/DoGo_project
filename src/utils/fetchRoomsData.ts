import { browserSupabase } from '@/supabase/supabase-client';

export const fetchRoomQuery = async (roomId: string) => {
  const supabase = browserSupabase();

  const { data, error } = await supabase

    .from('rooms')
    .select(
      `
      id,
      room_name,
      price,
      hotel_id,
      hotels (id, name)
    `
    ) // 'hotels' 테이블 조인 (hotel_id 기준)
    .eq('id', roomId)
    .single();

  if (error) {
    console.error('객실 정보를 불러오는 중 오류 발생:', error.message);
    return null;
  }

  return data;
};
