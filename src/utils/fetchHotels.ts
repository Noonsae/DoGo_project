import { NextApiResponse } from 'next';

import { serverSupabase } from '@/supabase/supabase-server';

const fetchHotels = async (res: NextApiResponse) => {
  const supabase = await serverSupabase();

  const { data, error } = await supabase
    .from('hotels')
    .select('id, name, address, stars, rooms(price)')
    .order('name', { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  // 데이터 변환: rooms에서 최소 가격 계산
  const hotels = data.map((hotel) => ({
    id: hotel.id,
    name: hotel.name,
    address: hotel.address,
    stars: hotel.stars,
    min_price: Math.min(...hotel.rooms.map((room) => room.price))
  }));

  res.status(200).json(hotels);
};

export default fetchHotels;
