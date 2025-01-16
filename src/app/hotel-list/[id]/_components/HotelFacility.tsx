import { FacilitiesType } from '@/types/supabase/facilities-type';
import { ServicesType } from '@/types/supabase/services-type';
import React, { useEffect } from 'react';

interface HotelFacilityProps {
  facilityData: FacilitiesType[];
  roomOption: React.ReactNode;
  setFacilityData: React.Dispatch<React.SetStateAction<FacilitiesType[]>>;
  hotelId: string;
  setServicesData: React.Dispatch<React.SetStateAction<ServicesType[]>>; // 수정: 상태 관리 함수로 정의
  serviceData: ServicesType[];
}
const HotelFacility = ({
  facilityData,
  roomOption,
  setFacilityData,
  hotelId,
  setServicesData,
  serviceData
}: HotelFacilityProps) => {
  useEffect(() => {
    const fetchFacilitiesData = async () => {
      if (!hotelId) {
        console.error('hotelId가 없습니다.');
        return;
      }

      try {
        const response = await fetch(`/api/hotel-facility?hotel_id=${hotelId}`); // 쿼리 파라미터 이름 일치
        if (!response.ok) {
          throw new Error('Failed to fetch facilities data');
        }
        const data = await response.json();
        setFacilityData(data); // 데이터 설정
      } catch (error) {
        console.error('Error fetching facilities data:', error);
        setFacilityData([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchFacilitiesData();
  }, [hotelId]);

  useEffect(() => {
    const fetchServicesData = async () => {
      if (!hotelId) {
        console.error('hotelId가 없습니다.');
        return;
      }

      try {
        const response = await fetch(`/api/hotel-service?hotel_id=${hotelId}`); // 쿼리 파라미터 이름 일치
        if (!response.ok) {
          throw new Error('Failed to fetch services data');
        }
        const data = await response.json();
        setServicesData(data); // 상태 업데이트
      } catch (error) {
        console.error('Error fetching services data:', error);
        setServicesData([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchServicesData();
  }, [hotelId]);

  return (
    <div>
      <section id="services" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">시설/서비스</h2>
        <div>
          <h3 className="text-lg font-semibold mb-2">공용 시설</h3>
          <ul className="grid grid-cols-4 gap-4">
            {facilityData.map((facility) => (
              <li key={facility.id} className="flex items-center gap-2 text-gray-700">
                {roomOption}
                {facility.name}
              </li>
            ))}
          </ul>
          {facilityData.length === 0 /* 데이터가 없을 때 메시지 표시 */ && (
            <p className="text-gray-500 mt-4">등록된 시설 정보가 없습니다.</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">서비스 시설</h3>
          <ul className="grid grid-cols-4 gap-4">
            {serviceData.map((service) => (
              <li key={service.id} className="flex items-center gap-2 text-gray-700">
                {roomOption}
                {service.name}
              </li>
            ))}
          </ul>
          {facilityData.length === 0 /* 데이터가 없을 때 메시지 표시 */ && (
            <p className="text-gray-500 mt-4">등록된 시설 정보가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HotelFacility;
