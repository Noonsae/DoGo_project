import { serverSupabase } from '@/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(req.url);
    const hotelId = searchParams.get('hotel_id'); // hotel_id를 쿼리 파라미터로 받음

    if (!hotelId) {
      return NextResponse.json({ error: 'hotel_id가 필요합니다.' }, { status: 400 });
    }

    // Supabase 클라이언트 초기화
    const supabase = await serverSupabase();

    // policies 테이블에서 hotel_id에 해당하는 데이터 가져오기
    const { data, error } = await supabase
      .from('policies') // 테이블 이름
      .select('*') // 모든 필드 선택
      .eq('hotel_id', hotelId); // hotel_id로 필터링

    // 쿼리 에러 처리
    if (error) {
      console.error('Error fetching policies:', error);
      return NextResponse.json({ error: error.message || '정책 데이터를 가져오는 중 오류 발생' }, { status: 500 });
    }

    // 데이터가 없는 경우
    if (!data || data.length === 0) {
      return NextResponse.json({ message: '해당 호텔의 정책 정보가 없습니다.' }, { status: 404 });
    }

    // description 필드를 JSON 배열로 파싱
    const parsedData = data.map((policy) => ({
      ...policy,
      description: policy.description
        ? JSON.parse(policy.description.replace(/'/g, '"')) // JSON 문자열을 배열로 변환
        : [] // description이 없는 경우 빈 배열로 설정
    }));

    // 성공적으로 데이터 반환
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Unhandled error:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || '알 수 없는 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}
