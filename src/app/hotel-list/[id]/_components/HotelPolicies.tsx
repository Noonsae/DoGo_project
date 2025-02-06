import { HotelPoliciesProps } from '@/types/hotel/hotel-policy-type';
import { PolicyType } from '@/types/supabase/policy-type';
import { useEffect, useState } from 'react';

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
        const response = await fetch(`/api/policy?hotel_id=${hotelId}`); // API 호출
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '정책 데이터를 가져오는 데 실패했습니다.');
        }

        const data: PolicyType[] = await response.json();
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
    <>
      <div className="w-full mx-auto" style={{ marginBottom: '120px' }}>
        <h2 className="text-neutral-900 text-[28px] font-semibold mb-4">숙소 정책</h2>

        {sections.map((section, index) => {
          const policy = policies.find((p) => p.policy_name.trim() === section.trim());

          return (
            <div
              key={section}
              id="policies"
              className={`${
                index !== sections.length - 1 ? 'border-b border-gray-300' : '' // 마지막 항목은 border 제거
              }`}
            >
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
    </>
  );
};

export default HotelPolicies;
