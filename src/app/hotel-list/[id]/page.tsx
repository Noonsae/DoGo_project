'use client';
import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuth';
import { HotelType } from '@/types/supabase/hotel-type';
import HotelRoom from './_components/HotelRoom';
import HotelLocation from './_components/HotelLocation';
import HotelBox from './_components/HotelBox';
import { FacilitiesType } from '@/types/supabase/facilities-type';
import { Json } from '@/types/supabase/supabase-type';
import { UserType } from '@/types/supabase/user-type';
import Navigation from './_components/Navigation';
import HotelOverview from './_components/HotelOverview';
import HotelFacility from './_components/HotelFacility';
import { ServicesType } from '@/types/supabase/services-type';
import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';
import HotelAttraction from './_components/HotelAttraction';
import HotelReviews from './_components/HotelReviews';
import HotelPolicies from './_components/HotelPolicies';
import useHotelReviews from '@/hooks/review/useHotelReviews';
import useHotelRooms from '@/hooks/room/useHotelRooms';

const HotelDetailPage = ({ params }: { params: { id: string } }) => {
  const hotelId = params?.id;

  const [hotelData, setHotelData] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [facilityData, setFacilityData] = useState<FacilitiesType[]>([]);
  const user = useAuthStore((state) => state.user) as UserType | null;
  const [servicesData, setServicesData] = useState<ServicesType[]>([]);
  const { favoriteStatus, toggleFavorite, initializeFavorites } = useFavoriteStore();
  const { reviews, allReviews } = useHotelReviews(hotelId);
  const { roomsData } = useHotelRooms(hotelId);

  useEffect(() => {
    if (user?.id && hotelId) {
      initializeFavorites(user.id); // 사용자가 로그인되어 있으면 즐겨찾기 상태 초기화
    }
  }, [user, hotelId, initializeFavorites]);

  useEffect(() => {
    const fetchHotelData = async () => {
      if (!hotelId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/hotel/${hotelId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch hotel data. Status: ${response.status}`);
        }

        const data = await response.json();
        // 호텔 이미지 URL 배열이 배열 형식이 아닌 경우 빈 배열로 강제
        setHotelData({
          ...data,
          hotel_img_urls: Array.isArray(data.hotel_img_urls) ? data.hotel_img_urls : [], // 배열로 강제 변환
          rooms: data.rooms || []
        });
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setHotelData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  const selectedRoomId = roomsData.length > 0 ? roomsData[0]?.id : null;

  if (!selectedRoomId) {
    return <p>No rooms found for this hotel.</p>;
  }

  console.log('Selected roomId:', selectedRoomId); // 디버깅용 콘솔

  const getValidImageUrl = (imageData: Json): string => {
    if (Array.isArray(imageData) && imageData.length > 0) {
      const firstImage = imageData[0];
      if (typeof firstImage === 'string') {
        return firstImage;
      }
    }
    return '/placeholder.png';
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(id);
  };

  if (loading) {
    return <p className="text-center mt-10">로딩 중...</p>;
  }

  if (!hotelData) {
    return <p className="text-center mt-10">호텔 정보를 불러올 수 없습니다.</p>;
  }

  const roomOption = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0.875C4.51992 0.875 0.875 4.51992 0.875 9C0.875 13.4801 4.51992 17.125 9 17.125C13.4801 17.125 17.125 13.4801 17.125 9C17.125 4.51992 13.4801 0.875 9 0.875ZM13.2285 6.27695L7.97852 12.527C7.92093 12.5955 7.84927 12.651 7.76839 12.6894C7.68752 12.7279 7.59932 12.7486 7.50977 12.75H7.49922C7.41162 12.75 7.325 12.7315 7.24499 12.6959C7.16497 12.6602 7.09335 12.6081 7.03477 12.543L4.78477 10.043C4.72762 9.98236 4.68317 9.91094 4.65403 9.83291C4.62488 9.75488 4.61162 9.67181 4.61504 9.58858C4.61846 9.50536 4.63848 9.42365 4.67392 9.34827C4.70936 9.27289 4.75952 9.20536 4.82143 9.14964C4.88335 9.09392 4.95578 9.05114 5.03447 9.02381C5.11315 8.99648 5.19651 8.98516 5.27963 8.99051C5.36276 8.99585 5.44398 9.01776 5.51851 9.05495C5.59305 9.09213 5.6594 9.14384 5.71367 9.20703L7.48281 11.1727L12.2715 5.47305C12.3789 5.34886 12.5309 5.27193 12.6945 5.25889C12.8582 5.24584 13.0205 5.29774 13.1462 5.40335C13.2719 5.50896 13.351 5.6598 13.3664 5.82327C13.3818 5.98675 13.3323 6.14971 13.2285 6.27695Z"
        fill="#A0A0A0"
      />
    </svg>
  );

  return (
    <div className=" min-h-screen">
      <div className="h-[60px]"></div>

      {/* 네비게이션 탭 */}
      <Navigation activeTab={activeTab} scrollToSection={scrollToSection} />

      {/* 콘텐츠 영역 */}
      <div className="mx-[360px] py-6 space-y-16">
        {/* 개요 섹션 */}
        <HotelOverview
          hotelData={hotelData}
          toggleFavorite={toggleFavorite}
          hotelId={hotelId}
          favoriteStatus={favoriteStatus}
        />
        <HotelBox
          facilityData={facilityData}
          roomOption={roomOption}
          hotelData={hotelData}
          reviews={reviews}
          allReviews={allReviews}
        />

        {/* 객실 섹션 */}
        <HotelRoom
          roomsData={roomsData}
          getValidImageUrl={getValidImageUrl}
          roomOption={roomOption}
          hotelData={hotelData}
        />

        {/* 이용 후기 섹션 */}
        <HotelReviews loading={loading} reviews={reviews} allReviews={allReviews} />

        {/* 시설/서비스 섹션 */}
        <HotelFacility
          facilityData={facilityData}
          roomOption={roomOption}
          setFacilityData={setFacilityData}
          hotelId={hotelId}
          setServicesData={setServicesData}
          serviceData={servicesData}
        />

        {/* 숙소 정책 섹션 */}
        <HotelPolicies hotelId={hotelId} />

        {/* 위치 섹션 */}
        <HotelLocation id={hotelId} />

        {/* 호텔 주변 명소 섹션 */}
        <HotelAttraction />
      </div>
    </div>
  );
};

export default HotelDetailPage;
