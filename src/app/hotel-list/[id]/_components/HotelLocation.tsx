import KakaoTest from '@/hooks/map/kakaomap';

import { HotelLocationProps } from '@/types/hotel/hotel-location.type';

import CopyAddressIcon from '@/components/ui/icon/CopyAddressIcon';
import SubwayIcon from '@/components/ui/icon/SubwayIcon';
import RunningIcon from '@/components/ui/icon/RunningIcon';
import useHotelDetail from '@/hooks/hotel/useHotelDetail';

const HotelLocation = ({ id: hotelId }: HotelLocationProps) => {
  const { hotelData, loading } = useHotelDetail(hotelId);

  if (loading) return <div>Loading...</div>;
  if (!hotelData || !hotelData.address) return <div>호텔 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <section id="location" className="scroll-mt-20">
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-4 max-[360px]:px-5 max-[360px]:text-lg">위치</h2>
        <KakaoTest address={hotelData.address} className="w-full h-[400px] max-[360px]:h-[240px]" />
        <p className="flex text-xl text-neutral-800 font-semibold gap-1 mt-4 max-[360px]:mt-[20px] max-[360px]:text-[15px] max-[360px]:gap-3 max-[360px]:px-5 max-[360px]:mb-4">
          {hotelData.address}
          <span className="flex  max-[360px]:text-[#B3916A]">
            {CopyAddressIcon()}
            주소복사
          </span>
        </p>
        <p className="flex text-neutral-700 gap-1 mt-1 max-[360px]:px-5 max-[360px]:text-[14px] max-[360px]:mb-2 max-[360px]:gap-2">
          {SubwayIcon()}아오역 1번 출구 도보 60분
        </p>
        <p className="flex text-neutral-700 gap-1 mt-1 max-[360px]:px-5 max-[360px]:text-[14px] max-[360px]:gap-2">
          {RunningIcon()}대전아오백화점 도보 4시간
        </p>
      </section>
    </div>
  );
};

export default HotelLocation;
