import { browserSupabase } from "@/supabase/supabase-client";
import { FacilitiesType } from "@/types/supabase/facilities-type";

const fetchFacilities = async (): Promise<FacilitiesType[]> => {
  const supabase = browserSupabase();

  try {
    const { data, error } = await supabase.from('facilities').select('*');

    if (error) {
      console.error('Error fetching facilities:', error);
      return [];
    }

    if (!data) {
      console.error('No data received for facilities.');
      return [];
    }

  return data
    
  } catch (error) {
    console.error('Unexpected error:', error);

    return [];
  }
};

export default fetchFacilities;
