"use client";

import React, { useState } from "react";
import { browserSupabase } from "@/supabase/supabase-client";

// Props 타입 정의
interface HotelManagementProps {
  userId: string; // 사용자 ID
}

const HotelManagement: React.FC<HotelManagementProps> = ({ userId }) => {
  const [hotelName, setHotelName] = useState(""); // 호텔 이름
  const [description, setDescription] = useState(""); // 호텔 설명
  const [address, setAddress] = useState(""); // 호텔 주소
  const [mainImgUrl, setMainImgUrl] = useState(""); // 메인 이미지 URL
  const [stars, setStars] = useState<number>(1); // 호텔 등급 (1~5)
  const [minPrice, setMinPrice] = useState<number>(0); // 최소 가격
  const [checkIn, setCheckIn] = useState(""); // 체크인 시간
  const [checkOut, setCheckOut] = useState(""); // 체크아웃 시간
  const [location, setLocation] = useState(""); // 호텔 위치
  const [selectedServices, setSelectedServices] = useState<string[]>([]); // 선택된 편의 시설
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [message, setMessage] = useState<string | null>(null); // 성공/오류 메시지

  const services = [
    "사우나",
    "수영장",
    "스파",
    "주차장",
    "비즈니스",
    "휘트니스",
    "레스토랑",
    "바(Bar)",
  ];

  // 체크박스 변경 처리
  const handleCheckboxChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // 모달 열기/닫기
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await browserSupabase().from("hotels").insert([
        {
          name: hotelName,
          description,
          address,
          main_img_url: mainImgUrl,
          stars,
          min_price: minPrice,
          check_in: checkIn,
          check_out: checkOut,
          location,
          user_id: userId, // 사용자 ID 저장
          services: selectedServices, // 선택된 편의 시설 저장
        },
      ]);

      if (error) throw error;

      setMessage("호텔이 성공적으로 저장되었습니다!");
      setHotelName("");
      setDescription("");
      setAddress("");
      setMainImgUrl("");
      setStars(1);
      setMinPrice(0);
      setCheckIn("");
      setCheckOut("");
      setLocation("");
      setSelectedServices([]);
    } catch (err) {
      console.error("Error saving hotel:", err);
      setMessage("호텔 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">호텔 관리</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">호텔 이름</label>
          <input
            type="text"
            placeholder="호텔 이름을 입력하세요"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">호텔 설명</label>
          <textarea
            placeholder="호텔 설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">주소</label>
          <input
            type="text"
            placeholder="호텔 주소를 입력하세요"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">메인 이미지 URL</label>
          <input
            type="url"
            placeholder="이미지 URL을 입력하세요"
            value={mainImgUrl}
            onChange={(e) => setMainImgUrl(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">호텔 등급 (별 개수)</label>
          <input
            type="number"
            placeholder="1~5"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md"
            min={1}
            max={5}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">최소 가격 (1박 기준)</label>
          <input
            type="number"
            placeholder="최소 가격을 입력하세요"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">체크인 시간</label>
          <input
            type="time"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">체크아웃 시간</label>
          <input
            type="time"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">위치</label>
          <input
            type="text"
            placeholder="위치 정보를 입력하세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={toggleModal}
          className="px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600"
        >
          편의 시설 및 서비스 설정
        </button>
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "저장 중..." : "저장하기"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm">{message}</p>}

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">편의 시설 및 서비스</h3>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    className="mr-2"
                  />
                  {service}
                </label>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-2"
              >
                닫기
              </button>
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-brown-500 text-white rounded hover:bg-brown-600"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelManagement;
