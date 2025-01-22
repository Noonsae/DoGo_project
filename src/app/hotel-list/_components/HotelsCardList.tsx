import useFormatCurrency from '@/hooks/formatCurrency/useFormatCurrency';
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

  const ratingIcon = () => {
    return (
      <svg width="77" height="25" viewBox="0 0 77 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 9.49997H5V21.5H2C1.44772 21.5 1 21.0523 1 20.5V10.5C1 9.94769 1.44772 9.49997 2 9.49997ZM7.29289 8.20708L13.6934 1.80661C13.8693 1.63066 14.1479 1.61087 14.3469 1.76016L15.1995 2.3996C15.6842 2.76312 15.9026 3.38253 15.7531 3.96966L14.5998 8.49997H21C22.1046 8.49997 23 9.3954 23 10.5V12.6043C23 12.8656 22.9488 13.1243 22.8494 13.3658L19.755 20.8807C19.6007 21.2554 19.2355 21.5 18.8303 21.5H8C7.44772 21.5 7 21.0523 7 20.5V8.91419C7 8.64897 7.10536 8.39462 7.29289 8.20708Z"
          fill="#EEC18D"
        />
      </svg>
    );
  };

  const totalReviews = allReviews.length;

  return (
    <li
      className="w-[872px] h-full flex flex-row items-center rounded-[12px] shadow-[0px_4px_8px_rgba(0,0,0,0.1)] p-[16px] bg-white"
      style={{
        width: '100%', // 기본적으로 100%로 설정
        maxWidth: '872px', // 최대 너비는 기존 872px
        minWidth: '300px' // 최소 너비를 설정 (너무 작아지지 않도록)
      }}
    >
      {/* 왼쪽 이미지 */}
      <div className="relative">
        <Image
          src={hotel.main_img_url || '/default-hotel.jpg'}
          alt={hotel.name || 'Default Image'}
          width={324}
          height={240}
          className="object-cover rounded-md"
        />
      </div>

      {/* 오른쪽 텍스트 */}
      <div className="w-[492px] h-[240px] ml-6 flex flex-col justify-between items-start">
        <div>
          {/* 호텔 이름과 하트 */}
          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-2 ">
              <h3 className="mb-1 text-[24px] font-bold text-[#232527]">{hotel.name}</h3>
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
