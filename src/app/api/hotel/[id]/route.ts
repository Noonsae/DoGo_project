import { serverSupabase } from '@/supabase/supabase-server';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing hotel ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = await serverSupabase();

  // Supabase 쿼리 실행
  const { data, error } = await supabase
    .from('hotels')
    .select(
      `
      *,
      rooms(*),
      hotel_facility(*),
      hotel_service(*)
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error('Supabase Query Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
