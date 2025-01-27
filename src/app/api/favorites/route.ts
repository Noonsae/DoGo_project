import { serverSupabase } from '@/supabase/supabase-server';
import { NextResponse } from 'next/server';

// POST 요청: 즐겨찾기 추가, 제거, 상태 조회
export async function POST(req: Request) {
  try {
    const { action, userId, hotelId } = await req.json();
    const supabase = await serverSupabase();

    if (!action || !userId || !hotelId) {
      return NextResponse.json({ error: '필수 값이 누락되었습니다. (action, userId, hotelId 필요)' }, { status: 400 });
    }

    if (action === 'status') {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .eq('hotel_id', hotelId);

      if (error) {
        return NextResponse.json({ error: error.message || '즐겨찾기 조회 중 오류 발생' }, { status: 500 });
      }

      const isFavorite = data?.length > 0;
      return NextResponse.json({ isFavorite });
    }

    if (action === 'add') {
      const { data: existingData, error: existingError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .eq('hotel_id', hotelId);

      if (existingError) {
        return NextResponse.json({ error: existingError.message || '즐겨찾기 조회 중 오류 발생' }, { status: 500 });
      }

      if (existingData && existingData.length > 0) {
        return NextResponse.json({
          success: true,
          message: '이미 즐겨찾기에 등록되어 있습니다.'
        });
      }

      const { error } = await supabase.from('favorites').insert([
        {
          user_id: userId,
          hotel_id: hotelId
        }
      ]);

      if (error) {
        return NextResponse.json({ error: error.message || '즐겨찾기 추가 중 오류 발생' }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: '즐겨찾기에 추가되었습니다.' });
    }

    if (action === 'remove') {
      const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('hotel_id', hotelId);

      if (error) {
        return NextResponse.json({ error: error.message || '즐겨찾기 삭제 중 오류 발생' }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: '즐겨찾기에서 제거되었습니다.' });
    }

    return NextResponse.json({ error: 'Invalid action (status, add 또는 remove를 사용하세요)' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || '알 수 없는 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}

// GET 요청: 즐겨찾기 목록 조회
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId가 필요합니다.' }, { status: 400 });
    }

    const supabase = await serverSupabase();
    const { data, error } = await supabase
      .from('favorites')
      .select('hotel_id, is_favorite') // 필요한 필드만 선택
      .eq('user_id', userId);

    if (error) {
      return NextResponse.json({ error: error.message || '즐겨찾기 데이터를 가져오는 중 오류 발생' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || '알 수 없는 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}
