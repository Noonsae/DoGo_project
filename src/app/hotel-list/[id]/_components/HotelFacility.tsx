import { HotelFacilityProps } from '@/types/hotel/hotel-facility-type';

const HotelFacility = ({ facilityData, roomOption, hotelId, serviceData }: HotelFacilityProps) => {
  return (
    <div>
      <section id="services" className="scroll-mt-20 mb-[120px] max-[360px]:mb-0 max-[360px]:px-5">
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-4 max-[360px]:text-[18px]">시설/서비스</h2>
        <div>
          <h3 className="text-lg font-semibold mb-2 max-[360px]:text-[#444] max-[360px]:text-base">공용 시설</h3>
          <ul className="grid grid-cols-4 gap-4 max-[360px]:grid-cols-3">
            {facilityData.map((facility) => (
              <li key={facility.id} className="flex items-center gap-2 text-gray-700 max-[360px]:text-[14px]">
                {roomOption}
                {facility.name}
              </li>
            ))}
          </ul>
          {facilityData.length === 0 /* 데이터가 없을 때 메시지 표시 */ && (
            <p className="text-gray-500 mt-4">등록된 시설 정보가 없습니다.</p>
          )}
        </div>
        <p className="mt-10"></p>
        <div>
          <h3 className="text-lg font-semibold mb-2 max-[360px]:text-[#444] max-[360px]:text-base">서비스 시설</h3>
          <ul className="grid grid-cols-4 gap-4 max-[360px]:grid-cols-3">
            {serviceData.map((service) => (
              <li key={service.id} className="flex items-center gap-2 text-gray-700  max-[360px]:text-[14px]">
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
