import useHotelReviews from '@/hooks/review/useHotelReviews';
import { HotelType } from '@/types/supabase/hotel-type';
import Image from 'next/image';
import useHotelRooms from '@/hooks/room/useHotelRooms';
import useSerViceFacility from '@/hooks/serviceFacility/useServiceFacility';
import RenderStars from './RenderStars';
import RiThumbUpFillIcon from '@/components/ui/icon/RiThumbUpFillIcon';

interface HotelListItemProps {
  hotel: HotelType & { min_price?: number | null };
  isFavorite: boolean;
  hotelId: string;
}

const HotelCardList = ({ hotel, isFavorite, hotelId }: HotelListItemProps) => {
  const { reviews, allReviews, loading } = useHotelReviews(hotelId);
  const { roomsData } = useHotelRooms(hotelId);
  const { facilityData, serviceData } = useSerViceFacility(hotelId, 1);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const viewTranslationMap: { [key: string]: string } = {
    ocean: '오션뷰',
    mountain: '마운틴뷰',
    city: '시티뷰',
    river: '리버뷰'
  };

  const translateView = (view: string): string => {
    return viewTranslationMap[view] || '알 수 없는 뷰';
  };

  const totalReviews = allReviews.length;

  return (
    <li
      className="flex flex-row items-center rounded-[12px] shadow-[0px_4px_8px_rgba(0,0,0,0.1)] p-[16px] bg-white relative"
      style={{
        width: '100%', // 기본적으로 부모 요소에 맞춤
        maxWidth: '872px', // 최대 너비 제한
        minWidth: '300px' // 최소 너비 설정
      }}
    >
      {/* 왼쪽 이미지 */}
      <div
        className="relative overflow-hidden rounded-md"
        style={{
          width: '324px', // 고정된 이미지 컨테이너 너비
          height: '240px' // 고정된 이미지 컨테이너 높이
        }}
      >
        <Image
          src={hotel.main_img_url || '/default-hotel.jpg'}
          alt={hotel.name || 'Default Image'}
          width={324} // 이미지 고정 크기
          height={240} // 이미지 고정 크기
          className="object-cover w-full h-full" // 이미지가 컨테이너에 맞게 정렬
        />
      </div>

      {/* 오른쪽 텍스트 */}
      <div className="w-[492px] h-[240px] ml-6 flex flex-col justify-between items-start">
        <div>
          {/* 호텔 이름과 별점 */}
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-row gap-2">
              <h3 className="mb-1 text-[24px] font-bold text-[#232527]">{hotel.name}</h3>
              <div className="flex items-center">
                <RenderStars stars={hotel.stars} />
              </div>
            </div>
          </div>

          {/* 호텔 설명 */}
          <p className="w-[65%] mb-1 text-[18px] text-[#444] leading-[1.45] text-left font-normal">
            {hotel.description || '설명 없음'}
          </p>
          <p className="text-base text-left text-[#777]">{hotel.address}</p>

          {/* 리뷰 */}
          {!loading && (
            <div className="flex flex-row items-center">
              <RiThumbUpFillIcon className="w-6 h-6 text-[#EEC18D]" />
              <p className="ml-1 text-[18px] font-semibold">{averageRating}</p>
              <span className="ml-2 text-[#A0A0A0]">({totalReviews.toLocaleString()})</span>
            </div>
          )}
        </div>

        <div className="w-full h-8 flex flex-row justify-between items-center">
          {/* 태그들 */}
          <div className="flex gap-2">
            {/* 룸 뷰 */}
            {roomsData.length > 0 && (
              <span className="inline-flex items-center justify-center h-[28px] px-3 bg-[#FCF6EE] text-[#5A3B1A] border border-[#ECDDC8] rounded-md text-[14px] leading-none whitespace-nowrap">
                {translateView(roomsData[0]?.view || '')}
              </span>
            )}

            {/* 퍼실리티 */}
            {facilityData.length > 0 && (
              <span className="inline-flex items-center justify-center h-[28px] px-3 bg-[#FCF6EE] text-[#5A3B1A] border border-[#ECDDC8] rounded-md text-[14px] leading-none whitespace-nowrap">
                {facilityData[0]?.name || '알 수 없는 시설'}
              </span>
            )}

            {/* 서비스 */}
            {serviceData.length > 0 && (
              <span className="inline-flex items-center justify-center h-[28px] px-3 bg-[#FCF6EE] text-[#5A3B1A] border border-[#ECDDC8] rounded-md text-[14px] leading-none whitespace-nowrap">
                {serviceData[0]?.name || '알 수 없는 서비스'}
              </span>
            )}
          </div>

          {/* 가격 */}
          <div>
            <span className="text-6 font-semibold text-2xl">112,000원</span>
            <span className="text-[#A0A0A0] text-base font-medium">/1박</span>
          </div>
        </div>
      </div>

      {/* 하트 아이콘 */}
      <div className="absolute top-[25px] right-[16px] text-2xl" style={{ transform: 'translate(0, -50%)' }}>
        <p className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}>{isFavorite ? '❤️' : '🤍'}</p>
      </div>
    </li>
  );
};

export default HotelCardList;
