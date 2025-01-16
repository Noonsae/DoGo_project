import { serverSupabase } from '@/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const hotelId = searchParams.get('hotelId'); // hotel_id 가져오기

  if (!hotelId) {
    return NextResponse.json({ error: 'hotelId is required' }, { status: 400 });
  }

  const supabase = await serverSupabase();

  try {
    // 1. 호텔의 모든 객실(room_id) 가져오기
    const { data: rooms, error: roomsError } = await supabase
      .from('rooms')
      .select('id, room_type') // room_id, room_type 가져오기
      .eq('hotel_id', hotelId);

    if (roomsError) {
      throw new Error(roomsError.message);
    }

    const roomIds = rooms.map((room: { id: string }) => room.id); // 객실 ID 리스트 생성

    if (roomIds.length === 0) {
      return NextResponse.json([], { status: 200 }); // 객실이 없는 경우 빈 배열 반환
    }

    // 2. 객실(room_id)에 해당하는 리뷰 가져오기
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select(`*, users(nickname, profile_img), rooms(room_type)`) // reviews 데이터와 유저, 객실 데이터 가져오기
      .in('room_id', roomIds); // room_id 리스트로 필터링

    if (reviewsError) {
      throw new Error(reviewsError.message);
    }

    // 3. 리뷰 데이터에 유저 정보와 객실 정보를 추가하기
    const reviewsWithDetails = reviews.map((review: any) => {
      const user = review.users; // 이미 users 테이블에서 데이터를 가져왔으므로 여기서 바로 사용
      const room = review.rooms; // rooms 테이블에서 room_type 가져왔으므로 바로 사용

      return {
        ...review,
        nickname: user?.nickname,
        profile_img: user?.profile_img,
        room_type: room?.room_type
      };
    });

    return NextResponse.json(reviewsWithDetails, { status: 200 }); // 리뷰 데이터 반환
  } catch (err) {
    console.error('Error fetching hotel reviews:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
