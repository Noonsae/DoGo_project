import { NextResponse } from 'next/server';
import { serverSupabase } from '@/supabase/supabase-server';

export async function POST(req: Request) {
  try {
    const { action, userId, hotelId } = await req.json(); // JSON 데이터 파싱
    const supabase = await serverSupabase();

    if (!action || !userId || !hotelId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (action === 'check') {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('hotel_id', hotelId);

      if (error) throw error;

      return NextResponse.json({ isFavorite: data.length > 0 });
    }

    if (action === 'add') {
      const { error } = await supabase.from('favorites').insert([{ user_id: userId, hotel_id: hotelId }]);
      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    if (action === 'remove') {
      const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('hotel_id', hotelId);
      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    // Invalid action 처리
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
