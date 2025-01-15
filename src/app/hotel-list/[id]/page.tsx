'use client';
import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuth';
import Image from 'next/image';
import useFavoriteStore from '@/store/favorite/useFavoriteStore';
import { HotelType } from '@/types/supabase/hotel-type';
import { RoomType } from '@/types/supabase/room-type';
import Modal from './_components/Modal';
import useFormatCurrency from '@/hooks/formatCurrency/useFormatCurrency';
import { FacilitiesType } from '@/types/supabase/facilities-type';
import HotelPolicies from './_components/HotelPolicies';
import HotelLocation from './_components/HotelLocation';
import HotelReviews from './_components/HotelReviews';
import HotelRoom from './_components/HotelRoom';
import HotelBox from './_components/HotelBox';
import { Json } from '@/types/supabase/supabase-type';

const HotelDetailPage = ({ params }: { params: { id: string } }) => {
  const hotelId = params?.id;

  const [hotelData, setHotelData] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [roomsData, setRoomsData] = useState<RoomType[]>([]);
  const [facilityData, setFacilityData] = useState<FacilitiesType[]>([]);
  const loadUserFromCookie = useAuthStore((state) => state.loadUserFromCookie);
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { favoriteStatus, toggleFavorite, initializeFavorites } = useFavoriteStore();
  const formatKoreanCurrency = useFormatCurrency();

  useEffect(() => {
    loadUserFromCookie();
  }, [loadUserFromCookie]);

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

  useEffect(() => {
    const fetchRoomsData = async () => {
      if (!hotelId) return;

      try {
        const response = await fetch(`/api/rooms?hotelId=${hotelId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rooms data');
        }
        const data = await response.json();
        const sortedData = data.sort((a: RoomType, b: RoomType) => a.price - b.price);
        setRoomsData(sortedData);
      } catch (error) {
        console.error('Error fetching rooms data:', error);
      }
    };

    fetchRoomsData();
  }, [hotelId]);

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const response = await fetch(`/api/hotel-facility?hotel_id=${hotelId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch facilities. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Facility Data:', data); // 여기서 데이터를 확인하세요.
        setFacilityData(data); // 상태에 데이터 저장
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };

    if (hotelId) {
      fetchFacilityData();
    }
  }, [hotelId]);

  const getValidImageUrl = (imageData: Json): string => {
    if (Array.isArray(imageData) && imageData.length > 0) {
      const firstImage = imageData[0];
      if (typeof firstImage === 'string') {
        return firstImage;
      }
    }
    return '/placeholder.png';
  };

  const openModal = (image: string) => {
    console.log('openModal 호출됨, 이미지:', image); // 이미지 URL 출력
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
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
    <div className="bg-gray-100 min-h-screen">
      <div className="h-[60px]"></div>
      {/* 네비게이션 탭 */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="mx-[360px]">
          <ul className="flex  space-x-6 py-4">
            {[
              { id: 'overview', label: '개요' },
              { id: 'rooms', label: '객실 선택' },
              { id: 'reviews', label: '이용 후기' },
              { id: 'services', label: '시설/서비스' },
              { id: 'policies', label: '숙소 정책' },
              { id: 'location', label: '위치' },
              { id: 'nearby', label: '호텔 주변 명소' }
            ].map((tab) => (
              <li key={tab.id}>
                <a
                  href={`#${tab.id}`}
                  className={`cursor-pointer pb-2 ${
                    activeTab === tab.id ? 'border-b-2 border-[#A0522D] text-[#8B4513] font-semibold' : 'text-gray-800'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(tab.id);
                  }}
                >
                  {tab.label}
                </a>
              </li>
            ))}
            <button className="flex ml-auto">문의하기</button>
          </ul>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mx-[360px] py-6 space-y-16">
        {/* 개요 섹션 */}
        <section id="overview" className="scroll-mt-20">
          <div className="flex gap-4">
            <div className="rounded-lg shadow-md overflow-hidden relative">
              <Image
                src={hotelData.main_img_url || '/placeholder.png'}
                alt={hotelData.name || 'Default Image'}
                width={594}
                height={363}
                className="object-cover block rounded-md"
                onClick={() => openModal(hotelData.main_img_url)}
              />
              <button
                onClick={() => {
                  toggleFavorite(hotelId); // 즐겨찾기 버튼 클릭 시 상태 토글
                }}
                className="absolute top-4 right-4 p-2 rounded-full shadow-md bg-white text-gray-600"
              >
                {favoriteStatus[hotelId] ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 w-[594px] h-[363px]">
              {/* hotel_img_urls가 배열일 때만 slice를 사용 */}
              {Array.isArray(hotelData.hotel_img_urls) &&
                hotelData.hotel_img_urls.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-200 rounded-lg shadow-md overflow-hidden"
                    style={{ width: '291px', height: '190px' }}
                    onClick={() => openModal(image as string)}
                  >
                    <Image
                      src={image as string}
                      alt={`Image ${index + 1}`}
                      width={291}
                      height={180}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-2">{hotelData.name}</h2>
            <div className="flex items-center">
              {/* 별 개수를 렌더링 */}
              {Array.from({ length: hotelData.stars }, (_, index) => (
                <svg
                  key={index}
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3907 17.7501C15.2591 17.7506 15.1308 17.7096 15.0239 17.6329L10.0001 13.9907L4.97624 17.6329C4.86891 17.7108 4.7396 17.7525 4.60701 17.752C4.47442 17.7515 4.34542 17.7089 4.23866 17.6302C4.1319 17.5516 4.05291 17.4411 4.01311 17.3146C3.97331 17.1881 3.97476 17.0523 4.01725 16.9267L5.97663 11.1232L0.898504 7.64073C0.788508 7.56539 0.70549 7.45684 0.661579 7.33095C0.617668 7.20506 0.615165 7.06843 0.654436 6.94102C0.693707 6.8136 0.772694 6.70209 0.879856 6.62276C0.987018 6.54344 1.11674 6.50046 1.25007 6.50011H7.51491L9.40554 0.681749C9.44626 0.556132 9.52573 0.446644 9.63254 0.368991C9.73935 0.291338 9.86801 0.249512 10.0001 0.249512C10.1321 0.249512 10.2608 0.291338 10.3676 0.368991C10.4744 0.446644 10.5539 0.556132 10.5946 0.681749L12.4852 6.50206H18.7501C18.8836 6.502 19.0136 6.54467 19.121 6.62385C19.2285 6.70302 19.3078 6.81453 19.3474 6.94204C19.3869 7.06955 19.3845 7.20636 19.3407 7.33244C19.2968 7.45852 19.2137 7.56724 19.1036 7.64269L14.0235 11.1232L15.9817 16.9251C16.0134 17.019 16.0224 17.1192 16.0077 17.2172C15.9931 17.3153 15.9554 17.4085 15.8976 17.4891C15.8399 17.5697 15.7638 17.6354 15.6757 17.6808C15.5875 17.7262 15.4898 17.7499 15.3907 17.7501Z"
                    fill="#EEC18D"
                  />
                </svg>
              ))}
            </div>
          </div>
          <p className="mb-6">{hotelData.description}</p>
          <HotelBox roomOption={roomOption} facilityData={facilityData} />
        </section>

        {/* 객실 섹션 */}
        <HotelRoom
          roomsData={roomsData}
          getValidImageUrl={getValidImageUrl}
          roomOption={roomOption}
          formatKoreanCurrency={formatKoreanCurrency}
        />

        {/* 이용 후기 섹션 */}
        <HotelReviews />

        {/* 시설/서비스 섹션 */}
        <section id="services" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">시설/서비스</h2>
          <div>
            <h3 className="text-lg font-semibold mb-4">공용 시설</h3>
            {/* 시설 데이터가 있을 경우에만 표시 */}
            {facilityData && facilityData.length > 0 && (
              <div className="grid grid-cols-4 gap-y-4 gap-x-6">
                {facilityData.map((facility, index) => {
                  return (
                    <div key={facility.id} className="flex items-center gap-2 text-gray-700">
                      {roomOption}
                      {/* facility 객체의 name 속성을 출력 */}
                      <span className="text-sm">{facility.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold mt-8">서비스 시설</h2>
        </section>

        {/* 숙소 정책 섹션 */}
        <HotelPolicies />

        {/* 위치 섹션 */}
        <HotelLocation id={hotelId} />

        {/* 호텔 주변 명소 섹션 */}
        <section id="nearby" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">호텔 주변 명소</h2>
          <p>이곳은 호텔 주변 명소를 보여주는 콘텐츠 영역입니다.</p>
        </section>
      </div>
    </div>
  );
};

export default HotelDetailPage;
