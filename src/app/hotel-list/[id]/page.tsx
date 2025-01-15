'use client';
import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuth';
import Image from 'next/image';
import useFavoriteStore from '@/store/favorite/useFavoriteStore';
import { HotelType } from '@/types/supabase/hotel-type';
import { RoomType } from '@/types/supabase/room-type';
import Modal from './_components/Modal';

const HotelDetailPage = ({ params }: { params: { id: string } }) => {
  const hotelId = params?.id;

  const [hotelData, setHotelData] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [roomsData, setRoomsData] = useState<RoomType[]>([]);

  const loadUserFromCookie = useAuthStore((state) => state.loadUserFromCookie);
  const user = useAuthStore((state) => state.user);

  const { favoriteStatus, toggleFavorite, initializeFavorites } = useFavoriteStore();


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
    <div className="bg-gray-100 min-h-screen">
      <div className="h-[60px]"></div>

      {/* 네비게이션 탭 */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="mx-[360px]">
          <ul className="flex space-x-6 py-4">
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
          </ul>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mx-[360px] py-6 space-y-16">
        {/* 개요 섹션 */}
        <section id="overview" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">{hotelData.name}</h2>
          <p className="mb-6">{hotelData.description}</p>
          <div className="flex gap-4">
            <div className="rounded-lg shadow-md overflow-hidden relative">
              <Image
                src={hotelData.main_img_url || '/placeholder.png'}
                alt={hotelData.name || 'Default Image'}
                width={594}
                height={363}
                className="object-cover block rounded-md"
               
              />
             
     
              <button
                onClick={() => {
                  toggleFavorite(hotelId); // 즐겨찾기 버튼 클릭 시 상태 토글
                }}
                className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${
                  favoriteStatus[hotelId] ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
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
                    style={{ width: '291px', height: '175.5px' }}
                  >
                    <Image
                      src={image as string}
                      alt={`Image ${index + 1}`}
                      width={291}
                      height={175.5}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* 객실 섹션 */}
        <section id="rooms" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">객실 선택</h2>
          <div className="w-[1200px] h-full">
            <ul className="space-y-6">
              {roomsData.map((room) => (
                <li key={room.id} className="flex items-center bg-[#FAF4EF] p-6 rounded-lg shadow-md">
                  {/* 객실 이미지 */}
                  <div className="w-[280px] h-[280px] bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={getValidImageUrl(room.room_img_url)}
                      alt={room.room_name || 'Default Image'}
                      width={280}
                      height={280}
                      className="object-cover w-[280px] h-[280px]"
                    />
                  </div>

                  {/* 객실 정보 */}
                  <div className="ml-6 flex flex-col w-[824px] bg-white p-6 rounded-lg shadow-lg">
                    {/* 객실 제목 */}
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">{room.room_name}</h2>
                      <Modal>
                        <button className="text-sm text-gray-500 hover:text-gray-800 hover:underline">
                          자세히 보기 &gt;
                        </button>
                      </Modal>
                    </div>

                    {/* 옵션 리스트 */}
                    <p className="grid grid-cols-4 gap-4 mb-4 text-sm">
                      {(Array.isArray(room.option) ? room.option : []).slice(0, 8).map((opt, idx) => (
                        <span key={idx} className="flex items-center gap-2 text-gray-600">
                          {roomOption} {/* SVG 아이콘 */}
                          {String(opt)}
                        </span>
                      ))}
                    </p>

                    {/* 기타 정보 */}
                    <p className="text-sm text-gray-700 mb-2">숙박 가능 인원: 기준 2인 ~ 최대 4인</p>
                    <p className="text-sm text-gray-700 mb-2">체크인: 00:00</p>
                    <p className="text-sm text-gray-700 mb-4">체크아웃: 00:00</p>

                    {/* 가격 */}
                    <p className="text-lg font-bold text-gray-900 mb-4 flex justify-end">₩{room.price} / 1박</p>

                    {/* 예약 버튼 */}
                    <div className="flex justify-end">
                      <button className="w-[124px] h-[44px] bg-[#B3916A] text-white rounded-lg shadow-md hover:bg-[#8B5E3C]">
                        예약하기
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 이용 후기 섹션 */}
        <section id="reviews" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">이용 후기</h2>
          <div className="flex gap-[30px]">
            <p className="w-[585px] h-[368px] bg-slate-400">이곳은 이용 후기를 보여주는 콘텐츠 영역입니다.</p>
            <p className="w-[585px] h-[368px] bg-slate-400">이곳은 이용 후기를 보여주는 콘텐츠 영역입니다.</p>
          </div>
          <div className="flex justify-center mt-4">
            <button className="px-6 py-2 bg-[#B3916A] text-white rounded-lg shadow-md hover:bg-brown-500">
              전체 후기 보러가기
            </button>
          </div>
        </section>

        {/* 시설/서비스 섹션 */}
        <section id="services" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">시설/서비스</h2>
          <p>이곳은 호텔의 시설 및 서비스를 보여주는 콘텐츠 영역입니다.</p>
        </section>

        {/* 숙소 정책 섹션 */}
        <section id="policies" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">숙소 정책</h2>
          <p>이곳은 숙소 정책을 보여주는 콘텐츠 영역입니다.</p>
        </section>

        {/* 위치 섹션 */}
        <section id="location" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">위치</h2>
          <p>이곳은 숙소의 위치를 보여주는 콘텐츠 영역입니다.</p>
        </section>

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
