import { serverSupabase } from '@/supabase/supabase-server';

export const GET = async (req: Request) => {
  try {
    const supabase = await serverSupabase();
    const url = new URL(req.url);

    const gradeRaw = url.searchParams.get('grade');
    const grade = gradeRaw ? JSON.parse(gradeRaw) : [];
    const facilitiesRaw = url.searchParams.get('facilities');
    const facilities = facilitiesRaw ? JSON.parse(facilitiesRaw) : [];
    const servicesRaw = url.searchParams.get('services');
    const services = servicesRaw ? JSON.parse(servicesRaw) : [];

    let query = supabase.from('hotels').select('*, rooms(price)').order('name', { ascending: true });

    if (grade.length > 0) {
      query = query.in('stars', grade);
    }

    if (facilities.length > 0) {
      query = query.contains('facilities', facilities);
    }

    if (services.length > 0) {
      query = query.contains('services', services);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase Query Error:', error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hotels = data.map((hotel) => ({
      id: hotel.id,
      main_img_url: hotel.main_img_url || '',
      name: hotel.name,
      address: hotel.location || '',
      stars: hotel.stars,
      min_price: hotel.rooms?.length
        ? Math.min(...hotel.rooms.map((room) => room.price))
        : null,
    }));

    return new Response(JSON.stringify(hotels), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Server Error:', err.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
