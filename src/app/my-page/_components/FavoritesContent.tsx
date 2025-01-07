// import React, { useState, useEffect } from 'react';
// import { browserSupabase } from '@/supabase/supabase-client';

// interface FavoritesContentProps {
//   userId: string;
// }

// const FavoritesContent: React.FC<FavoritesContentProps> = ({ userId }) => {
//   const [favorites, setFavorites] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const supabase = browserSupabase();

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const { data, error } = await supabase
//         .from('favorites')
//         .select(`
//           id,
//           rooms (
//             name,
//             price,
//             room_img_url
//           )
//         `)
//         .eq('user_id', userId);

//       if (error) console.error(error);
//       setFavorites(data || []);
//       setLoading(false);
//     };

//     fetchFavorites();
//   }, [userId]);

//   if (loading) return <p>Loading...</p>;
//   if (!favorites.length) return <p>찜한 목록이 없습니다.</p>;

//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-4">찜 목록</h2>
//       <ul className="space-y-4">
//         {favorites.map((favorite) => (
//           <li key={favorite.id} className="p-4 border rounded shadow">
//             <h3 className="font-bold">{favorite.rooms.name}</h3>
//             <p className="text-right font-bold">{favorite.rooms.price}원/박</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FavoritesContent;
