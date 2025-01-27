import { browserSupabase } from "@/supabase/supabase-client";

const fetchServices = async (): Promise<string[]> => {

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

    return data.map((service) => service.name.trim());
    
    
  } catch (error) {
    console.error('Unexpected error:', error);

    return [];
  }
};

export default fetchServices;
