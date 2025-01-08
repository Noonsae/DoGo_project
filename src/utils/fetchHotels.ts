import { serverSupabase } from '@/supabase/supabase-server';

export const fetchHotels = async () => {
  const supabase = await serverSupabase();

  const { data, error } = await supabase
    .from('hotels')
    .select('id, main_img_url, name, address, stars, rooms(price)')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message); // API Route에서 오류를 처리할 수 있도록 에러를 던짐
  }

  // 데이터 변환: rooms에서 최소 가격 계산
  const hotels = data.map((hotel) => ({
    id: hotel.id,
    main_img_url: hotel.main_img_url || '',
    name: hotel.name,
    address: hotel.address,
    stars: hotel.stars,
    min_price: Math.min(...hotel.rooms.map((room) => room.price))
  }));

  return hotels;
};
