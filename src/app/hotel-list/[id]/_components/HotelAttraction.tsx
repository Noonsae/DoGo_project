import React from 'react';

const HotelAttraction = () => {
  return (
    <div>
      <section id="nearby" className="scroll-mt-20">
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-6">호텔 주변 명소</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 첫 번째 카드 */}
          <a
            href="https://map.naver.com/p/search/%EC%B2%AD%EB%8B%B4%EB%8F%99%20%ED%8C%8C%EC%9D%B8%EB%8B%A4%EC%9D%B4%EB%8B%9D/place/1388486977?c=18.14,0,0,0,dh&placePath=%3Fentry%253Dpll"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 hover:shadow-xl cursor-pointer transition-shadow"
          >
            <div
              className="w-full max-w-[350px] h-[200px] bg-cover bg-center rounded-lg"
              style={{ backgroundImage: "url('/images/greee.webp')" }}
            ></div>
            <div className="mt-4 text-left w-full">
              <h3 className="font-bold text-lg">그리에</h3>
              <p className="text-sm text-gray-500">서울 강남구 위치</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span className="mr-2">👍 4.8</span>
                <span>(3,222)</span>
              </div>
              <p className="mt-2 font-bold text-lg">192,000원</p>
            </div>
          </a>

          {/* 두 번째 카드 */}
          <a
            href="https://map.naver.com/p/search/%EC%B2%AD%EB%8B%B4%EB%8F%99%20%ED%8C%8C%EC%9D%B8%EB%8B%A4%EC%9D%B4%EB%8B%9D/place/37604188?c=18.03,0,0,0,dh&placePath=%3Fentry%253Dpll"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 hover:shadow-xl cursor-pointer transition-shadow"
          >
            <div
              className="w-full max-w-[350px] h-[200px] bg-cover bg-center rounded-lg"
              style={{ backgroundImage: "url('/images/olheum.webp')" }}
            ></div>
            <div className="mt-4 text-left w-full">
              <h3 className="font-bold text-lg">옳음</h3>
              <p className="text-sm text-gray-500">서울 송파구 위치</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span className="mr-2">👍 4.6</span>
                <span>(1,845)</span>
              </div>
              <p className="mt-2 font-bold text-lg">178,000원</p>
            </div>
          </a>

          {/* 세 번째 카드 */}
          <a
            href="https://map.naver.com/p/search/%ED%8A%B8%EB%A6%AC%EB%93%9C/place/1570882425?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 hover:shadow-xl cursor-pointer transition-shadow"
          >
            <div
              className="w-full max-w-[350px] h-[200px] bg-cover bg-center rounded-lg"
              style={{ backgroundImage: "url('/images/trid.webp')" }}
            ></div>
            <div className="mt-4 text-left w-full">
              <h3 className="font-bold text-lg">트리드</h3>
              <p className="text-sm text-gray-500">서울 용산구 위치</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span className="mr-2">👍 4.9</span>
                <span>(4,521)</span>
              </div>
              <p className="mt-2 font-bold text-lg">210,000원</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HotelAttraction;
