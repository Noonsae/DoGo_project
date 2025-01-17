'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 타입 정의
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
  const [error, setError] = useState<string | null>(null);

  // 데이터 가져오기
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

        // 데이터 가공
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
        console.error('Error fetching hotel data:', err);
        setError('호텔 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, []);

  // 로딩 중 상태 처리
  if (loading) {
    return <p className="text-center text-gray-600">로딩 중...</p>;
  }

  // 에러 발생 시 처리
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // 데이터 없을 때 처리
  if (!hotel) {
    return <p className="text-center text-gray-600">호텔 정보가 없습니다.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">호텔 관리</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">기본 정보</h2>
        <p>
          <strong>호텔명:</strong> {hotel.name}
        </p>
        <p>
          <strong>주소:</strong> {hotel.address}
        </p>
        <p>
          <strong>설명:</strong> {hotel.description}
        </p>
        {hotel.main_img_url && (
          <img
            src={hotel.main_img_url}
            alt={`${hotel.name} 이미지`}
            className="mt-4 rounded-lg shadow-md w-full max-w-md"
          />
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">편의 시설</h2>
        <ul>
          {hotel.facilities.map((facility, index) => (
            <li key={index}>- {facility}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">서비스</h2>
        <ul>
          {hotel.services.map((service, index) => (
            <li key={index}>- {service}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HotelManagement;
