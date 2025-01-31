'use client';

import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';
import BusinessHotelModal from '@/app/my-page/_components/BusinessHotelModal';
import BusinessSidebar from '@/app/my-page/_components/BusinessSidebar';

interface Hotel {
  id: string;
  name: string;
  address: string;
  description: string;
  main_img_url: string | null;
  facilities: string[];
  services: string[];
}

// TODO:
// 1. 호텔 등록하기 클릭 -> 모달창 띄우기
// 2. 모달창에서 호텔 이름, 호텔 위치, 호텔 이미지, 편의 시설 및 서비스
// 3. 호텔 이름, 위치, 편의 시설 및 서비스 -> supabase insert 사용하면 끝
// 4. 호텔 이미지 -> 1. 이미지 미리보기 2. 업로드 -> 호텔 스토리지 업로드 후 테이블에 업로드

const HotelManagement: React.FC = () => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  // 이미지 파일들을 저장하는 state
  const [imageFiles, setImageFiles] = useState([]);
  // 미리보기용 url을 저장하는 곳
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onFileChange = (e) => {
    const files = e.target.files;
    // 실제 업로드하기 위한 이미지 파일들을 imageFiles state에 저장
    // 주의: 한글 이름 문제 -> 나중에 시도해본 후 확인
    setImageFiles(files);
    for (let file of files) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => [...prev, objectUrl]);
    }
  };

  const upload = () => {
    // 호텔 이름
    // 호텔 ~
    // 호텔 사진 -> imageFiles를 올리면 된다.
    // supabase.storage.upload()~~~~
  };

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { data, error } = await browserSupabase()
          .from('hotels')
          .select(
            `
            id,
            name,
            address,
            description,
            main_img_url,
            hotel_facility (
              facility_id
            ),
            hotel_service (
              service_id
            )
          `
          )
          .single();

        if (error) throw error;

        const formattedHotel: Hotel = {
          id: data.id,
          name: data.name,
          address: data.address,
          description: data.description,
          main_img_url: data.main_img_url,
          facilities: data.hotel_facility.map((facility: any) => facility.facility_id),
          services: data.hotel_service.map((service: any) => service.service_id)
        };

        setHotel(formattedHotel);
      } catch (err) {
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* BusinessSidebar 추가 */}
      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">호텔 관리</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {loading && <p className="text-center text-gray-600">로딩 중...</p>}
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">기본 정보</h2>
              <p>
                <strong>호텔명:</strong> {hotel ? hotel.name : 'Hotel Name'}
              </p>
              <p>
                <strong>주소:</strong> {hotel ? hotel.address : 'Hotel Address'}
              </p>
              <p>
                <strong>설명:</strong> {hotel ? hotel.description : '호텔 설명을 입력하세요.'}
              </p>
              <label htmlFor="hotel-img" className="border p-2">
                이미지 추가
              </label>
              <input
                id="hotel-img"
                type="file"
                onChange={onFileChange}
                accept="image/gif, image/png, image/jpeg"
                multiple
                hidden
              />
              <div className="flex gap-2">
                {previewImages.map((prevImg) => (
                  <img src={prevImg} width={100} height={100} />
                ))}
              </div>

              {/* {hotel?.main_img_url ? (
                <img
                  src={hotel.main_img_url}
                  alt={`${hotel.name} 이미지`}
                  className="mt-4 w-64 h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="mt-4 w-64 h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">이미지를 추가해주세요</span>
                </div>
              )} */}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">편의 시설</h2>
              <ul>
                {hotel
                  ? hotel.facilities.map((facility, index) => <li key={index}>- {facility}</li>)
                  : ['공용 시설', '기타 시설'].map((facility, index) => (
                      <li key={index} className="text-gray-400">
                        - {facility}
                      </li>
                    ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">서비스</h2>
              <ul>
                {hotel
                  ? hotel.services.map((service, index) => <li key={index}>- {service}</li>)
                  : ['서비스'].map((service, index) => (
                      <li key={index} className="text-gray-400">
                        - {service}
                      </li>
                    ))}
              </ul>
            </div>
          </>
          <div className="text-center mt-8">
            <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg">호텔 등록하기</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HotelManagement;
