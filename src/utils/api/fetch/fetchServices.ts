import { browserSupabase } from "@/supabase/supabase-client";
import { ServicesType } from "@/types/supabase/services-type";

const fetchServices = async (): Promise<ServicesType[]> => {
  const supabase = browserSupabase();

  try {
    const { data, error } = await supabase.from('services').select('*');

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }

    if (!data) {
      console.error('No data received for services.');
      return [];
    }

    return data;

  } catch (error) {
    console.error('Unexpected error:', error);

    return [];
  }
};

export default fetchServices;
