import { fetchHotels } from '@/utils/fetchHotels';

export const GET = async () => {
  try {
    const hotels = await fetchHotels(); // 공통 로직 호출
    return new Response(JSON.stringify(hotels), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
