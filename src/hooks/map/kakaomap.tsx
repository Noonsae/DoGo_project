import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
  name: string;
  description: string;
}

const KakaoMap = ({ address, name, description }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadKakaoScript = () => {
      if (document.getElementById('kakao-map-script')) {
        waitForKakaoAPI();
        return;
      }

      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services`;
      script.onload = waitForKakaoAPI;
      script.onerror = () => {
        console.error('Failed to load Kakao Maps API');
        setError('Failed to load Kakao Maps API');
      };
      document.head.appendChild(script);
    };

    const waitForKakaoAPI = () => {
      const checkKakaoInterval = setInterval(() => {
        if (window.kakao && window.kakao.maps && typeof window.kakao.maps.LatLng === 'function') {
          clearInterval(checkKakaoInterval);
          console.log('Kakao Maps API is available:', window.kakao);
          initializeMap();
        } else {
          console.log('Waiting for Kakao Maps API to fully load...');
        }
      }, 100);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.kakao || !window.kakao.maps) {
        setError('Kakao Maps API is not available for initialization');
        console.error('Kakao Maps API is not available for initialization');
        return;
      }

      const { kakao } = window;

      try {
        // 지도 생성
        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 중심 좌표
          level: 4
        });
        console.log('Kakao Map object initialized:', map);

        const geocoder = new kakao.maps.services.Geocoder();

        // 주소 검색
        geocoder.addressSearch(address, (result: any[], status: string) => {
          console.log('Geocoder result:', result);
          console.log('Geocoder status:', status);

          if (status === kakao.maps.services.Status.OK && result[0]) {
            const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
            console.log('Coordinates:', coords);

            new kakao.maps.Marker({
              map,
              position: coords
            });

            map.setCenter(coords);
          } else {
            console.error('Failed to find the address:', status, result);
            setError(`Failed to find the address: ${address}`);
          }
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Error initializing map. Please check the Kakao Maps API configuration.');
      }
    };

    loadKakaoScript();
  }, [address]);

  if (error) {
    return <div style={{ color: 'red', padding: '10px' }}>{error}</div>;
  }

  return <div ref={mapRef} style={{ width: '100%', height: '400px', border: '1px solid #ddd' }} />;
};

export default KakaoMap;
