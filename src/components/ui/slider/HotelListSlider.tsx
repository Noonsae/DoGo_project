import { useEffect, useState } from 'react';
import Slider from 'react-slick';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useHistoryStore from '@/store/useHistoryStore';
import { HotelWithPriceOnly } from '@/types/supabase/hotel-type';

import { CustomNextArrow, CustomPrevArrow } from '@/components/ui/slider/SlideCustomArrow';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import RiThumbUpFillIcon from '../icon/RiThumbUpFillIcon';
import SliderSkeletonUI from '../skeleton/SliderSkeletonUI';

const HotelListSlider = ({ hotels }: { hotels: HotelWithPriceOnly[] | undefined }) => {
  const router = useRouter();
  const addHotel = useHistoryStore((state) => state.addHotel);

  const handleSaveHistoryAndMoveDetailsPage = (hotel: HotelWithPriceOnly) => {
    addHotel(hotel);
    router.push(`/hotel-list/${hotel.id}`);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hotels) {
      setTimeout(() => setIsLoading(false), 1500); // 로딩 상태 시뮬레이션
    }
  }, [hotels]);

  if (!hotels || hotels.length === 0) {
    return <SliderSkeletonUI />;
  }

  const settings = {
    infinite: hotels && hotels.length > 3, // 슬라이드가 3개 이상일 때만 무한 반복
    speed: 400, // 슬라이드 전환 속도
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 3, // 한 번에 스크롤할 슬라이드 수
    initialSlide: 0, // 첫 번째 슬라이드에서 시작
    centerMode: false, // 중앙 정렬 비활성화
    centerPadding: '0px', // 중앙 패딩 제거
    nextArrow: <CustomNextArrow />, // 커스텀 다음 버튼
    prevArrow: <CustomPrevArrow />, // 커스텀 이전 버튼
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (isLoading) {
    return <SliderSkeletonUI />;
  }

  return (
    <div className="mt-8 w-[calc(3 * 380px)] mx-auto">
      <Slider {...settings}>
        {hotels.map((hotel) => {
          // 리뷰 관련 데이터 처리
          const reviews = hotel.reviews || []; // 리뷰가 없을 경우 빈 배열 처리
          const averageRating =
            reviews.length > 0
              ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
              : '평가 없음';
          const reviewCount = reviews.length;

          return (
            <div
              key={hotel.id}
              onClick={() => handleSaveHistoryAndMoveDetailsPage(hotel)}
              className="w-[380px] h-[484px] flex-shrink-0 p-[16px] -ml-[10px] rounded-[12px] shadow-[0px_8px_12px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              <Image
                src={hotel.main_img_url || ''}
                width={348}
                height={292}
                alt={'호텔 메인 이미지'}
                className="w-full h-[282px] rounded-[12px]"
              />
              <h3 className="mt-4 text-[24px] font-semibold">{hotel.name}</h3>
              <p className="mt-2 text-[18px] text-gray-600 font-medium">{hotel.address}</p>

              <div className="flex flex-row items-center gap-2 mt-2 text-[#D9D9D9]">
                <div>
                  <RiThumbUpFillIcon className="w-[20px] h-[20px] text-[#EEC18D]" />
                </div>
                <span className="text-[18px] text-[#444] font-semibold">{averageRating}</span>
                <span className="text-[#9E9E9E]">{`(${reviewCount})`}</span>
              </div>

              <p className="w-full mt-[24px] text-right">
                <span className="text-[24px] text-[#232527] font-semibold">
                  {typeof hotel.min_price === 'number' && isFinite(hotel.min_price)
                    ? `${hotel.min_price.toLocaleString('en-US')}원`
                    : '가격 정보 없음'}
                </span>
              </p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HotelListSlider;
