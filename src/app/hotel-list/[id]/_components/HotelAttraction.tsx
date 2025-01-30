import RiThumbUpFillIcon from '@/components/ui/icon/RiThumbUpFillIcon';
import React from 'react';

const HotelAttraction = () => {
  return (
    <div>
      <section id="nearby" className="scroll-mt-20 mt-[120px] mb-[76px]">
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-8">호텔 주변 명소</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 첫 번째 카드 */}
          <a
            href="https://map.naver.com/p/search/%EC%B2%AD%EB%8B%B4%EB%8F%99%20%ED%8C%8C%EC%9D%B8%EB%8B%A4%EC%9D%B4%EB%8B%9D/place/1388486977?c=18.14,0,0,0,dh&placePath=%3Fentry%253Dpll"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center  rounded-lg  p-4  cursor-pointer "
          >
            <div
              className="w-full max-w-[380px] h-[282px] bg-cover bg-center rounded-lg"
              style={{ backgroundImage: "url('/images/greee.webp')" }}
            ></div>
            <div className="mt-4 text-left w-full">
              <h3 className="font-semibold text-2xl text-neutral-900">그리에</h3>
              <p className="text-lg text-neutral-600 font-medium">서울 강남구 위치</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span className=" text-[#EEC18D] text-lg flex">
                  <RiThumbUpFillIcon />
                  <span className="text-neutral-800 font-semibold ml-1">4.8</span>
                </span>
                <span className="text-neutral-500 font-normal text-base ml-1">(1,344)</span>
              </div>
              <p className="flex justify-end items-end mt-2  font-semibold text-2xl">292,000원</p>
            </div>
          </a>

          {/* 두 번째 카드 */}
          <a
            href="https://map.naver.com/p/search/%EC%B2%AD%EB%8B%B4%EB%8F%99%20%ED%8C%8C%EC%9D%B8%EB%8B%A4%EC%9D%B4%EB%8B%9D/place/37604188?c=18.03,0,0,0,dh&placePath=%3Fentry%253Dpll"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center  rounded-lg  p-4  cursor-pointer "
          >
            <div
              className="w-full max-w-[380px] h-[282px] bg-cover bg-center rounded-lg"
              style={{ backgroundImage: "url('/images/olheum.webp')" }}
            ></div>
            <div className="mt-4 text-left w-full">
              <h3 className="font-semibold text-2xl text-neutral-900">옳음</h3>
              <p className="text-lg text-neutral-600 font-medium">서울 송파구 위치</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span className=" text-[#EEC18D] text-lg flex">
                  <RiThumbUpFillIcon />
                  <span className="text-neutral-800 font-semibold ml-1">4.5</span>
                </span>
                <span className="text-neutral-500 font-normal text-base ml-1">(3,222)</span>
              </div>
              <p className="flex justify-end items-end mt-2  font-semibold text-2xl">146,000원</p>
            </div>
          </a>

          {/* 세 번째 카드 */}
          <a
            href="https://map.naver.com/p/search/%ED%8A%B8%EB%A6%AC%EB%93%9C/place/1570882425?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center  rounded-lg  p-4  cursor-pointer "
          >
            <div
              className="w-full max-w-[380px] h-[282px] bg-cover bg-center rounded-lg"
              style={{ backgroundImage: "url('/images/trid.webp')" }}
            ></div>
            <div className="mt-4 text-left w-full">
              <h3 className="font-semibold text-2xl text-neutral-900">트리드</h3>
              <p className="text-lg text-neutral-600 font-medium">서울 용산구 위치</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span className=" text-[#EEC18D] text-lg flex">
                  <RiThumbUpFillIcon />
                  <span className="text-neutral-800 font-semibold ml-1">4.6</span>
                </span>
                <span className="text-neutral-500 font-normal text-base ml-1">(1,563)</span>
              </div>
              <p className="flex justify-end items-end mt-2  font-semibold text-2xl">115,000원</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HotelAttraction;
