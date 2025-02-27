'use client';

import { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
// import BusinessSidebar from '@/app/my-page/_components/BusinessSidebar';

// TODO 타입 파일 분리 
interface Hotel {
  id: string;
  name: string;
  address: string;
  description: string;
  main_img_url: string | null;
  facilities: string[];
  services: string[];
}

const HotelManagement: React.FC = () => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('hotel'); // 기본값을 'hotel'로 설정

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await browserSupabase().auth.getUser();
      if (error) {
        console.error('User fetch error:', error);
        return;
      }
      setUserId(data?.user?.id || null);
    };

    fetchUser();
  }, []);

  // TODO 데이터 요청 함수 분리
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('hotels')
          .select(
            `id, name, address, description, main_img_url, hotel_facility (facility_id), hotel_service (service_id)`
          )
          .single();

        if (error) throw error;

        setHotel({
          id: data.id,
          name: data.name,
          address: data.address,
          description: data.description,
          main_img_url: data.main_img_url,
          facilities: data.hotel_facility.map((facility: any) => facility.facility_id),
          services: data.hotel_service.map((service: any) => service.service_id)
        });
      } catch (err) {
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">호텔 관리</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {loading && <p className="text-center text-gray-600">로딩 중...</p>}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">기본 정보</h2>
            <p>
              <strong>호텔명:</strong> {hotel ? hotel.name : 'Hotel Name'}
            </p>
            <p>
              <strong>주소:</strong> {hotel ? hotel.address : 'Hotel Address'}
            </p>
            <p>
              <strong>설명:</strong> {hotel ? hotel.description : '호텔 설명을 입력하세요.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HotelManagement;
