import { browserSupabase } from '@/supabase/supabase-client';
import { HotelsDatabase } from '@/types/supabase/supabase-type';

type Hotel = HotelsDatabase['public']['Tables']['hotels']['Row'];

export const fetchHotels = async (): Promise<Hotel[]> => {
  const supabase = browserSupabase();
  const { data, error } = await supabase.from('hotels').select('*');

  if (error) {
    throw new Error(error.message);
  }
  console.log('Fetched hotels:', data);
  return data || [];
};
