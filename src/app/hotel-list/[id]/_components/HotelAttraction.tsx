'use client';

import { useState, useRef, useEffect } from 'react';
import RiThumbUpFillIcon from '@/components/ui/icon/RiThumbUpFillIcon';

const places = [
  {
    title: '그리에',
    location: '서울 강남구 위치',
    rating: 4.8,
    reviews: 1344,
    price: 292000,
    image: '/images/greee.webp',
    link: 'https://map.naver.com/p/search/%EC%B2%AD%EB%8B%B4%EB%8F%99%20%ED%8C%8C%EC%9D%B8%EB%8B%A4%EC%9D%B4%EB%8B%9D/place/1388486977'
  },
  {
    title: '옳음',
    location: '서울 송파구 위치',
    rating: 4.5,
    reviews: 3222,
    price: 146500,
    image: '/images/olheum.webp',
    link: 'https://map.naver.com/p/search/%EC%B2%AD%EB%8B%B4%EB%8F%99%20%ED%8C%8C%EC%9D%B8%EB%8B%A4%EC%9D%B4%EB%8B%9D/place/37604188'
  },
  {
    title: '트리드',
    location: '서울 용산구 위치',
    rating: 4.6,
    reviews: 1563,
    price: 115000,
    image: '/images/trid.webp',
    link: 'https://map.naver.com/p/search/%ED%8A%B8%EB%A6%AC%EB%93%9C/place/1570882425'
  }
];

const HotelAttraction = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth; // 현재 화면 크기 기준 카드 너비
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);
    };

    const scrollContainer = scrollRef.current;
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <section id="nearby" className="scroll-mt-20 mt-[120px] mb-[76px] max-[360px]:mt-0">
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-8 max-[360px]:px-5 max-[360px]:mb-1 max-[360px]:text-lg">
          호텔 주변 명소
        </h2>

        {/* 🖥️ 360px 이상 (데스크탑 & 태블릿): Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-[360px]:hidden">
          {places.map((place, index) => (
            <a
              key={index}
              href={place.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center rounded-lg p-4 cursor-pointer"
            >
              <div
                className="w-full max-w-[380px] h-[282px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${place.image})` }}
              ></div>
              <div className="mt-4 text-left w-full">
                <h3 className="font-semibold text-2xl text-neutral-900">{place.title}</h3>
                <p className="text-lg text-neutral-600 font-medium">{place.location}</p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <span className=" text-[#EEC18D] text-lg flex">
                    <RiThumbUpFillIcon />
                    <span className="text-neutral-800 font-semibold ml-1">{place.rating}</span>
                  </span>
                  <span className="text-neutral-500 font-normal text-base ml-1">({place.reviews})</span>
                </div>
                <p className="flex justify-end items-end mt-2 font-semibold text-2xl">
                  {place.price.toLocaleString()}원
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* 📱 360px 이하 (모바일): 가로 스크롤 + 페이지네이션 */}
        <div className="hidden max-[360px]:block overflow-hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto w-full scroll-smooth snap-x snap-mandatory scrollbar-hide"
          >
            {places.map((place, index) => (
              <a
                key={index}
                href={place.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col flex-shrink-0 w-full rounded-lg p-4 cursor-pointer snap-center"
              >
                <div
                  className="w-full h-[216px] bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${place.image})` }}
                ></div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg text-neutral-900">{place.title}</h3>
                  <p className="text-sm text-neutral-600">{place.location}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <span className="text-[#EEC18D] text-lg flex">
                      <RiThumbUpFillIcon />
                      <span className="text-neutral-800 font-semibold ml-1">{place.rating}</span>
                    </span>
                    <span className="text-neutral-500 font-normal text-sm ml-1">({place.reviews})</span>
                  </div>
                  <p className="flex justify-end items-end mt-2 font-semibold text-xl">
                    {place.price.toLocaleString()}원
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center mt-3">
            {places.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-[#EEC18D]' : 'bg-gray-400'}`}
              ></span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelAttraction;
