'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import BusinessHotelModal from '@/app/my-page/_components/BusinessHotelModal';
import BusinessSidebar from '@/app/my-page/_components/BusinessSidebar';

// 호텔 데이터 타입 정의
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('hotels')
          .select(
            `
            id,
            name,
            address,
            description,
            main_img_url,
            hotel_facility (
              facility_id
            ),
            hotel_service (
              service_id
            )
          `
          )
          .single();

        if (error) throw error;

        const formattedHotel: Hotel = {
          id: data.id,
          name: data.name,
          address: data.address,
          description: data.description,
          main_img_url: data.main_img_url,
          facilities: data.hotel_facility.map((facility: any) => facility.facility_id),
          services: data.hotel_service.map((service: any) => service.service_id),
        };

        setHotel(formattedHotel);
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
      {/* 사이드바 추가 */}
      <BusinessSidebar userId="user-id-placeholder" currentTab="hotel" />

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

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">편의 시설</h2>
            <ul>
              {hotel
                ? hotel.facilities.map((facility, index) => <li key={index}>- {facility}</li>)
                : ['공용 시설', '기타 시설'].map((facility, index) => (
                    <li key={index} className="text-gray-400">
                      - {facility}
                    </li>
                  ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">서비스</h2>
            <ul>
              {hotel
                ? hotel.services.map((service, index) => <li key={index}>- {service}</li>)
                : ['서비스'].map((service, index) => (
                    <li key={index} className="text-gray-400">
                      - {service}
                    </li>
                  ))}
            </ul>
          </div>

          {/* 호텔 등록 버튼 */}
          {!hotel && (
            <div className="text-center mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                호텔 등록하기
              </button>
            </div>
          )}
        </div>

        {/* 호텔 등록 모달 */}
        {isModalOpen && (
          <BusinessHotelModal onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-bold mb-4">호텔 등록</h2>
            <p className="text-gray-600">등록할 편의 시설 및 서비스를 선택하세요.</p>
          </BusinessHotelModal>
        )}
      </main>
    </div>
  );
};

export default HotelManagement;
