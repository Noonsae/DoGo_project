import useFormatCurrency from '@/hooks/formatCurrency/useFormatCurrency';
import useHotelReviews from '@/hooks/review/useHotelReviews';
import { HotelType } from '@/types/supabase/hotel-type';
import Image from 'next/image';
import useHotelRooms from '@/hooks/room/useHotelRooms';
import useSerViceFacility from '@/hooks/serviceFacility/useServiceFacility';
import RenderStars from './RenderStars';
import { RiThumbUpFill } from 'react-icons/ri';

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
      <div className="w-[492px] h-[240px] ml-6 flex flex-col justify-between items-start">
        <div>
          {/* 호텔 이름과 하트 */}
          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-2 ">
              <h3 className="mb-1 text-[24px] font-bold text-[#232527]">
                {hotel.name}
                {/* 별점 */}
              </h3>
              <div className="flex items-center">
                <RenderStars rating={hotel.stars} />
              </div>
            </div>

            {/* 상태 표시만 하는 하트 */}
            <p className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}>{isFavorite ? '❤️' : '🤍'}</p>
          </div>

          {/* 호텔 설명 */}
          <p className="w-[65%] mb-1 text-[18px] text-[#444] leading-[1.45] text-left font-normal">
            {hotel.description || '설명 없음'}
          </p>
          <p className="text-base text-left text-[#777]">{hotel.address}</p>

          {/* 리뷰 */}
          {!loading && (
            <div className="flex flex-row items-center">
              <RiThumbUpFill className="w-6 h-6 text-[#EEC18D]" />
              <p className="ml-1 text-[18px] font-semibold">4.8</p>
              <span className="ml-2 text-[#A0A0A0]">(3,222)</span>
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
            <div className="">
              {/* <span className="font-bold">
                {hotel.min_price !== null && hotel.min_price !== undefined
                  ? `${formatKoreanCurrency(hotel.min_price)}원`
                  : ''}
              </span> */}
              <span className="text-6 font-semibold">192,000원</span>
              <span className="text-[#A0A0A0] text-base font-medium">/1박</span>
              {/* {hotel.min_price !== null && hotel.min_price !== undefined && (
                <span className="ml-1 text-sm text-[#A0A0A0]">/1박</span>
              )} */}
            </div>
          </div>
        </div>
    </li>
  );
};

export default HotelCardList;
