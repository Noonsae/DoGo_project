import { serverSupabase } from '@/supabase/supabase-server';

export const GET = async () => {

  const supabase = await serverSupabase();

  const { data, error } = await supabase
    .from('hotels')
    .select('id, main_img_url, name, address, stars, rooms(price)')
    .order('name', { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const hotels = data.map((hotel) => ({
    id: hotel.id,
    main_img_url: hotel.main_img_url || '',
    name: hotel.name,
    address: hotel.address,
    stars: hotel.stars,
    min_price: Math.min(...hotel.rooms.map((room) => room.price))
  }));

  return new Response(JSON.stringify(hotels), { status: 200, headers: { 'Content-Type': 'application/json' } });
};