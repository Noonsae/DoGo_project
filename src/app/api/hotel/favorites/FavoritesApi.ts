import { browserSupabase } from '@/supabase/supabase-client';

const supabase = browserSupabase();

export const checkFavoriteStatus = async (userId, hotelId) => {
  if (!userId || !hotelId) {
    console.error('Invalid input for checkFavoriteStatus:', { userId, hotelId });
    throw new Error('Invalid input: userId or hotelId is missing');
  }

  const { data, error } = await supabase.from('favorites').select('id').eq('user_id', userId).eq('hotel_id', hotelId);

  if (error) {
    console.error('Supabase select error:', error.message);
    throw new Error('Failed to check favorite status');
  }

  return (data?.length ?? 0) > 0;
};

export const addFavorite = async (userId, hotelId) => {
  if (!userId || !hotelId) {
    console.error('Invalid input for addFavorite:', { userId, hotelId });
    throw new Error('Invalid input: userId or hotelId is missing');
  }

  const isAlreadyFavorite = await checkFavoriteStatus(userId, hotelId);
  if (isAlreadyFavorite) {
    console.log('Favorite already exists for:', { userId, hotelId });
    return;
  }

  const { error } = await supabase.from('favorites').insert([{ user_id: userId, hotel_id: hotelId }]);

  if (error) {
    console.error('Supabase insert error:', error.message);
    throw new Error('Failed to add favorite');
  }
};

export const removeFavorite = async (userId, hotelId) => {
  if (!userId || !hotelId) {
    console.error('Invalid input for removeFavorite:', { userId, hotelId });
    throw new Error('Invalid input: userId or hotelId is missing');
  }

  const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('hotel_id', hotelId);

  if (error) {
    console.error('Supabase delete error:', error.message);
    throw new Error('Failed to remove favorite');
  }
};
