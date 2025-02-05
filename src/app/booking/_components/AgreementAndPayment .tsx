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
    <div className="bg-white shadow-lg rounded-lg p-6 w-[892px]">
      <p className="text-lg font-semibold">다음 사항에 동의해 주세요.</p>
      <span className="text-neutral-600">동의가 있어야 결제하기 버튼이 활성화됩니다.</span>
      <div className="mt-10 space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={agreements.ageConfirmation}
            onChange={() => handleCheckboxChange('ageConfirmation')}
          />
          <p className="text-sm">본인은 만 14세 이상이며, 개인정보 보호정책에 동의합니다.</p>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={agreements.dataSharing}
            onChange={() => handleCheckboxChange('dataSharing')}
          />
          <p className="text-sm">개인정보가 국내외 제3자에게 제공 및 전송되는 것에 동의합니다.</p>
        </label>
        <div>
          <p className="text-neutral-600 mt-6 mb-2">
            <span className="text-[18px]">안심하세요!</span> 현재 결제 기능은 테스트 환경에서만 작동합니다.
            <br />
            결제 버튼을 눌러도 실제 금액이 청구되지 않으니 편안하게 이용해 주세요.
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-end items-center">
        <span className="text-2xl mr-[20px] font-semibold text-[#B3916A]">
          {bookingData.total_amount ? bookingData.total_amount.toLocaleString() + '원' : '가격 없음'}
        </span>
        {/* 결제 버튼을 활성화 또는 비활성화 */}
        <TossPaymentsButton disabled={!allAgree || !isFormValid} bookingData={bookingData} />
      </div>
    </div>
  );
};

export default AgreementAndPayment;
