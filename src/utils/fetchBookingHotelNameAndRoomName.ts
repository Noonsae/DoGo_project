import { browserSupabase } from "@/supabase/supabase-client";


const fetchBookingHotelNameAndRoomName = async (hotelId: string, roomId: string) => {

  const supabase = browserSupabase();

  try {
    // Fetch hotel name
    const { data: hotelData, error: hotelError } = await supabase
      .from('hotels')
      .select('name')
      .eq('id', hotelId)
      .single();

    if (hotelError) throw hotelError;

    // Fetch room name
    const { data: roomData, error: roomError } = await supabase.from('rooms').select('room_name').eq('id', roomId).single();

    if (roomError) throw roomError;

    return { hotelName: hotelData.name, roomName: roomData.room_name };
  } catch (error) {
    console.error('Error fetching hotel or room names:', error);
    throw error;
  }
};

export default fetchBookingHotelNameAndRoomName;