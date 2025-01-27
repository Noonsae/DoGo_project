//유저 찜 목록 페이지
'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 즐겨찾기 데이터를 나타내는 타입 정의
interface Favorite {
  id: string; // 즐겨찾기 ID
  hotel_id: string; // 호텔 ID
  is_favorite: boolean; // 즐겨찾기 여부
  hotel_details: {
    name: string; // 호텔 이름
    address: string; // 호텔 주소
    main_img_url: string | null; // 호텔 메인 이미지 URL
    stars: number; // 호텔 평점
  };
}

const UserFavoritePage: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]); // 즐겨찾기 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    // 즐겨찾기 데이터 가져오기
    const fetchFavorites = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
          error: authError,
        } = await browserSupabase().auth.getUser();

        if (authError || !user) {
          throw new Error('로그인 정보가 없습니다.');
        }

        // Supabase에서 즐겨찾기 데이터와 호텔 데이터를 조인하여 가져옴
        const { data, error } = await browserSupabase()
          .from('favorites')
          .select(`
            id,
            hotel_id,
            is_favorite,
            hotels (
              name,
              address,
              main_img_url,
              stars
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        // 데이터 변환
        const formattedData: Favorite[] =
          data?.map((favorite: any) => ({
            id: favorite.id,
            hotel_id: favorite.hotel_id,
            is_favorite: favorite.is_favorite,
            hotel_details: {
              name: favorite.hotels?.name || 'N/A',
              address: favorite.hotels?.address || 'N/A',
              main_img_url: favorite.hotels?.main_img_url || null,
              stars: favorite.hotels?.stars || 0,
            },
          })) || [];

        setFavorites(formattedData);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('즐겨찾기 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (favorites.length === 0) return <p className="text-center text-gray-500">즐겨찾기한 호텔이 없습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">내 즐겨찾기</h1>
      <ul className="space-y-4">
        {favorites.map((favorite) => (
          <li key={favorite.id} className="p-4 border rounded shadow">
            <div className="flex items-center space-x-4">
              {/* 호텔 이미지 */}
              {favorite.hotel_details.main_img_url && (
                <img
                  src={favorite.hotel_details.main_img_url}
                  alt={favorite.hotel_details.name}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{favorite.hotel_details.name}</h3>
                <p className="text-sm text-gray-600">{favorite.hotel_details.address}</p>
                <p className="text-sm text-yellow-500">
                  평점: {favorite.hotel_details.stars} / 5
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFavoritePage;
