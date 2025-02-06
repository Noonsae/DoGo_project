import { UserType } from '@/types/supabase/user-type';

import { countryCodes } from '@/constants/constant';

interface ContactInfoProps {
  userData: {
    email: string | null;
    phone_number: string | null;
  };
  selectedCode: string;
  setSelectedCode: React.Dispatch<React.SetStateAction<string>>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ userData, selectedCode, setSelectedCode }) => {
  return (
    <section className="w-full px-9 py-4 mb-8 bg-white rounded-[12px] border border-[#E2E2E2]">
      {/* 연락처 정보 */}
      <div className="py-4 border-b border-[#e2e2e2] mb-4">
        <p className="text-[20px] text-[#232527] font-semibold mb-2">연락처 정보</p>
        <p className="text-[16px] leading-[1.45] font-normal text-neutral-600">
          예약에 업데이트 사항이 있는 경우, 입력하신 연락처 정보로 안내드립니다.
        </p>
      </div>

      {/* 이메일주소 입력 */}
      <div className="mb-5">
        <p className="mb-2 text-[16px] text-[#444] font-semibold">
          이메일 주소
          <span className="ml-1 text-[#FF5B45] text-[14px] leading-[1.45]">*</span>
        </p>
        <input
          value={userData?.email || ''}
          className=" w-full px-4 py-3 text-[#232527] rounded-[8px] border border-[#BFBFBF]"
          placeholder="이메일"
        />
      </div>

      {/* 휴대폰 번호 입력 */}
      <div>
        <label htmlFor="countryCode" className="text-[16px] text-[#444] font-semibold">
          휴대폰 번호
          <span className="ml-1 text-[#FF5B45] text-[14px] leading-[1.45]">*</span>
        </label>

        <div className="flex flex-row items-center justify-between gap-5 mt-2 pb-4">
          <select
            id="countryCode"
            value={selectedCode}
            aria-placeholder="나라를 선택해 주세요."
            onChange={(e) => setSelectedCode(e.target.value)}
            className="w-full border px-4 py-3 rounded-[8px] text-[#232527]"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} {country.code}
              </option>
            ))}
          </select>
          <input
            value={userData?.phone_number || '전화번호를 입력해주세요.'}
            className="w-full border px-4 py-3 rounded-[8px] text-[#232527]"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
