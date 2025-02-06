import { useState } from 'react';

import { PostBookingDataType } from '@/types/supabase/booking-type';

import TossPaymentsButton from './TossPaymentsButton';

const AgreementAndPayment = ({
  isFormValid,
  bookingData
}: {
  isFormValid: boolean;
  bookingData: PostBookingDataType;
}) => {
  // 체크박스 상태 관리
  const [agreements, setAgreements] = useState({
    ageConfirmation: false,
    dataSharing: false
  });

  // 모든 체크박스가 체크되었는지 확인
  const allAgree = Object.values(agreements).every((checked) => checked);

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (name: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <section className="w-full px-9 pt-8 pb-5 bg-white rounded-[12px] border border-[#E2E2E2]">
      {/* 다음 사항에 동의해주세요. */}
      <p className="text-[20px] text-[#232527] font-semibold">
        {`다음 사항에 동의해 주세요. (필수)`}
        <span className="ml-1 text-[#FF5B45] text-[14px] leading-[1.45]">*</span>
      </p>

      <span className="text-[16px] leading-[1.45] font-normal text-neutral-600">
        동의가 있어야 결제하기 버튼이 활성화됩니다.
      </span>

      {/* 체크박스 */}
      <div className="mt-5">
        <label className="flex items-start ">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={agreements.ageConfirmation}
            onChange={() => handleCheckboxChange('ageConfirmation')}
          />
          <span className="ml-2 text-[16px] text-[#777] leading-[1.45]">
            본인은 만 14세 이상이며, DoGo.com 개인정보 보호정책에 명시된 바와 같이 본인과 본인이 부양하는 아동 (해당되는
            경우)의 필수적 개인 정보가 수집 및 활용되는 데 동의합니다.
          </span>
        </label>

        <label className="flex items-start mt-3">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={agreements.dataSharing}
            onChange={() => handleCheckboxChange('dataSharing')}
          />
          <span className="ml-2 text-[16px] text-[#777] leading-[1.45]">
            본인은 DoGo.com 개인정보 보호정책에 명시된 바와 같이 본인과 본인이 부양하는 아동(해당되는 경우)의 필수적
            개인 정보가 대한민국 국내외 제 3자에게 제공 및 전송되는 것에 동의합니다.
          </span>
        </label>
      </div>

      {/* 결제 안내문구 */}
      <div>
        <p className="text-neutral-600 mt-6 mb-2">
          <span className="text-[18px]">안심하세요!</span> 현재 결제 기능은 테스트 환경에서만 작동합니다.
          <br />
          결제 버튼을 눌러도 실제 금액이 청구되지 않으니 편안하게 이용해 주세요.
        </p>
      </div>
      <div className="mt-6 flex justify-end items-center">
        <span className="text-2xl mr-[20px] font-semibold text-[#B3916A]">
          {bookingData.total_amount ? bookingData.total_amount.toLocaleString() + '원' : '가격 없음'}
        </span>
        {/* 결제 버튼을 활성화 또는 비활성화 */}
        <TossPaymentsButton disabled={!allAgree || !isFormValid} bookingData={bookingData} />
      </div>
    </section>
  );
};

export default AgreementAndPayment;
