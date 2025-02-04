import { browserSupabase } from '@/supabase/supabase-client';

export const fetchRoomQuery = async (roomId: string) => {
  const supabase = browserSupabase();

  const { data, error } = await supabase

    .from('bookings')
    .select(
      `
      *,
      rooms:room_id (
        room_name,
        hotel_id
      ),
      hotels:rooms.hotel_id (
        name
      )
    `
    )
    .eq('id', roomId)
    .single();

  if (error) {
    console.error('객실 정보를 불러오는 중 오류 발생:', error.message);
    return null;
  }

  return data;
};