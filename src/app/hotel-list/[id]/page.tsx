'use client';

import React, { useEffect, useState } from 'react';

import useAuthStore from '@/store/useAuth';
import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';

import useHotelReviews from '@/hooks/review/useHotelReviews';
import useHotelRooms from '@/hooks/room/useHotelRooms';
import useHotelDetail from '@/hooks/hotel/useHotelDetail';
import useFacilities from '@/hooks/hotel/useFacilities';
import useServices from '@/hooks/hotel/useServices';

import { Json } from '@/types/supabase/supabase-type';
import { UserType } from '@/types/supabase/user-type';

import ScrollSearchBox from '@/components/ui/search/ScrollSearchBox';
import Navigation from './_components/Navigation';
import HotelOverview from './_components/HotelOverview';
import HotelBox from './_components/HotelBox';
import HotelRoom from './_components/HotelRoom';
import HotelReviews from './_components/HotelReviews';
import HotelFacility from './_components/HotelFacility';
import HotelPolicies from './_components/HotelPolicies';
import HotelLocation from './_components/HotelLocation';
import HotelAttraction from './_components/HotelAttraction';

import NavigationSkeleton from '../../../components/ui/skeleton/HotelNavigationSkeleton';
import HotelOverviewSkeleton from '@/components/ui/skeleton/HotelOverviewSkeleton';
import HotelBoxSkeleton from '@/components/ui/skeleton/HotelBoxSkeleton';

const HotelDetailPage = ({ params }: { params: { id: string } }) => {
  const hotelId = params?.id; // URL 파라미터에서 호텔 ID 추출

  const [activeTab, setActiveTab] = useState('overview'); // 활성화된 네비게이션 탭 상태
  const [tab, setTab] = useState<'date' | 'flexible'>('date'); // 검색창 기간선택 관련 탭 상태
  const user = useAuthStore((state) => state.user) as UserType | null; // 사용자 정보 가져오기
  const { favoriteStatus, toggleFavorite, initializeFavorites } = useFavoriteStore(); // 즐겨찾기 관련 상태와 함수 가져오기
  const { reviews, allReviews } = useHotelReviews(hotelId); // 리뷰 데이터 가져오기
  const { roomsData } = useHotelRooms(hotelId); // 객실 데이터 가져오기

  // 사용자 로그인 상태에 따라 즐겨찾기 초기화
  useEffect(() => {
    if (user?.id && hotelId) {
      initializeFavorites(user.id);
    }
  }, [user, hotelId, initializeFavorites]);

  const { hotelData, loading } = useHotelDetail(hotelId); // 호텔 상세 데이터 가져오기
  const { data: facilityData } = useFacilities();
  const { data: serviceData } = useServices();

  // 이미지 URL 검증 함수
  const getValidImageUrl = (imageData: Json): string => {
    if (Array.isArray(imageData) && imageData.length > 0) {
      const firstImage = imageData[0];
      if (typeof firstImage === 'string') {
        return firstImage;
      }
    }
    return '/placeholder.webp';
  };

  // 특정 섹션으로 스크롤 이동 함수
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤 이동
    setActiveTab(id); // 활성화된 탭 업데이트
  };

  // 로딩 중 처리
  if (loading) {
    return (
      <div className="w-full max-w-[1200px] px-[350px] sm:px-[300px] md:px-[200px] lg:px-[100px] xl:px-[50px] xl:mx-auto pt-[78px] xl:max-w-[1200px] 2xl:px-0">
        {/* 로딩 중 네비게이션 */}
        <NavigationSkeleton />
        <HotelOverviewSkeleton />
        <HotelBoxSkeleton />
      </div>
    );
  }

  // 호텔 데이터가 없을 때 처리
  if (!hotelData) {
    return <p className="text-center mt-10">호텔 정보를 불러올 수 없습니다.</p>;
  }

  // 객실 옵션 렌더링
  const roomOption = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0.875C4.51992 0.875 0.875 4.51992 0.875 9C0.875 13.4801 4.51992 17.125 9 17.125C13.4801 17.125 17.125 13.4801 17.125 9C17.125 4.51992 13.4801 0.875 9 0.875ZM13.2285 6.27695L7.97852 12.527C7.92093 12.5955 7.84927 12.651 7.76839 12.6894C7.68752 12.7279 7.59932 12.7486 7.50977 12.75H7.49922C7.41162 12.75 7.325 12.7315 7.24499 12.6959C7.16497 12.6602 7.09335 12.6081 7.03477 12.543L4.78477 10.043C4.72762 9.98236 4.68317 9.91094 4.65403 9.83291C4.62488 9.75488 4.61162 9.67181 4.61504 9.58858C4.61846 9.50536 4.63848 9.42365 4.67392 9.34827C4.70936 9.27289 4.75952 9.20536 4.82143 9.14964C4.88335 9.09392 4.95578 9.05114 5.03447 9.02381C5.11315 8.99648 5.19651 8.98516 5.27963 8.99051C5.36276 8.99585 5.44398 9.01776 5.51851 9.05495C5.59305 9.09213 5.6594 9.14384 5.71367 9.20703L7.48281 11.1727L12.2715 5.47305C12.3789 5.34886 12.5309 5.27193 12.6945 5.25889C12.8582 5.24584 13.0205 5.29774 13.1462 5.40335C13.2719 5.50896 13.351 5.6598 13.3664 5.82327C13.3818 5.98675 13.3323 6.14971 13.2285 6.27695Z"
        fill="#A0A0A0"
      />
    </svg>
  );

  return (
    <div className="w-full max-w-[1200px] px-[350px] sm:px-[300px] md:px-[200px] lg:px-[100px] xl:px-[50px] xl:mx-auto pt-[200px] xl:max-w-[1200px] 2xl:px-0">
      {/* AlwaysVisibleSearchBox를 항상 화면 상단에 고정 */}
      <div className="fixed top-0 left-0 w-full z-30 bg-white border-b-0">
        <div className="[&>div]:border-b-0">
          <ScrollSearchBox tab={tab} setTab={setTab} />
        </div>
      </div>
      {/* 나머지 콘텐츠 */}
      <div className="">
        {loading ? (
          <NavigationSkeleton />
        ) : (
          <Navigation activeTab={activeTab} scrollToSection={scrollToSection} setActiveTab={setActiveTab} />
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="py-6 space-y-16">
        {/* 개요 섹션 */}
        {loading ? (
          <HotelOverviewSkeleton />
        ) : (
          <HotelOverview
            hotelData={hotelData}
            toggleFavorite={toggleFavorite}
            hotelId={hotelId}
            favoriteStatus={favoriteStatus}
          />
        )}

        {loading ? (
          <HotelBoxSkeleton />
        ) : (
          <HotelBox
            facilityData={facilityData ?? []}
            roomOption={roomOption}
            hotelData={hotelData}
            reviews={reviews}
            allReviews={allReviews}
          />
        )}
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
          facilityData={facilityData ?? []}
          roomOption={roomOption}
          hotelId={hotelId}
          serviceData={serviceData ?? []}
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
