import useFormatCurrency from '@/hooks/formatCurrency/useFormatCurrency';
import useHotelReviews from '@/hooks/review/useHotelReviews';
import { HotelType } from '@/types/supabase/hotel-type';
import Image from 'next/image';
import useHotelRooms from '@/hooks/room/useHotelRooms';
import useSerViceFacility from '@/hooks/serviceFacility/useServiceFacility';
import RenderStars from './RenderStars';

interface HotelListItemProps {
  hotel: HotelType & { min_price?: number | null };
  isFavorite: boolean;
  hotelId: string;
}

const HotelCardList = ({ hotel, isFavorite, hotelId }: HotelListItemProps) => {
  const formatKoreanCurrency = useFormatCurrency();
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

  const HotelListRatingIcon = () => {
    return (
      <svg width="77" height="24" viewBox="0 0 77 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 8.99997H5V21H2C1.44772 21 1 20.5523 1 20V9.99997C1 9.44769 1.44772 8.99997 2 8.99997ZM7.29289 7.70708L13.6934 1.30661C13.8693 1.13066 14.1479 1.11087 14.3469 1.26016L15.1995 1.8996C15.6842 2.26312 15.9026 2.88253 15.7531 3.46966L14.5998 7.99997H21C22.1046 7.99997 23 8.8954 23 9.99997V12.1043C23 12.3656 22.9488 12.6243 22.8494 12.8658L19.755 20.3807C19.6007 20.7554 19.2355 21 18.8303 21H8C7.44772 21 7 20.5523 7 20V8.41419C7 8.14897 7.10536 7.89462 7.29289 7.70708Z"
          fill="#EEC18D"
        />
      </svg>
    );
  };

  return (
    <li className="w-[872px] h-[277px] flex flex-row items-center rounded-[12px] shadow-[0px_4px_8px_rgba(0,0,0,0.1)] p-[16px] bg-white">
      {/* 왼쪽 이미지 */}
      <div className="w-[324px] h-[240px] relative">
        <Image
          src={hotel.main_img_url || '/default-hotel.jpg'}
          alt={hotel.name || 'Default Image'}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* 오른쪽 텍스트 */}
      <div className="w-[492px] h-[240px] border border-blue-600 flex flex-col justify-between flex-1">
        {/* 호텔 이름과 하트 */}
        <div className="flex justify-between items-center">
          <h3 className="text-[24px] font-bold text-[#232527]">{hotel.name}</h3>

          {/* 상태 표시만 하는 하트 */}
          <span className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </div>

        {/* 별점 */}
        <div className="flex items-center text-amber-500">
          <RenderStars rating={hotel.stars} />
        </div>

        {/* 호텔 설명 */}
        <p className="text-sm text-[#444]">{hotel.description || '설명 없음'}</p>
        <p className="text-sm text-[#777]">{hotel.address}</p>

        {/* 리뷰 */}
        {!loading && (
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <span className="flex items-center">
              <p className="flex ml-1 font-semibold">{HotelListRatingIcon()}</p>
              <p className="-ml-[45px]">{averageRating}</p>
            </span>
            <span className="ml-2 text-gray-500">({totalReviews.toLocaleString()})</span>
          </div>
        )}

        {/* 태그들 */}
        <div className="flex justify-between mt-3">
          <div className="flex gap-2 mt-[80px]">
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
          <div className="ml-[80px] mt-[65px]">
            <p className="flex items-center text-xl text-gray-800 mt-3">
              <span className="font-bold">
                {hotel.min_price !== null && hotel.min_price !== undefined
                  ? `${formatKoreanCurrency(hotel.min_price)}원`
                  : ''}
              </span>
              {hotel.min_price !== null && hotel.min_price !== undefined && (
                <span className="ml-1 text-sm text-[#A0A0A0]">/1박</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HotelCardList;
