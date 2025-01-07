//사용자용 마이페이지
"use client"

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import UserSidebar from '@/app/my-page/_components/usersidebar';
// import ProfileContent from '../_components/ProfileContent';
import BookingsContent from '../_components/BookingsContent';
//import FavoritesContent from '../_components/FavoritesContent';
import ReviewsContent from '../_components/ReviewsContent';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UserPage() {
  const [currentTab, setCurrentTab] = useState('profile'); // 'profile', 'bookings', 'favorites', 'reviews'
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .single();

      if (error) console.error(error);
      else setUserData(data);
    };

    fetchUserData();
  }, []);

  const renderContent = () => {
    switch (currentTab) {
    //   case 'profile':
    //     return <ProfileContent userId={userData} />;
      case 'bookings':
        return <BookingsContent userId={userData?.id} />;
    //   case 'favorites':
    //     return <FavoritesContent userId={userData?.id} />;
      case 'reviews':
        return <ReviewsContent userId={userData?.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <UserSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}
