import { PolicyType } from '@/types/supabase/policy-type';
import React, { useEffect, useState } from 'react';

interface HotelPoliciesProps {
  hotelId: string; // 호텔 ID를 문자열로 전달
}

const HotelPolicies = ({ hotelId }: HotelPoliciesProps) => {
  const [policies, setPolicies] = useState<PolicyType[]>([]); // 상태 타입을 배열로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  // 정책 이름 고정값
  const sections = ['이용 안내', '아동 관련 규정', '체크인 규정'];

  // 드롭다운 토글
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // 데이터 패치
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Fetching policies for hotelId:', hotelId); // hotelId 확인용 로그

        const response = await fetch(`/api/policy?hotel_id=${hotelId}`); // API 호출
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '정책 데이터를 가져오는 데 실패했습니다.');
        }

        const data: PolicyType[] = await response.json();
        console.log('Fetched policies:', data); // 데이터 확인
        setPolicies(data); // 상태 업데이트
      } catch (err: any) {
        console.error('Error fetching policies:', err.message);
        setError(null); // 에러 메시지를 표시하지 않음
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [hotelId]);

  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;

  // 정책 데이터 렌더링
  return (
    <div className="w-full mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">숙소 정책</h2>

      {sections.map((section) => {
        console.log('Current Section:', section); // 현재 섹션 확인
        const policy = policies.find((p) => p.policy_name.trim() === section.trim());

        return (
          <div key={section} className="border-b border-gray-300">
            <div
              className="cursor-pointer py-3 flex justify-between items-center"
              onClick={() => toggleSection(section)}
            >
              <span>{section}</span>
              <span>
                {openSection === section ? (
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 15.5L12 9.5L6 15.5"
                      stroke="#A0A0A0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 9.5L12 15.5L18 9.5"
                      stroke="#A0A0A0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            {openSection === section && (
              <div className="p-4 text-gray-600">
                {policy?.description && Array.isArray(policy.description) && policy.description.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {policy.description.map((item: string, index: number) => (
                      <li className="mb-1" key={index}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>정보가 없습니다.</p> // 값이 없을 경우 표시
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HotelPolicies;
