import { HotelType } from '@/types/supabase/hotel-type';
import Image from 'next/image';

interface HotelListItemProps {
  hotel: HotelType;
  isFavorite: boolean;
  onToggleFavorite: (hotelId: string) => void;
}

const HotelCardList: React.FC<HotelListItemProps> = ({ hotel, isFavorite, onToggleFavorite }) => {
  // 별 렌더링 함수
  const renderStars = (stars: number) => {
    return Array.from({ length: stars }, (_, index) => (
      <svg key={index} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.99984 0.166748L10.0571 5.66852L15.9253 5.92494L11.3285 9.58164L12.898 15.2419L7.99984 12.0001L3.10163 15.2419L4.67114 9.58164L0.0743661 5.92494L5.94259 5.66852L7.99984 0.166748Z"
          fill="#B3B3B3"
        />
      </svg>
    ));
  };

  return (
    <li className="w-[872px] h-[277px] flex items-center border border-gray-300 rounded-md shadow-md mb-4 p-4 bg-white">
      <div className="flex-shrink-0">
        <Image
          src={hotel.main_img_url || '/default-hotel.jpg'}
          alt={hotel.name || 'Default Image'}
          width={325}
          height={245}
          className="object-cover block ml-3 rounded-md"
        />
      </div>
      <div className="ml-[16px] h-[245px] flex flex-col justify-between">
        <h3 className="text-lg font-semibold leading-none">{hotel.name}</h3>
        <p className="bg-[#E8E8E8] py-1 px-2 flex rounded-sm">{renderStars(hotel.stars)}</p>
        <button
          onClick={() => onToggleFavorite(hotel.id)}
          className="ml-auto p-2 text-2xl"
          aria-label="찜하기 버튼"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        <p className="text-gray-600">{hotel.description}</p>
        <p className="text-gray-600">{hotel.address}</p>
        <p className="text-lg font-bold text-gray-800">{hotel.min_price}원</p>
      </div>
    </li>
  );
};

export default HotelCardList;
