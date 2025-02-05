import React from 'react';
import { FetchHotelsFilterResponse, FiltersType } from '@/types/hotel/hotel-filter-type';

interface AppliedFilterProps {
  filters: FiltersType;
  data: FetchHotelsFilterResponse;
  getFilteredNames: (ids: string[], facilities: { facility_id: string; facilities: { name: string } }[]) => string;
  getServiceNames: (ids: string[], services: { service_id: string; services: { name: string } }[]) => string;
  uniqueHotels: {
    facilities?: { facility_id: string; facilities: { name: string } }[];
    services?: { service_id: string; services: { name: string } }[];
  }[];
}

const AppliedFilters: React.FC<AppliedFilterProps> = ({
  filters,
  data,
  getFilteredNames,
  getServiceNames,
  uniqueHotels
}) => {
  return (
    <div className="flex flex-wrap justify-start items-start mb-4 gap-4">
      <div className="mt-2 text-base text-[#777] font-medium">
        <p className="text-[24px] text-[#232527] font-semibold max-[360px]:text-[15px] max-[360px]:text-[#A0A0A0] max-[360px]:ml-[20px] max-[360px]:font-medium">
          총 {data.totalCount}개의 결과
        </p>
        <p className="mt-2 max-[360px]:hidden">적용된 필터:</p>

        {filters.stars.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {filters.stars.map((star, index) => (
              <p key={index} className="border py-2 px-4 rounded-lg">
                {star}성
              </p>
            ))}
          </div>
        )}

        {filters.facilityIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {filters.facilityIds.map((facilityId, index) => (
              <p key={index} className="border py-2 px-4 rounded-lg">
                {getFilteredNames(
                  [facilityId],
                  uniqueHotels.flatMap((hotel) => hotel.facilities ?? []) as {
                    facility_id: string;
                    facilities: { name: string };
                  }[]
                )}
              </p>
            ))}
          </div>
        )}

        {filters.serviceIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {filters.serviceIds.map((serviceId, index) => (
              <p key={index} className="border py-2 px-4 rounded-lg">
                {getServiceNames(
                  [serviceId],
                  uniqueHotels.flatMap((hotel) => hotel.services ?? []) as {
                    service_id: string;
                    services: { name: string };
                  }[]
                )}
              </p>
            ))}
          </div>
        )}

        {filters.beds.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {filters.beds.map((bed, index) => (
              <p key={index} className="border py-2 px-4 rounded-lg">
                {bed}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedFilters;
