import { useState, useEffect } from 'react';
import { FacilitiesType } from '@/types/supabase/facilities-type';
import { ServicesType } from '@/types/supabase/services-type';

const useServiceFacility = (hotelId: string, limit: number | null = null) => {
  const [facilityData, setFacilityData] = useState<FacilitiesType[]>([]);
  const [serviceData, setServiceData] = useState<ServicesType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacilitiesAndServices = async () => {
      if (!hotelId) return;

      setLoading(true);
      setError(null);

      try {
        const [facilityRes, serviceRes] = await Promise.all([
          fetch(`/api/hotel-facility?hotel_id=${hotelId}`),
          fetch(`/api/hotel-service?hotel_id=${hotelId}`)
        ]);

        if (!facilityRes.ok || !serviceRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [facilityData, serviceData] = await Promise.all([facilityRes.json(), serviceRes.json()]);

        // limit 값에 따라 slice 적용
        setFacilityData(limit ? facilityData.slice(0, limit) : facilityData);
        setServiceData(limit ? serviceData.slice(0, limit) : serviceData);
      } catch (err: any) {
        setError(err.message || 'Unknown error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilitiesAndServices();
  }, [hotelId, limit]);

  return { facilityData, serviceData, loading, error };
};

export default useServiceFacility;
