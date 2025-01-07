import { browserSupabase } from '@/supabase/supabase-client';
import { Tables } from '@/types/supabase/supabase-type';

export type HotelsType = Tables<'hotels'>;

export const fetchHotels = async () => {
  const supabase = browserSupabase();
  const { data, error } = await supabase.from('hotels').select('*');

  if (error) {
    throw new Error(error.message);
  }
  console.log('Fetched hotels:', data);
  return data || [];
};
