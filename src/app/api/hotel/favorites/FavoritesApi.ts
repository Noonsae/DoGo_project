import { browserSupabase } from '@/supabase/supabase-client';

const supabase = browserSupabase();

/**
 * 특정 사용자의 찜 여부 확인
 */
export const checkFavoriteStatus = async (userId, hotelId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('id') // 필요한 데이터만 선택
    .eq('user_id', userId)
    .eq('hotel_id', hotelId);

  if (error) throw new Error('Failed to check favorite status');

  return (data?.length ?? 0) > 0;
};

/**
 * 찜 추가
 */
export const addFavorite = async (userId, hotelId) => {
  const { error } = await supabase.from('favorites').insert([{ user_id: userId, hotel_id: hotelId }]);

  if (error) throw new Error('Failed to add favorite');
};

/**
 * 찜 삭제
 */
export const removeFavorite = async (userId, hotelId) => {
  const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('hotel_id', hotelId);

  if (error) throw new Error('Failed to remove favorite');
};
