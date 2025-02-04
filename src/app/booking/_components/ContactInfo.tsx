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

const ContactInfo: React.FC<ContactInfoProps> = ({
  userData,
  selectedCode,
  setSelectedCode
}) => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
      <p className="text-lg font-semibold">연락처 정보</p>
      <p className="flex flex-col justify-end">이메일 정보</p>
      <input value={userData?.email || ''} className="border p-3 w-full mt-2 rounded-md" placeholder="이메일" />
      <label htmlFor="countryCode" className="text-lg font-semibold">
        휴대폰 번호
      </label>
      <div className="flex space-y-2 mt-2 justify-around flex-row">
        <div className="flex flex-col">
          <select
            id="countryCode"
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="border rounded-md p-3 mt-2 w-[400px]"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} {country.code}
              </option>
            ))}
          </select>
        </div>
        <input
          value={userData?.phone_number || ''}
          className="border mt-2 p-3 rounded-md w-[400px]"
          placeholder="전화번호를 입력해주세요"
        />
      </div>
    </section>
  );
};

export default ContactInfo;