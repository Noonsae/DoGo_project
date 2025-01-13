'use client';
import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// Favorite 데이터 타입 정의
interface Favorite {
  id: string; // Favorites 테이블의 ID
  rooms: {
    room_name: string; // 객실 이름
    price: number; // 객실 1박 가격
    room_img_url: string | null; // 객실 이미지 URL (없을 수 있음)
  };
}

// Props 타입 정의
interface FavoritesContentProps {
  userId: string; // 사용자 ID
}

const FavoritesContent: React.FC<FavoritesContentProps> = ({ userId }) => {
  // 찜 목록 상태 관리
  const [favorites, setFavorites] = useState<Favorite[]>([]); // 찜한 객실 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태

  // 데이터 가져오는 함수
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Supabase에서 favorites와 rooms 테이블 간의 관계 데이터를 가져옴
        const { data, error } = await browserSupabase()
          .from('favorites') // 'favorites' 테이블 선택
          .select(`
            id,
            rooms (
              room_name,
              price,
              room_img_url
            )
          `) // 'rooms' 테이블의 관련 필드를 포함
          .eq('user_id', userId); // 사용자 ID로 필터링

        if (error) throw error; // 오류가 발생하면 예외 발생

        // 데이터를 타입스크립트 타입에 맞게 변환
        const formattedData = data?.map((favorite: any) => ({
          ...favorite,
          rooms: {
            ...favorite.rooms,
            room_img_url: favorite.rooms.room_img_url
              ? JSON.parse(favorite.rooms.room_img_url) // JSON 데이터를 파싱
              : null, // 데이터가 없으면 null 처리
          },
        }));

        // 변환된 데이터를 상태로 설정
        setFavorites(formattedData || []);
      } catch (err) {
        console.error('Error fetching favorites:', err); // 오류 출력
        setError('찜 목록을 불러오는 중 오류가 발생했습니다.'); // 사용자에게 오류 메시지 표시
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchFavorites(); // 데이터 가져오기 함수 호출
  }, [userId]); // userId가 변경될 때마다 실행

  // 로딩 상태일 때 UI
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 오류 발생 시 UI
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 찜 목록이 비어 있을 때 UI
  if (!favorites.length)
    return <p className="text-center text-gray-600">찜한 목록이 없습니다.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">찜 목록</h2>
      {/* 찜 목록 데이터 렌더링 */}
      <ul className="space-y-4">
        {favorites.map((favorite) => (
          <li key={favorite.id} className="p-4 border rounded shadow">
            {/* 객실 이름 표시 */}
            <h3 className="font-bold">{favorite.rooms.room_name}</h3>
            {/* 객실 가격 표시 */}
            <p className="text-right font-bold">
              {favorite.rooms.price.toLocaleString()}원/박
            </p>
            {/* 객실 이미지가 존재할 경우 이미지 렌더링 */}
            {favorite.rooms.room_img_url && (
              <img
                src={favorite.rooms.room_img_url}
                alt={favorite.rooms.room_name}
                className="w-full h-32 object-cover rounded mt-2"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesContent;
