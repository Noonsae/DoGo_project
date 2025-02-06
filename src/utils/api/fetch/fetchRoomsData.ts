import { browserSupabase } from '@/supabase/supabase-client';

export const fetchRoomQuery = async (roomId: string) => {
  const supabase = browserSupabase();

  const { data, error } = await supabase

    .from('rooms')
    .select(
      `
      id,
      room_name,
      room_img_url,
      price,
      hotel_id,
      hotels (id, name, check_in, check_out)
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