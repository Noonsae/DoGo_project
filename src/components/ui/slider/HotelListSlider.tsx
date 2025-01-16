import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HotelWithMinPrice } from '@/types/supabase/room-type';
import { CustomNextArrow, CustomPrevArrow } from '@/components/ui/slider/customArrow';

const HotelListSlider = ({ hotels }: { hotels: HotelWithMinPrice[] | undefined }) => {
  const settings = {
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 3, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    nextArrow: <CustomNextArrow />, // 커스텀 다음 버튼
    prevArrow: <CustomPrevArrow /> // 커스텀 이전 버튼
  };

  if (!hotels || hotels.length === 0) {
    return <div>호텔 데이터를 불러올 수 없습니다.</div>; // 데이터가 없을 때 처리
  }

  return (
    <div className="mt-8">
      <Slider {...settings}>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="w-[380px] h-[484px] flex-shrink-0 p-[16px] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)]"
          >
            <Image
              src={hotel.main_img_url || ''}
              width={348}
              height={282}
              alt={'호텔 메인 이미지'}
              className="w-full h-[282px] rounded-[12px]"
            />
            <h3 className="mt-[12px]">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.address}</p>

            <p className="mt-[11px] text-[#D9D9D9]">
              {'⭐'.repeat(hotel.stars)}
              <span className="text-[#9E9E9E]"> (3,222) </span>
            </p>
            <p className="w-full mt-[24px] text-right text-[24px]-black font-semibold">
              <span className="text-base text-[#5b5b5b] font-medium mr-1">Sale%</span>
              <span>{hotel.min_price.toLocaleString('en-US')}원</span>
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HotelListSlider;
