'use client';
import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuth';
import Image from 'next/image';
import useFavoriteStore from '@/store/favorite/useFavoriteStore';
import { HotelType } from '@/types/supabase/hotel-type';
import { RoomType } from '@/types/supabase/room-type';

const HotelDetailPage = ({ params }: { params: { id: string } }) => {
  const hotelId = params?.id;

  const [hotelData, setHotelData] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [roomsData, setRoomsData] = useState<RoomType | null>(null);

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
        setRoomsData(data);
      } catch (error) {
        console.error('Error fetching rooms data:', error);
      }
    };

    fetchRoomsData();
  }, [hotelId]);

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
          <p className="bg-[#FDF9F4] w-[1200px] h-full">이곳은 호텔의 객실을를 보여주는 콘텐츠 영역입니다.</p>
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
