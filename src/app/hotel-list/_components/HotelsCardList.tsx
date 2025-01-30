import useHotelReviews from '@/hooks/review/useHotelReviews';
import { HotelWithPriceOnly } from '@/types/supabase/hotel-type';
import Image from 'next/image';
import useHotelRooms from '@/hooks/room/useHotelRooms';
import RenderStars from './RenderStars';
import RiThumbUpFillIcon from '@/components/ui/icon/RiThumbUpFillIcon';
import useFacilities from '@/hooks/hotel/useFacilities';
import useFormatCurrency from '@/hooks/formatCurrency/useFormatCurrency';
import useFavoriteStore from '@/hooks/favorite/useFavoriteStore';
import ParentIcon from '@/components/ui/icon/ParentIcon';

interface HotelListItemProps {
  hotel: HotelWithPriceOnly;
  isFavorite: boolean;
  hotelId: string;
}

const HotelCardList = ({ hotel, isFavorite, hotelId }: HotelListItemProps) => {
  const { reviews, allReviews, loading: reviewsLoading } = useHotelReviews(hotelId);
  const { roomsData } = useHotelRooms(hotelId);
  const { data: facilityData, isLoading: facilitiesLoading } = useFacilities();
  const formatKoreanCurrency = useFormatCurrency();

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

  const { favoriteStatus, toggleFavorite } = useFavoriteStore(); // 즐겨찾기 관련 상태와 함수 가져오기

  const getFacilityNames = () => {
    if (facilitiesLoading) return ['로딩 중...'];
    if (!facilityData || facilityData.length === 0) return ['시설 데이터 없음'];
    if (!hotel.facility_ids || hotel.facility_ids.length === 0) return []; // ✅ 추가

    return hotel.facility_ids
      .map((facilityId) => {
        const facility = facilityData.find((fac) => fac.id === facilityId);
        return facility ? facility.name : '알 수 없는 시설';
      })
      .filter((name) => name !== '알 수 없는 시설'); // 없는 시설 제거
  };

  return (
    <li
      className="flex flex-row items-center rounded-[12px] shadow-md p-4 bg-white relative"
      style={{ width: '100%', maxWidth: '872px', minWidth: '300px' }}
    >
      {/* 왼쪽 이미지 */}
      <div className="relative overflow-hidden rounded-md" style={{ width: '324px', height: '240px' }}>
        <Image
          src={hotel.main_img_url || '/default-hotel.jpg'}
          alt={hotel.name || 'Default Image'}
          width={324}
          height={240}
          className="object-cover w-full h-full"
        />
      </div>

      {/* 오른쪽 텍스트 */}
      <div className="w-[492px] h-[240px] ml-6 flex flex-col justify-between items-start">
        <div>
          {/* 호텔 이름과 별점 */}
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-row gap-2">
              <h3 className="mb-1 text-2xl font-bold text-gray-900">{hotel.name}</h3>
              <div className="flex items-center">
                <RenderStars stars={hotel.stars} />
              </div>
            </div>
          </div>

          {/* 호텔 설명 */}
          <p className="w-[65%] mb-1 text-lg text-gray-700 leading-[1.45] text-left font-normal">
            {hotel.description || '설명 없음'}
          </p>
          <p className="text-base text-left text-gray-600">{hotel.address}</p>

          {/* 리뷰 */}
          {!reviewsLoading && (
            <div className="flex flex-row items-center">
              <RiThumbUpFillIcon className="w-6 h-6 text-[#EEC18D]" />
              <p className="ml-1 text-lg font-semibold">{averageRating}</p>
              <span className="ml-2 text-gray-500">({totalReviews.toLocaleString()})</span>
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
            {getFacilityNames()
              .slice(0, 2)
              .map((facilityName, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center h-[28px] px-3 bg-[#FCF6EE] text-[#5A3B1A] border border-[#ECDDC8] rounded-md text-[14px] leading-none whitespace-nowrap"
                >
                  {facilityName}
                </span>
              ))}
          </div>

          {/* 가격 */}
          <div>
            <span className="font-semibold text-2xl">{formatKoreanCurrency(hotel.min_price as number)}원</span>
            <span className="text-gray-500 text-base font-medium">/1박</span>
          </div>
        </div>
      </div>

      {/* 하트 아이콘 */}
      <div className="absolute top-[25px] right-[16px] text-2xl" style={{ transform: 'translate(0, -50%)' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(hotelId);
          }}
          className="p-2 rounded-full bg-white transition-all duration-200  "
        >
          <ParentIcon isActive={favoriteStatus[hotelId]} />
        </button>
      </div>
    </li>
  );
};

export default HotelCardList;
