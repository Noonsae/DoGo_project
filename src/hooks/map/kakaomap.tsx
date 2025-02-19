import { useEffect, useRef } from 'react';

interface KakaoMapProps {
  address: string; // 검색할 주소
  className: string;
}

const KakaoMap = ({ address, className }: KakaoMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`;

      if (document.querySelector(`script[src="${scriptUrl}"]`)) {
        initializeKakaoMap();
        return;
      }

      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => initializeKakaoMap());
        }
      };
      script.onerror = () => {
        console.error('Kakao Maps 스크립트 로드 실패');
      };
      document.head.appendChild(script);
    };

    const initializeKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps || !mapContainerRef.current) {
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { x: longitude, y: latitude } = result[0];

          // 문자열을 숫자로 변환
          const lat = parseFloat(latitude);
          const lng = parseFloat(longitude);

          const mapOptions = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3 // 지도 확대 레벨
          };

          if (mapContainerRef.current) {
            const map = new window.kakao.maps.Map(mapContainerRef.current, mapOptions);
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(lat, lng)
            });
            marker.setMap(map);
          }
        } else {
          console.error('주소 검색 실패:', status);
        }
      });
    };

    loadKakaoMap();
  }, [address]);

  return <div ref={mapContainerRef} className={`w-full h-[400px] ${className}`} />;
};

export default KakaoMap;
