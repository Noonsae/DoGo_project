"use client";

import React, { useState } from "react";
import { browserSupabase } from "@/supabase/supabase-client";

// Props 타입 정의
interface HotelManagementProps {
  userId: string; // 사용자 ID
}

const HotelManagement: React.FC<HotelManagementProps> = ({ userId }) => {
  // 상태 정의
  const [hotelName, setHotelName] = useState(""); // 호텔 이름
  const [description, setDescription] = useState(""); // 호텔 설명
  const [address, setAddress] = useState(""); // 호텔 주소
  const [mainImgUrl, setMainImgUrl] = useState(""); // 메인 이미지 URL
  const [stars, setStars] = useState<number>(1); // 호텔 등급
  const [checkIn, setCheckIn] = useState(""); // 체크인 시간
  const [checkOut, setCheckOut] = useState(""); // 체크아웃 시간
  const [location, setLocation] = useState(""); // 호텔 위치
  const [facilities, setFacilities] = useState<string[]>([]); // 선택된 시설 목록
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [message, setMessage] = useState<string | null>(null); // 알림 메시지

  const availableFacilities = [
    "Wi-Fi",
    "수영장",
    "사우나",
    "스파",
    "주차장",
    "피트니스",
    "레스토랑",
    "바",
    "컨퍼런스룸",
  ];

  // 체크박스 선택 변경 처리
  const handleFacilityChange = (facility: string) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((item) => item !== facility)
        : [...prev, facility]
    );
  };

  // 폼 제출 처리
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await browserSupabase()
        .from("hotels")
        .insert({
          name: hotelName,
          description,
          address,
          main_img_url: mainImgUrl,
          stars,
          check_in: checkIn,
          check_out: checkOut,
          location,
          user_id: userId, // 스키마에 맞춰 user_id 필드 추가
          facilities, // 선택된 시설 정보
        });

      if (error) throw error;

      setMessage("호텔 정보가 성공적으로 저장되었습니다.");
      // 초기화
      setHotelName("");
      setDescription("");
      setAddress("");
      setMainImgUrl("");
      setStars(1);
      setCheckIn("");
      setCheckOut("");
      setLocation("");
      setFacilities([]);
    } catch (error) {
      console.error("Error saving hotel:", error);
      setMessage("호텔 정보를 저장하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">호텔 관리</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">호텔 이름</label>
          <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="w-full border rounded-md px-2 py-1"
            placeholder="호텔 이름을 입력하세요"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">호텔 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md px-2 py-1"
            placeholder="호텔 설명을 입력하세요"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">주소</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-md px-2 py-1"
            placeholder="호텔 주소를 입력하세요"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">메인 이미지 URL</label>
          <input
            type="url"
            value={mainImgUrl}
            onChange={(e) => setMainImgUrl(e.target.value)}
            className="w-full border rounded-md px-2 py-1"
            placeholder="이미지 URL을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">호텔 등급</label>
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="w-full border rounded-md px-2 py-1"
            min={1}
            max={5}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">체크인 시간</label>
          <input
            type="time"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border rounded-md px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">체크아웃 시간</label>
          <input
            type="time"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border rounded-md px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">위치</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-md px-2 py-1"
            placeholder="호텔 위치를 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">편의 시설</label>
          <div className="grid grid-cols-2 gap-2">
            {availableFacilities.map((facility) => (
              <label key={facility} className="flex items-center">
                <input
                  type="checkbox"
                  checked={facilities.includes(facility)}
                  onChange={() => handleFacilityChange(facility)}
                  className="mr-2"
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "저장 중..." : "저장하기"}
        </button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default HotelManagement;
